import { useOutletContext } from 'react-router-dom'
import { LayoutContextType } from '@layouts/registration';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import { TextField } from "@components/hook-form/text-field"
import { SelectField } from "@components/hook-form/select-field"
import { TextAreaField } from "@components/hook-form/textarea-field"
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react"
import { FundraisingDetailsFields } from './fundraiser-details-form';
import { useAppStore } from 'stores/app';
import { StartupFundraiserFormData } from '@components/workflows/FundraiserForms/startupForm';
import { handleErrors } from '@lib/utils';
import { FundraiserPayload, createFundraiser } from 'api/fundraiser';
import { getAllFundraiserTypes, FundraiserType } from 'api/fundraiser-type';
import { createStartupDetails, StartupDetails as StartupDetailsPayload } from 'api/startup-details';
import useAuthCtx from '@contexts/auth/use-auth';
import { Form } from '@components/ui/form';
import { startUpDetailsSchema } from './validation';



export default function StartupDetailsForm() {
  const methods = useForm<StartupFundraiserFormData>({
    resolver: yupResolver(startUpDetailsSchema),
    mode: 'onTouched',
    defaultValues: {
      website: '',
      social: '',
    },
  });
  const { handleStepComplete, handleBackStep } = useOutletContext<LayoutContextType>();
  const { formState: { isValid } } = methods;
  const { user } = useAuthCtx();
  const {startUpOptions, industryOptions, teamSizeOptions} = useAppStore()
  // For mobile accordion: 'startup' | 'fundraising' | null
  const [activeAccordion, setActiveAccordion] = useState<"startup" | "fundraising" | null>("startup")


  const handleBack = () => {
    handleBackStep('create-account');
  };


  // Submit handler: creates fundraiser first, then startup details
  const onSubmit = async (data: StartupFundraiserFormData) => {
    try {
      console.log('Starting startup fundraiser creation...');
      
      if (!user) {
        console.error('No user found');
        handleErrors(new Error('User not authenticated'));
        return;
      }

      // Get fundraising categories to find the startup category ID
      const { data: categories, error: categoriesError } = await getAllFundraiserTypes();
      if (categoriesError || !categories) {
        console.error('Failed to get fundraising categories:', categoriesError);
        handleErrors(categoriesError || new Error('Failed to get fundraising categories'));
        return;
      }

      // Find the startup category
      const startupCategory = categories.find((cat: FundraiserType) => 
        cat.name.toLowerCase().includes('startup')
      );

      if (!startupCategory) {
        console.error('Startup fundraising category not found');
        handleErrors(new Error('Startup fundraising category not found'));
        return;
      }

      // Step 1: Create the fundraiser first
      const fundraiserPayload: FundraiserPayload = {
        user: user.id,
        fundraising_category: startupCategory.id
      };

      console.log('Creating fundraiser with payload:', fundraiserPayload);
      const { data: fundraiserResult, error: fundraiserError } = await createFundraiser(fundraiserPayload);
      
      if (fundraiserError) {
        console.error('Failed to create fundraiser:', fundraiserError);
        handleErrors(fundraiserError);
        return;
      }

      if (!fundraiserResult) {
        console.error('No fundraiser result returned');
        handleErrors(new Error('Failed to create fundraiser'));
        return;
      }

      // Extract the fundraiser ID from the response
      const fundraiserId = fundraiserResult?.id;
      if (!fundraiserId) {
        console.error('Fundraiser ID not found in response:', fundraiserResult);
        handleErrors(new Error('Fundraiser ID not returned from API'));
        return;
      }

      console.log('Fundraiser created successfully:', fundraiserResult);

      // Step 2: Create startup details with the fundraiser ID
      const startupPayload: Omit<StartupDetailsPayload, 'id' | 'created_at' | 'updated_at'> = {
        fundraiser: fundraiserId,
      fundraiser_title: data.title,
      fundraiser_details: data.details,
      fundraiser_goal: data.goal,
      startup_name: data.startupName,
      business_description: data.businessDescription,
      location: data.startupLocation,
      industry: data.industry,
      industry_name: '', // Set if you have a display name
      stage: data.startupStage,
      stage_name: '', // Set if you have a display name
      team_size: data.teamSize,
      team_size_name: '', // Set if you have a display name
        website: data.website || undefined,
        social_media: data.social || undefined,
      };

      console.log('Creating startup details with payload:', startupPayload);
      const { data: startupResult, error: startupError } = await createStartupDetails(startupPayload);
      
      if (startupError) {
        console.error('Failed to create startup details:', startupError);
        handleErrors(startupError);
      return;
    }

    // Success: proceed to next step or show success message
      console.log('Startup fundraiser created successfully:', { fundraiser: fundraiserResult, details: startupResult });
    handleStepComplete('fundraiser-details');
      
    } catch (error) {
      console.error('Unexpected error during submission:', error);
      handleErrors(error);
    }
  };

  // Check if startup details section is completed
  const startupDetailsCompleted = methods
    .watch(["startupName", "industry", "startupStage", "teamSize", "businessDescription"])
    .every((field) => field && field.length > 0)

  const handleAccordionClick = (section: "startup" | "fundraising") => {
    setActiveAccordion(activeAccordion === section ? null : section)
  }

  // Startup Details Fields Component
  const StartupDetailsFields = () => (
    <div className="space-y-6">
      <TextField name="startupName" label="Startup Name" placeholder="Enter Your Startup Name" required />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField name="startupLocation" label="Startup location" placeholder="City, county, country" />
        <SelectField
          name="industry"
          label="Industry"
          placeholder="Select Industry"
          options={industryOptions.map((option) => ({ label: option.name, value: option.id }))}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          name="startupStage"
          label="Startup stage"
          placeholder="Select stage"
          options={startUpOptions.map((option) => ({ label: option.name, value: option.id }))}
          required
        />
        <SelectField
          name="teamSize"
          label="Team size"
          placeholder="Select team size"
          options={teamSizeOptions.map((option) => ({ label: option.name, value: option.id }))}
          required
        />
      </div>

      <TextAreaField
        name="businessDescription"
        label="Business description"
        placeholder="Describe what your startup does, the problem you're solving, and your target market"
        maxLength={100}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TextField name="website" label="Enter your website" placeholder="Example: www.yourstartup.com" type="url" />
        <TextField
          name="socialMedia"
          label="Enter your social media handle"
          placeholder="Enter your startup's social media handle"
        />
      </div>
    </div>
  )

  return (
      <Form {...methods}>
    <div className="bg-white rounded-lg shadow-sm p-8 border mt-8 space-y-6">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your startup</h1>
        <p className="text-gray-600">
          Share the details of your fundraiser so we can know how to help you. Make it as detailed as possible
        </p>
      </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          {/* Mobile Accordion View */}
          <div className="md:hidden space-y-4">
            {/* Startup Details Accordion */}
            <div className="border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => handleAccordionClick("startup")}
                className={`w-full px-6 py-4 flex items-center justify-between text-left font-medium ${
                  startupDetailsCompleted ? "bg-green-100 text-green-800 border-green-200" : "bg-gray-50 text-gray-900"
                }`}
              >
                <span>Startup details</span>
                {activeAccordion === "startup" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {activeAccordion === "startup" && (
                <div className="p-6 border-t">
                  <StartupDetailsFields />
                </div>
              )}
            </div>

            {/* Fundraising Details Accordion */}
            <div className="border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={() => handleAccordionClick("fundraising")}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-medium bg-gray-50 text-gray-900"
              >
                <span>Fundraising details</span>
                {activeAccordion === "fundraising" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>

              {activeAccordion === "fundraising" && (
                <div className="p-6 border-t">
                  <FundraisingDetailsFields />
                </div>
              )}
            </div>
          </div>

          {/* Desktop Full Form View */}
          <div className="hidden md:block space-y-8">
            <StartupDetailsFields />

            <div className="pt-8">
              <FundraisingDetailsFields />
            </div>
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
            disabled={!isValid}
            form="fundraiser-details-form"
						className="w-[120px] md:w-[150px] rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
					>
						Continue
						<ArrowRight className="size-4 sm:size-5" />
					</button>
				</div>
      </Form>
  )
}
