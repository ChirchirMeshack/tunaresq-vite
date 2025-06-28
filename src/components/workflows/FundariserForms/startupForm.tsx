import { FormProvider, useForm, UseFormReturn, FieldErrors } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';
import { RHFTextField } from '@components/form/RHFTextField';
import { Button } from '@components/ui/button';
import { ArrowLeft, ArrowRight, ImagePlus} from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Step } from '@lib/progressUtils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { AccordionCard } from './AccordionCard';

const INDUSTRY_OPTIONS = [
  'Technology', 'Healthcare', 'Finance', 'Education', 'Retail', 'Manufacturing', 'Other'
];
const STAGE_OPTIONS = [
  'Idea', 'Prototype', 'Early Revenue', 'Growth', 'Established'
];
const TEAM_SIZE_OPTIONS = [
  '1-2', '3-5', '6-10', '11-20', '21-50', '51+' 
];

// Reuse the details section as a component
const FundraiserDetailsSection = ({
  methods,
  errors,
}: {
  methods: UseFormReturn<StartupFundraiserFormData>;
  errors: FieldErrors<StartupFundraiserFormData>;
}) => (
  <>
    <div className="w-full">
      <label htmlFor="title" className="block text-sm font-medium mb-1">
        Fundraiser title
      </label>
      <textarea
        id="title"
        {...methods.register('title')}
        placeholder="Give your fundraiser a clear, attention-grabbing title"
        className={`w-full border rounded-md p-2 text-sm min-h-[56px] sm:min-h-[40px] focus:outline-none focus:ring-2 focus:ring-primary resize-none ${errors.title ? 'border-red-500' : ''}`}
        maxLength={120}
        rows={2}
        style={{ lineHeight: '1.4' }}
      />
      {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message as string}</p>}
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

// Validation schema for startup form
const validationSchema = yup.object({
  startupName: yup.string().required('Startup name is required'),
  startupLocation: yup.string().required('Startup location is required'),
  industry: yup.string().required('Industry is required'),
  startupStage: yup.string().required('Startup stage is required'),
  teamSize: yup.string().required('Team size is required'),
  businessDescription: yup.string().required('Business description is required').max(1000, 'Description must be at most 1000 characters'),
  website: yup.string().url('Enter a valid URL').notRequired().nullable().default(''),
  social: yup.string().notRequired().nullable().default(''),
  title: yup.string().required('Fundraiser title is required').max(120, 'Title must be at most 120 characters'),
  details: yup.string().required('Fundraiser details are required').max(1000, 'Details must be at most 1000 characters'),
  goal: yup
    .number()
    .typeError('Goal must be a number')
    .required('Fundraising goal is required')
    .positive('Goal must be a positive number'),
  // image: yup.mixed().notRequired(),
});

export type StartupFundraiserFormData = yup.InferType<typeof validationSchema>;

