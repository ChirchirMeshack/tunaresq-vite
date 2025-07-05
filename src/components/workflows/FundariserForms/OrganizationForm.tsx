import { FormProvider, useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';
import { RHFTextField } from '@components/form/RHFTextField';
import { Button } from '@components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { AccordionCard } from './AccordionCard';
import RHFTextAreaField from '@components/form/RHFTextareaField';
import MultiFilePickerField from '@components/form/RHFFileInput';
import DocumentField from '@components/ui/fileinput';
import { handleErrors } from '@lib/utils';
import { LayoutContextType } from '@layouts/registration';

const FundraiserDetailsSection = () => (
  <>
    <div className="w-full">
      <RHFTextAreaField name="title" label="Fundraiser title"
        placeholder="Give your fundraiser a clear, attention-grabbing title"
        className={`w-full border rounded-md p-2 text-sm min-h-[56px] sm:min-h-[40px] focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
        maxLength={120}
        rows={2}
        style={{ lineHeight: '1.4' }}
      />
      <RHFTextAreaField name="title" label="Fundraiser title"
        placeholder="Give your fundraiser a clear, attention-grabbing title"
        className={`w-full border rounded-md p-2 text-sm min-h-[56px] sm:min-h-[40px] focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
        maxLength={120}
        rows={2}
        style={{ lineHeight: '1.4' }}
      />
      <RHFTextAreaField
      label ="Fundraiser details (max 100 words)"
        name="details"
        placeholder="Explain why you're raising funds and how they'll be used"
        className={`w-full border rounded-md p-2 text-sm min-h-[96px] focus:outline-none focus:ring-2 focus:ring-primary resize-none`}
        maxLength={1000}
      />
    </div>
    <RHFTextField name="goal" label="What is your fundraising goal? (In USD)" placeholder="USD 0.00" type="number" min={0} step="1.00" />
    <MultiFilePickerField name="images" label="Upload your fundraiser's image" />
    {/* <div className="border rounded-lg p-0 sm:p-4 flex flex-col items-center text-center  min-h-[220px] justify-center relative overflow-hidden">
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
          onChange={() => {/* handle file change here if needed *}}
        />
        <span className="text-xs">
          <label htmlFor="fundraiser-image" className="text-blue-600 underline cursor-pointer font-medium">Click to upload file</label>
          <span className="hidden md:inline"> or drag and drop here.</span>
        </span>
        <span className="text-xs text-[#bdbdbdbd] mt-2">maximum file size 15MB</span>
      </div>
    </div> */}
    <DocumentField 
  label="Upload your fundraiser's image"
  name="image"
  // className?: string;
  // isDisabled?: boolean;
  // acceptedTypes?: string;
  description="Fundraisers with images receive 35% more donations"
/>
  </>
);

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
  const { formState: { isValid, errors } } = methods;
  const [orgOpen, setOrgOpen] = useState(true);
  const [fundraiserOpen, setFundraiserOpen] = useState(true);

  const handleBack = () => {
    handleBackStep('create-account');
  };

  const onSubmit = 
  (formData: OrganizationFundraiserFormData) => {
    try {
      console.log(formData);
      // const {data, status} = await axiosInstance.post(`/fundraisers/`, {
      //   ...formData,
      // }, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
    handleStepComplete('fundraiser-details');
      // if (status === 201) {
      //   console.log(data.data);
      // } else {
      //   handleErrors(data.message);
      // }
    } catch (error) {
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
            {/* Accordions for mobile, expanded by default on desktop */}
            <div className="block md:hidden">
              <AccordionCard
                open={orgOpen}
                onClick={() => setOrgOpen(v => !v)}
                title="Organisation details"
              >
                <RHFTextField name="organizationName" label="Organisation name" placeholder="Enter your organisation's name" />
                <RHFTextField name="registrationNumber" label="Registration number" placeholder="Non-profit/charity organization registration number" />
                <RHFTextField name="mission" label="Organization's mission  (max 50 words)" placeholder="Describe what your non-profit organization's mission and what problem you're solving" />
                <RHFTextField name="website" label="Enter your website (Optional)" placeholder="Example, my.organization.com" />
                <RHFTextField name="social" label="Enter your social media handle (Optional)" placeholder="Enter your main social media handle for your organization" />
              </AccordionCard>
              <AccordionCard
                open={fundraiserOpen}
                onClick={() => setFundraiserOpen(v => !v)}
                title="Fundraiser details"
              >
                <FundraiserDetailsSection />
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
              <FundraiserDetailsSection />
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
            // type="submit"
            type="button"
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
