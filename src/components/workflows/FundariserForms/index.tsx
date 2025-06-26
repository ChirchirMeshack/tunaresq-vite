import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useFundraiserTypeStore } from '@lib/fundraiserTypeStore';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';
import { RHFTextField } from '@components/form/RHFTextField';
import { Button } from '@components/ui/button';
import IndividualFundraiserForm from './individualForm';

const StartupFundraiserForm = () => {
  const methods = useForm<Record<string, unknown>>();
  const onSubmit = (data: Record<string, unknown>) => {
    // TODO: handle submit
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-3xl mx-auto sm:mt-8 mt-2 px-2 sm:px-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-2">Tell us about your startup</CardTitle>
            <CardDescription>
              Share the details of your fundraiser so we can know how to help you. Make it as detailed as possible
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RHFTextField name="startupName" label="Startup Name" placeholder="Enter Your Startup's Name" />
              <RHFTextField name="startupLocation" label="Startup location" placeholder="City, county, country" />
              <RHFTextField name="industry" label="Industry" placeholder="Select Industry" />
              <RHFTextField name="startupStage" label="Startup stage" placeholder="Select stage" />
              <RHFTextField name="teamSize" label="Team size" placeholder="Select team size" />
            </div>
            <RHFTextField name="businessDescription" label="Business description (max 100 words)" placeholder="Describe what your startup does, the problem you're solving, and your target market" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RHFTextField name="website" label="Enter your website (Optional)" placeholder="Example, www.yourstartup.com" />
              <RHFTextField name="social" label="Enter your social media handle (Optional)" placeholder="Enter your startup's social media handle" />
            </div>
            <RHFTextField name="title" label="Fundraiser title" placeholder="Give your fundraiser a clear, attention-grabbing title" />
            <RHFTextField name="details" label="Fundraiser details (max 100 words)" placeholder="Explain how you'll use the funds and what milestones you will achieve" />
            <RHFTextField name="goal" label="What is your fundraising goal? (In USD)" placeholder="USD 0.00" type="number" min={0} step="0.01" />
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <label className="block text-sm font-medium mb-1">Upload your fundraiser's Image</label>
              <input type="file" accept="image/*" className="block w-full text-sm" />
              <p className="text-xs text-muted-foreground mt-1">Fundraisers with images receive 35% more donations<br/>Click to upload file or drag and drop here.<br/>maximum file size 15MB</p>
            </div>
          </CardContent>
        </Card>
        <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row justify-between gap-3 mt-4 px-2 sm:px-0">
          <Button type="button" variant="outline" className="w-full sm:w-[120px]">Back</Button>
          <Button type="submit" className="w-full sm:w-[120px]">Continue</Button>
        </div>
      </form>
    </FormProvider>
  );
};

const OrganizationFundraiserForm = () => {
  const methods = useForm<Record<string, unknown>>();
  const onSubmit = (data: Record<string, unknown>) => {
    // TODO: handle submit
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-3xl mx-auto sm:mt-8 mt-2 px-2 sm:px-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold mb-2">Tell us about your organization</CardTitle>
            <CardDescription>
              Share information about your nonprofit or charity organization.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RHFTextField name="organizationName" label="Organization name" placeholder="Enter your organization's name" />
              <RHFTextField name="registrationNumber" label="Registration number" placeholder="Non-profit/charity organization registration number" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <RHFTextField name="website" label="Enter your organization's website (Optional)" placeholder="Example, my.organization.com" />
              <RHFTextField name="social" label="Enter your social media handle (Optional)" placeholder="Enter your main social media handle for your organization" />
            </div>
            <RHFTextField name="mission" label="Organization's mission (max 50 words)" placeholder="Describe what your non-profit organization's mission and what problem you're solving" />
            <RHFTextField name="title" label="Fundraiser title" placeholder="Give your fundraiser a clear, attention-grabbing title" />
            <RHFTextField name="details" label="Fundraiser details (max 100 words)" placeholder="Explain why you're raising funds and how they'll be used" />
            <RHFTextField name="goal" label="What is your fundraising goal? (In USD)" placeholder="USD 0.00" type="number" min={0} step="0.01" />
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <label className="block text-sm font-medium mb-1">Upload your fundraiser's Image</label>
              <input type="file" accept="image/*" className="block w-full text-sm" />
              <p className="text-xs text-muted-foreground mt-1">Fundraisers with images receive 35% more donations<br/>Click to upload file or drag and drop here.<br/>maximum file size 15MB</p>
            </div>
          </CardContent>
        </Card>
        <div className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row justify-between gap-3 mt-4 px-2 sm:px-0">
          <Button type="button" variant="outline" className="w-full sm:w-[120px]">Back</Button>
          <Button type="submit" className="w-full sm:w-[120px]">Continue</Button>
        </div>
      </form>
    </FormProvider>
  );
};

const FundraiserDetailsPage = () => {
  const { fundraiserType } = useFundraiserTypeStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fundraiserType) {
      navigate('/registration/fundraiser-type'); // Adjust route as needed
    }
  }, [fundraiserType, navigate]);

  if (!fundraiserType) return null;

  if (fundraiserType === 'yourself') {
    return <IndividualFundraiserForm />;
  }
  if (fundraiserType === 'startup') {
    return <StartupFundraiserForm />;
  }
  if (fundraiserType === 'organization') {
    return <OrganizationFundraiserForm />;
  }
  return null;
};

export default FundraiserDetailsPage; 