const StartupFundraiserForm = () => {
  const methods = useForm<StartupFundraiserFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
    defaultValues: {
      website: '',
      social: '',
    },
  });
  const { handleStepComplete, setCurrentStep } = useOutletContext<{ steps: Step[]; currentStep: string; handleStepComplete: (stepId: string) => void; setCurrentStep: (stepId: string) => void }>();
  const { formState: { errors, isValid } } = methods;
  const [startupOpen, setStartupOpen] = useState(true);
  const [fundraiserOpen, setFundraiserOpen] = useState(true);

  const handleBack = () => {
    setCurrentStep('create-account');
  };

  const onSubmit = () => {
    handleStepComplete('fundraiser-details');
  };

  // Responsive accordions for mobile
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-3xl mx-auto sm:mt-2 mt-2 px-8 sm:px-4.5">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2 text-center md:text-left">Tell us about your startup</CardTitle>
            <CardDescription className="text-center">
              Share the details of your fundraiser so we can know how to help you. Make it as detailed as possible
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Accordions for mobile, expanded by default on desktop */}
            <div className="block md:hidden">
              <AccordionCard
                open={startupOpen}
                onClick={() => setStartupOpen(v => !v)}
                title="Startup details"
              >
                <RHFTextField name="startupName" label="Startup Name" placeholder="Enter Your Startup's Name" />
                <RHFTextField name="startupLocation" label="Startup location" placeholder="City, county, country" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="industry" className="block text-sm font-medium mb-1">Industry</label>
                    <select
                      id="industry"
                      {...methods.register('industry')}
                      className={`w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.industry ? 'border-red-500' : ''}`}
                      defaultValue=""
                    >
                      <option value="" disabled>Select Industry</option>
                      {INDUSTRY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry.message as string}</p>}
                  </div>
                  <div>
                    <label htmlFor="startupStage" className="block text-sm font-medium mb-1">Startup stage</label>
                    <select
                      id="startupStage"
                      {...methods.register('startupStage')}
                      className={`w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.startupStage ? 'border-red-500' : ''}`}
                      defaultValue=""
                    >
                      <option value="" disabled>Select stage</option>
                      {STAGE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    {errors.startupStage && <p className="text-xs text-red-500 mt-1">{errors.startupStage.message as string}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium mb-1">Team size</label>
                  <select
                    id="teamSize"
                    {...methods.register('teamSize')}
                    className={`w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.teamSize ? 'border-red-500' : ''}`}
                    defaultValue=""
                  >
                    <option value="" disabled>Select team size</option>
                    {TEAM_SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  {errors.teamSize && <p className="text-xs text-red-500 mt-1">{errors.teamSize.message as string}</p>}
                </div>
                <RHFTextField name="businessDescription" label="Business description (max 100 words)" placeholder="Describe what your startup does, the problem you're solving, and your target market" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <RHFTextField name="website" label="Enter your website (Optional)" placeholder="Example, www.yourstartup.com" />
                  <RHFTextField name="social" label="Enter your social media handle (Optional)" placeholder="Enter your startup's social media handle" />
                </div>
              </AccordionCard>
              <AccordionCard
                open={fundraiserOpen}
                onClick={() => setFundraiserOpen(v => !v)}
                title="Fundraising details"
              >
                <FundraiserDetailsSection methods={methods} errors={errors} />
              </AccordionCard>
            </div>
            {/* Desktop layout: all fields visible */}
            <div className="hidden md:block space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RHFTextField name="startupName" label="Startup Name" placeholder="Enter Your Startup's Name" />
                <RHFTextField name="startupLocation" label="Startup location" placeholder="City, county, country" />
                <div>
                  <label htmlFor="industry" className="block text-sm font-medium mb-1">Industry</label>
                  <select
                    id="industry"
                    {...methods.register('industry')}
                    className={`w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.industry ? 'border-red-500' : ''}`}
                    defaultValue=""
                  >
                    <option value="" disabled>Select Industry</option>
                    {INDUSTRY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  {errors.industry && <p className="text-xs text-red-500 mt-1">{errors.industry.message as string}</p>}
                </div>
                <div>
                  <label htmlFor="startupStage" className="block text-sm font-medium mb-1">Startup stage</label>
                  <select
                    id="startupStage"
                    {...methods.register('startupStage')}
                    className={`w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.startupStage ? 'border-red-500' : ''}`}
                    defaultValue=""
                  >
                    <option value="" disabled>Select stage</option>
                    {STAGE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  {errors.startupStage && <p className="text-xs text-red-500 mt-1">{errors.startupStage.message as string}</p>}
                </div>
                <div>
                  <label htmlFor="teamSize" className="block text-sm font-medium mb-1">Team size</label>
                  <select
                    id="teamSize"
                    {...methods.register('teamSize')}
                    className={`w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${errors.teamSize ? 'border-red-500' : ''}`}
                    defaultValue=""
                  >
                    <option value="" disabled>Select team size</option>
                    {TEAM_SIZE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  {errors.teamSize && <p className="text-xs text-red-500 mt-1">{errors.teamSize.message as string}</p>}
                </div>
              </div>
              <RHFTextField name="businessDescription" label="Business description (max 100 words)" placeholder="Describe what your startup does, the problem you're solving, and your target market" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <RHFTextField name="website" label="Enter your website (Optional)" placeholder="Example, www.yourstartup.com" />
                <RHFTextField name="social" label="Enter your social media handle (Optional)" placeholder="Enter your startup's social media handle" />
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
            className="w-[120px] md:w-[150px] rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
            disabled={!isValid}
          >
            Continue
            <ArrowRight className="size-4 sm:size-5" />
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default StartupFundraiserForm;
