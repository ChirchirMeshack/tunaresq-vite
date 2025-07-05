import { FormProvider, useForm, UseFormReturn, FieldErrors } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';
import { RHFTextField } from '@components/form/RHFTextField';
import { Button } from '@components/ui/button';
import { ArrowLeft, ArrowRight, ImagePlus} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { AccordionCard } from './AccordionCard';
import RHFTextAreaField from '@components/form/RHFTextareaField';
import { LayoutContextType } from '@layouts/registration';
import { createOrganizationDetails, OrganizationDetailsPayload } from '../../../api/organization-details';
import { createFundraiser, FundraiserPayload } from '../../../api/fundraiser';
import { getAllFundraiserTypes, FundraiserType } from '../../../api/fundraiser-type';
import { handleErrors } from '@lib/utils';
import useAuthCtx from '../../../contexts/auth/use-auth';

// Reuse the details section as a component
const FundraiserDetailsSection = ({
  methods,
  errors,
}: {
  methods: UseFormReturn<OrganizationFundraiserFormData>;
  errors: FieldErrors<OrganizationFundraiserFormData>;
}) => (
  <>
    <div className="w-full">
      {/* Use RHFTextAreaField for Fundraiser title. Error message is handled inside the component. */}
      <RHFTextAreaField
        name="title"
        label="Fundraiser title"
        placeholder="Give your fundraiser a clear, attention-grabbing title"
        className={`w-full border rounded-md p-2 text-sm min-h-[56px] sm:min-h-[40px] focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
        maxLength={120}
        rows={2}
        style={{ lineHeight: '1.4' }}
      />
    </div>
    <div>
      <label htmlFor="details" className="block text-sm font-medium mb-1">Fundraiser details (max 100 words)</label>
      <textarea
        id="details"
        {...methods.register('details')}
        placeholder="Explain how you'll use the funds and what milestones you will achieve"
        className={`w-full border rounded-md p-2 text-sm min-h-[96px] focus:outline-none focus:ring-2 focus:ring-primary resize-none ${errors.details ? 'border-red-500' : ''}`}
        maxLength={1000}
      />
      {errors.details && <p className="text-xs text-red-500 mt-1">{errors.details.message as string}</p>}
    </div>
    <RHFTextField name="goal" label="What is your fundraising goal? (In USD)" placeholder="USD 0.00" type="number" min={0} step="1.00" />
    {errors.goal && <p className="text-xs text-red-500 mt-1">{errors.goal.message as string}</p>}
    <div className="border rounded-lg p-0 sm:p-4 flex flex-col items-center text-center  min-h-[220px] justify-center relative overflow-hidden">
      <label className="block text-sm font-medium mb-1 w-full text-left px-4 pt-4 sm:pt-0 sm:px-0">Upload your fundraiser's image</label>
      <div className="flex flex-col items-center justify-center w-full h-full flex-1 py-6">
        <ImagePlus size={40} className="mx-auto mb-2" />
        <span className="font-medium text-base  mb-1">Upload an image</span>
        <span className="text-xs text-[#bdbdbd] mb-1">Fundraisers with images receive 35% more donations</span>
        <input
          id="fundraiser-image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={() => {/* handle file change here if needed */}}
        />
        <span className="text-xs">
          <label htmlFor="fundraiser-image" className="text-blue-600 underline cursor-pointer font-medium">Click to upload file</label>
          <span className="hidden md:inline"> or drag and drop here.</span>
        </span>
        <span className="text-xs text-[#bdbdbdbd] mt-2">maximum file size 15MB</span>
      </div>
    </div>
  </>
);

// Validation schema for organization form
const validationSchema = yup.object({
  organizationName: yup.string().required('Organization name is required'),
  registrationNumber: yup.string().required('Registration number is required'),
  website: yup.string().url('Enter a valid URL').notRequired().nullable().default(''),
  social: yup.string().notRequired().nullable().default(''),
  mission: yup.string().required("Organization's mission is required").max(500, 'Mission must be at most 500 characters'),
  title: yup.string().required('Fundraiser title is required').max(120, 'Title must be at most 120 characters'),
  details: yup.string().required('Fundraiser details are required').max(1000, 'Details must be at most 1000 characters'),
  goal: yup
    .number()
    .typeError('Goal must be a number')
    .required('Fundraising goal is required')
    .positive('Goal must be a positive number'),
  image: yup.object().shape({
		file: yup.mixed(),
		preview: yup.string(),
	}),
});

export type OrganizationFundraiserFormData = yup.InferType<typeof validationSchema>;

const OrganizationFundraiserForm = () => {
  const methods = useForm<OrganizationFundraiserFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
    defaultValues: {
      website: '',
      social: '',
      image: {
		preview: "",
		file: "",
	}
    },
  });
  const { handleStepComplete, handleBackStep } = useOutletContext<LayoutContextType>();
  const { formState: { errors, isValid } } = methods;
  const { user } = useAuthCtx();
  
  // Accordion state management - only one section open at a time
  const [openSection, setOpenSection] = useState<'organization' | 'fundraiser' | null>('organization');
  
  const handleAccordionToggle = (section: 'organization' | 'fundraiser') => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleBack = () => {
    handleBackStep('create-account');
  };

  // Submit handler: creates fundraiser first, then organization details
  const onSubmit = async (data: OrganizationFundraiserFormData) => {
    try {
      console.log('Starting organization fundraiser creation...');
      
      if (!user) {
        console.error('No user found');
        handleErrors(new Error('User not authenticated'));
        return;
      }

      // Get fundraising categories to find the organization category ID
      const { data: categories, error: categoriesError } = await getAllFundraiserTypes();
      if (categoriesError || !categories) {
        console.error('Failed to get fundraising categories:', categoriesError);
        handleErrors(categoriesError || new Error('Failed to get fundraising categories'));
        return;
      }

      // Find the organization category
      const organizationCategory = categories.find((cat: FundraiserType) => 
        cat.name.toLowerCase().includes('organization') || 
        cat.name.toLowerCase().includes('organisation')
      );

      if (!organizationCategory) {
        console.error('Organization fundraising category not found');
        handleErrors(new Error('Organization fundraising category not found'));
        return;
      }

      // Step 1: Create the fundraiser first
      const fundraiserPayload: FundraiserPayload = {
        user: user.id,
        fundraising_category: organizationCategory.id
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

      console.log('Fundraiser created successfully:', fundraiserResult);

      // Step 2: Create organization details with the fundraiser ID
      const organizationPayload: OrganizationDetailsPayload = {
        fundraiser: fundraiserResult.id,
        fundraiser_title: data.title,
        fundraiser_details: data.details,
        fundraiser_goal: data.goal,
        organisation_name: data.organizationName,
        registration_number: data.registrationNumber,
        website: data.website || undefined,
        social_media: data.social || undefined,
        mission: data.mission,
      };

            console.log('Creating organization details with payload:', organizationPayload);
      const { data: orgResult, error: orgError } = await createOrganizationDetails(organizationPayload);
      
      if (orgError) {
        console.error('Failed to create organization details:', orgError);
        handleErrors(orgError);
        return;
      }

      // Success: proceed to next step or show success message
      console.log('Organization fundraiser created successfully:', { 
        fundraiser: fundraiserResult, 
        details: orgResult 
      });
      console.log('Full organization details response:', orgResult);
      handleStepComplete('fundraiser-details');
      
    } catch (error) {
      console.error('Unexpected error during submission:', error);
      handleErrors(error);
    }
  };
console.log(errors, isValid);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-3xl mx-auto sm:mt-2 mt-2 px-8 sm:px-4.5">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2 text-center md:text-left">Tell us about your organization</CardTitle>
            <CardDescription className="text-center">
              Share information about your nonprofit or charity organization.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Accordions for mobile - only one section open at a time */}
            <div className="block md:hidden">
              <AccordionCard
                open={openSection === 'organization'}
                onClick={() => handleAccordionToggle('organization')}
                title="Organisation details"
              >
                <RHFTextField name="organizationName" label="Organisation name" placeholder="Enter your organisation's name" />
                <RHFTextField name="registrationNumber" label="Registration number" placeholder="Non-profit/charity organization registration number" />
                <RHFTextField name="mission" label="Organization's mission  (max 50 words)" placeholder="Describe what your non-profit organization's mission and what problem you're solving" />
                <RHFTextField name="website" label="Enter your website (Optional)" placeholder="Example, my.organization.com" />
                <RHFTextField name="social" label="Enter your social media handle (Optional)" placeholder="Enter your main social media handle for your organization" />
              </AccordionCard>
              <AccordionCard
                open={openSection === 'fundraiser'}
                onClick={() => handleAccordionToggle('fundraiser')}
                title="Fundraiser details"
              >
                <FundraiserDetailsSection methods={methods} errors={errors} />
              </AccordionCard>
            </div>
            {/* Desktop layout: all fields visible */}
            <div className="hidden md:block space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RHFTextField name="organizationName" label="Organisation name" placeholder="Enter your organisation's name" />
                <RHFTextField name="registrationNumber" label="Registration number" placeholder="Non-profit/charity organization registration number" />
              </div>
              <RHFTextField name="mission" label="Organization's mission  (max 50 words)" placeholder="Describe what your non-profit organization's mission and what problem you're solving" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RHFTextField name="website" label="Enter your website (Optional)" placeholder="Example, my.organization.com" />
                <RHFTextField name="social" label="Enter your social media handle (Optional)" placeholder="Enter your main social media handle for your organization" />
              </div>
              <FundraiserDetailsSection methods={methods} errors={errors} />
            </div>
          </CardContent>
        </Card>
        <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 pb-6 flex flex-row justify-between gap-3 sm:gap-4 mt-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="w-[120px] md:w-[150px] rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
            type="button"
          >
            <ArrowLeft className="size-4 sm:size-5" />
            Back
          </Button>
          <Button
            type="submit"
            //type="button"
            // onClick={methods.handleSubmit(onSubmit)}
            onClick={() => handleStepComplete('fundraiser-details')}
            className="w-[120px] md:w-[150px] rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
            // disabled={!isValid}
          >
            Continue
            <ArrowRight className="size-4 sm:size-5" />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default OrganizationFundraiserForm;
