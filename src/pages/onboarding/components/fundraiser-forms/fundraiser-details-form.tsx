import { useOutletContext } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { TextField } from "@components/hook-form/text-field"
import { TextAreaField } from "@components/hook-form/textarea-field"
import { CurrencyField } from "@components/hook-form/currency-field"
import { FileUploadField } from "@components/hook-form/file-upload-field"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { LayoutContextType } from '@layouts/registration';
import { fundraiserDetailsSchema, IndividualFundraiserFormData } from './validation'
import { handleErrors } from '@lib/utils'
import { createIndividualDetails, IndividualDetailsPayload } from 'api/individual-details'
import { createFundraiser, FundraiserPayload } from 'api/fundraiser'
import useAuthCtx from '@contexts/auth/use-auth'
import { getAllFundraiserTypes, FundraiserType } from 'api/fundraiser-type'
import { Form } from '@components/ui/form'

export default function FundraiserDetailsForm() {
    
  const { handleStepComplete, handleBackStep } =
    useOutletContext<LayoutContextType>();
  const { user } = useAuthCtx();

  const handleBack = () => {
    handleBackStep("create-account");
  };
  const methods = useForm({
    resolver: yupResolver(fundraiserDetailsSchema),
    mode: "onTouched",
  })

 
  // Submit handler: creates fundraiser first, then individual details
  const onSubmit = async (data: IndividualFundraiserFormData) => {
    try {
      console.log("Starting individual fundraiser creation...");

      if (!user) {
        console.error("No user found");
        handleErrors(new Error("User not authenticated"));
        return;
      }

      // Get fundraising categories to find the startup category ID
      const { data: categories, error: categoriesError } =
        await getAllFundraiserTypes();
      if (categoriesError || !categories) {
        console.error("Failed to get fundraising categories:", categoriesError);
        handleErrors(
          categoriesError || new Error("Failed to get fundraising categories")
        );
        return;
      }

      // Find the individual category
      const individualCategory = categories.find((cat: FundraiserType) =>
        cat.name.toLowerCase().includes("yourself")
      );

      if (!individualCategory) {
        console.error("Individual fundraising category not found");
        handleErrors(new Error("Individual fundraising category not found"));
        return;
      }

      // Step 1: Create the fundraiser first
      const fundraiserPayload: FundraiserPayload = {
        user: user.id,
        fundraising_category: individualCategory.id,
      };

      console.log("Creating fundraiser with payload:", fundraiserPayload);
      const { data: fundraiserResult, error: fundraiserError } =
        await createFundraiser(fundraiserPayload);

      if (fundraiserError) {
        console.error("Failed to create fundraiser:", fundraiserError);
        handleErrors(fundraiserError);
        return;
      }

      if (!fundraiserResult) {
        console.error("No fundraiser result returned");
        handleErrors(new Error("Failed to create fundraiser"));
        return;
      }

      // Extract the fundraiser ID from the response
      const fundraiserId = fundraiserResult?.id;
      if (!fundraiserId) {
        console.error("Fundraiser ID not found in response:", fundraiserResult);
        handleErrors(new Error("Fundraiser ID not returned from API"));
        return;
      }

      console.log("Fundraiser created successfully:", fundraiserResult);

      // Step 2: Create individual details with the fundraiser ID
      const individualPayload: IndividualDetailsPayload = {
        fundraiser: fundraiserResult?.id,
        fundraiser_title: data.title,
        fundraiser_details: data.details,
        fundraiser_goal: data.goal,
      };

      console.log(
        "Creating individual details with payload:",
        individualPayload
      );
      const { data: individualResult, error: individualError } =
        await createIndividualDetails(individualPayload);

      if (individualError) {
        console.error("Failed to create individual details:", individualError);
        handleErrors(individualError);
        return;
      }

      // Success: proceed to next step or show success message
      console.log("Individual fundraiser created successfully:", {
        fundraiser: fundraiserResult,
        details: individualResult,
      });
      console.log("Full individual details response:", individualResult);
      handleStepComplete("fundraiser-details");
    } catch (error) {
      console.error("Unexpected error during submission:", error);
      handleErrors(error);
    }
  };

  // const {
  //   formState: { isValid },
  // } = methods;

  return (
      <Form {...methods}>
    <div className="bg-white rounded-lg shadow-sm p-8 border mt-8 space-y-8">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Fundraiser details</h1>
        <p className="text-gray-600">
          Share the details of your fundraiser so we can know how to help you. Make it as detailed as possible
        </p>
      </div>

        <form id="fundraiser-details-form" onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <FundraisingDetailsFields />
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
            // type="submit"
            // disabled={!isValid}
            type='button'
            onClick={() => handleStepComplete("fundraiser-details")}
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

export const FundraisingDetailsFields = () => (
    <div className="space-y-4">
      <TextField
        name="fundraiserTitle"
        label="Fundraiser title"
        placeholder="Give your fundraiser a clear, attention-grabbing title"
        required
      />

      <TextAreaField
        name="fundraiserDetails"
        label="Fundraiser details"
        placeholder="Explain how you'll use the funds and what milestones you will achieve"
        maxLength={100}
        required
      />

      <CurrencyField
        name="fundraisingGoal"
        label="What is your fundraising goal? (in USD)"
        placeholder="0.00"
        currency="USD"
        required
      />

      <FileUploadField name="fundraiserImage" label="Upload your fundraiser's image" accept="image/*" maxSize={15} />
    </div>
  )
