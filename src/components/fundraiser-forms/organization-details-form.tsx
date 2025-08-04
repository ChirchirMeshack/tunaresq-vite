import { useState } from "react";
import { useOutletContext } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { LayoutContextType } from '@layouts/registration';
import { OrganizationDetailsSchema, OrganizationFundraiserFormData, FilePicked } from './validation';
import { handleErrors } from '@lib/utils';
import { createFundraiser, FundraiserPayload } from 'api/fundraiser';
import useAuthCtx from '@contexts/auth/use-auth';
import { getAllFundraiserTypes, FundraiserType } from 'api/fundraiser-type';
import { Form } from '@components/ui/form';
import { OrganizationDetailsPayload, createOrganizationDetails } from 'api/organization-details';
import { FundraisingDetailsFields } from './fundraiser-details-form';
import { TextField } from '@components/hook-form';
import { createFundraiserImage } from "api/fundraiser-image";
import { enqueueSnackbar } from "notistack";

export default function FundraiserDetailsForm() {
  const methods = useForm<OrganizationFundraiserFormData>({
    resolver: yupResolver(OrganizationDetailsSchema),
    mode: "onTouched",
    defaultValues: {
      organizationName: "",
      registrationNumber: "",
      website: "",
      social: "",
      mission: "",
      title: "",
      details: "",
      goal: 0,
      images: [],
    },
  });

    // For mobile accordion: 'organization' | 'fundraising' | null
  const [activeAccordion, setActiveAccordion] = useState<"organization" | "fundraising" | null>("organization");
  const [imageUploading, setImageUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    watch,
    formState: { isValid },
  } = methods;

  const { handleStepComplete, handleBackStep } = useOutletContext<LayoutContextType>();
  const { user } = useAuthCtx();

  const handleBack = () => {
    handleBackStep("select-beneficiary");
  };

  const handleAccordionClick = (section: "organization" | "fundraising") => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  // Check if organization details are completed
  const organizationDetailsCompleted = watch(["organizationName", "registrationNumber", "mission"])
    .every((field) => field && field.length > 0);

  // Submit handler: creates fundraiser first, then organization details
    const onSubmit = async (data: OrganizationFundraiserFormData) => {
    setIsSubmitting(true);
    try {
      console.log("Starting organization fundraiser creation...");

      if (!user) {
        console.error("No user found");
        handleErrors("User not authenticated");
        return;
      }

    // Get fundraising categories to find the organization category ID
      const { data: categories, error: categoriesError } = await getAllFundraiserTypes();
      if (categoriesError || !categories) {
        handleErrors(categoriesError || "Failed to get fundraising categories");
        return;
      }

      // Find the organization category
      const organizationCategory = categories.find(
        (cat: FundraiserType) =>
          cat.name.toLowerCase().includes("organization") ||
          cat.name.toLowerCase().includes("organisation")
      );

      if (!organizationCategory) {
        handleErrors("Organization fundraising category not found");
        return;
      }

      // Step 1: Create the fundraiser first
      const fundraiserPayload: FundraiserPayload = {
        user: user.id,
        fundraising_category_id: organizationCategory.id,
      };

      console.log("Creating fundraiser with payload:", fundraiserPayload);
      const { data: fundraiserResult, error: fundraiserError } =
        await createFundraiser(fundraiserPayload);

      if (fundraiserError) {
        handleErrors(fundraiserError);
        return;
      }

      if (!fundraiserResult) {
        handleErrors("Failed to create fundraiser");
        return;
      }

      // Extract the fundraiser ID from the response
      const fundraiserId = fundraiserResult?.id;
      if (!fundraiserId) {
        handleErrors("Fundraiser ID not returned from API");
        return;
      }

      console.log("Fundraiser created successfully:", fundraiserResult);

      // Step 2: Create organization details with the fundraiser ID
      const organizationPayload: OrganizationDetailsPayload = {
        fundraiser: fundraiserResult?.id,
        fundraiser_title: data.title,
        fundraiser_details: data.details,
        fundraiser_goal: data.goal,
        organisation_name: data.organizationName,
        registration_number: data.registrationNumber,
        website: data.website || undefined,
        social_media: data.social || undefined,
        mission: data.mission,
      };

      console.log(
        "Creating organization details with payload:",
        organizationPayload
      );
      const { data: orgResult, error: orgError } =
        await createOrganizationDetails(organizationPayload);

      if (orgError) {
        handleErrors(orgError);
        return;
      }

      const images = data.images || [];
      if (images.length > 0) {
        setImageUploading(true);
        try {
          for (const file of images) {
            if (!file) continue;
            const { error: imageError } = await createFundraiserImage({
              image: file,
              fundraiser: fundraiserId,
            });
            if (imageError) {
              enqueueSnackbar("Failed to upload fundraiser image. Please try again.", { variant: "error" });
              setImageUploading(false);
              return;
            }
          }
          enqueueSnackbar("Fundraiser and images created successfully!", { variant: "success" });
        } catch {
          enqueueSnackbar("Unexpected error during image upload.", { variant: "error" });
          setImageUploading(false);
          return;
        }
        setImageUploading(false);
      } else {
        enqueueSnackbar("Fundraiser created successfully!", { variant: "success" });
      }

      // Success: proceed to next step or show success message
      console.log("Organization fundraiser created successfully:", {
        fundraiser: fundraiserResult,
        details: orgResult,
      });
      console.log("Full organization details response:", orgResult);

      handleStepComplete("fundraiser-details");
    } catch (error) {
      handleErrors(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const OrganizationDetailsFields = () => (
    <div className="space-y-6">
      <TextField
        name="organizationName"
        label="Organization Name"
        placeholder="Enter Your Organization Name"
        required
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          name="registrationNumber"
          label="Registration number"
          placeholder="Non-profit/charity organization registration number"
          required
        />
        <TextField
          name="mission"
          label="Organization's mission (max 50 words)"
          placeholder="Describe what your non-profit organization's mission and what problem you're solving"
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField
          name="website"
          label="Enter your website"
          placeholder="Example: www.yourorganization.com"
          type="url"
        />
        <TextField
          name="social"
          label="Enter your social media handle"
          placeholder="Enter your organization's social media handle"
        />
      </div>
    </div>
  );

  return (
    <Form {...methods}>
      <div className="bg-white rounded-lg shadow-sm p-8 border mt-8 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your organization</h1>
          <p className="text-gray-600">Share information about your nonprofit or charity organization.</p>
        </div>
        <form id="fundraiser-details-form" onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <div className="md:hidden space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => handleAccordionClick("organization")}
                className={`w-full px-6 py-4 flex items-center justify-between text-left font-medium ${
                  organizationDetailsCompleted ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-50 text-gray-900"
                }`}
              >
                <span>Organization details</span>
                {activeAccordion === "organization" ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {activeAccordion === "organization" && (
                <div className="p-6 border-t">
                  <OrganizationDetailsFields />
                </div>
              )}
            </div>
            <div className="border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => handleAccordionClick("fundraising")}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-medium bg-gray-50 text-gray-900"
              >
                <span>Fundraising details</span>
                {activeAccordion === "fundraising" ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
              </button>
              {activeAccordion === "fundraising" && (
                <div className="p-6 border-t">
                  <FundraisingDetailsFields />
                </div>
              )}
            </div>
          </div>
          <div className="hidden md:block space-y-8">
            <OrganizationDetailsFields />
            <FundraisingDetailsFields />
          </div>
        </form>
      </div>
      <div className="w-full max-w-3xl sm:max-w-md md:max-w-3xl lg:max-w-3xl mx-auto px-2 sm:px-4 pb-6 flex flex-row justify-between gap-3 sm:gap-4 mt-4">
        <button
          type="button"
          onClick={handleBack}
          className="w-[120px] border md:w-[150px] rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="size-4 sm:size-5" />
          Back
        </button>
        <button
          type="submit"
          disabled={!isValid || isSubmitting || imageUploading}
          form="fundraiser-details-form"
          className="w-[120px] md:w-[150px] rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
        >
          {isSubmitting || imageUploading ? "Processing..." : "Continue"}
          {!isSubmitting && !imageUploading && <ArrowRight className="size-4 sm:size-5" />}
        </button>
      </div>
    </Form>
  );
}