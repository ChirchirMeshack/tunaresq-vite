import { FormProvider, useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';
import { RHFTextField } from '@components/form/RHFTextField';
import { Button } from '@components/ui/button';


const IndividualFundraiserForm = () => {
  const methods = useForm<Record<string, unknown>>();
  const onSubmit = (data: Record<string, unknown>) => {
    // TODO: handle submit
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="w-full max-w-lg mx-auto sm:mt-2 mt-2 px-2 sm:px-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2 text-center">Fundraiser details</CardTitle>
            <CardDescription className="text-center">
              Share the details of your fundraiser so we can know how to help you. Make it as detailed as possible
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RHFTextField name="title" label="Fundraiser title" placeholder="Give your fundraiser a clear, attention-grabbing title" />
            <div>
              <label htmlFor="details" className="block text-sm font-medium mb-1">Fundraiser details (max 100 words)</label>
              <textarea
                id="details"
                {...methods.register('details')}
                placeholder="What is the fundraiser about? Share the details here"
                className="w-full border rounded-md p-2 text-sm min-h-[96px] focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={1000}
              />
            </div>
            <RHFTextField name="goal" label="What is your fundraising goal? (In USD)" placeholder="USD 0.00" type="number" min={0} step="0.01" />
            <div className="border rounded-lg p-4 flex flex-col items-center text-center">
              <label className="block text-sm font-medium mb-1">Upload your fundraiser's Image</label>
              <div className="flex flex-col items-center w-full">
                <input type="file" accept="image/*" className="block w-full text-sm mb-1" />
                <p className="text-xs text-muted-foreground mt-1">Fundraisers with images receive 35% more donations<br/>
                  <span className="text-blue-600 underline cursor-pointer">Click to upload file</span> or drag and drop here.<br/>
                  maximum file size 15MB
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="w-full max-w-lg mx-auto flex flex-col sm:flex-row justify-between gap-3 mt-4 px-2 sm:px-0">
          <Button type="button" variant="outline" className="w-full sm:w-[120px]">Back</Button>
          <Button type="submit" className="w-full sm:w-[120px]">Continue</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default IndividualFundraiserForm;
