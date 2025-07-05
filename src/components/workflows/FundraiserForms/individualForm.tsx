import { FormProvider, useForm } from 'react-hook-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@components/ui/card';
import { RHFTextField } from '@components/form/RHFTextField';
import { Button } from '@components/ui/button';
import { ArrowLeft, ArrowRight, ImagePlus } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LayoutContextType } from '@layouts/registration';
import { createIndividualDetails, IndividualDetailsPayload } from '../../../api/IndividualDetails';
import { createFundraiser, FundraiserPayload } from '../../../api/fundraiser';
import { getAllFundraiserTypes, FundraiserType } from '../../../api/fundraiser-type';
import { handleErrors } from '@lib/utils';
import useAuthCtx from '../../../contexts/auth/use-auth';

const validationSchema = yup.object({
  title: yup.string().required('Fundraiser title is required').max(120, 'Title must be at most 120 characters'),
  details: yup.string().required('Fundraiser details are required').max(1000, 'Details must be at most 1000 characters'),
  goal: yup
    .number()
    .typeError('Goal must be a number')
    .required('Fundraising goal is required')
    .positive('Goal must be a positive number'),
  // image: yup.mixed().notRequired(),
});

export type IndividualFundraiserFormData = yup.InferType<typeof validationSchema>;
	
const IndividualFundraiserForm = () => {
  const methods = useForm<IndividualFundraiserFormData>({
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });
  const { handleStepComplete, handleBackStep } = useOutletContext<LayoutContextType>();
  const { user } = useAuthCtx();

	const handleBack = () => {
		handleBackStep('create-account');
	};

	// Submit handler: creates fundraiser first, then individual details
	const onSubmit = async (data: IndividualFundraiserFormData) => {
		try {
			console.log('Starting individual fundraiser creation...');
			
			if (!user) {
				console.error('No user found');
				handleErrors(new Error('User not authenticated'));
				return;
			}

			// Get fundraising categories to find the individual category ID
			const { data: categories, error: categoriesError } = await getAllFundraiserTypes();
			if (categoriesError || !categories) {
				console.error('Failed to get fundraising categories:', categoriesError);
				handleErrors(categoriesError || new Error('Failed to get fundraising categories'));
				return;
			}

			// Find the individual category
			const individualCategory = categories.find((cat: FundraiserType) => 
				cat.name.toLowerCase().includes('individual') || 
				cat.name.toLowerCase().includes('personal')
			);

			if (!individualCategory) {
				console.error('Individual fundraising category not found');
				handleErrors(new Error('Individual fundraising category not found'));
				return;
			}

			// Step 1: Create the fundraiser first
			const fundraiserPayload: FundraiserPayload = {
				user: user.id,
				fundraising_category: individualCategory.id
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

			// Step 2: Create individual details with the fundraiser ID
			const individualPayload: IndividualDetailsPayload = {
				fundraiser: fundraiserResult.id,
				fundraiser_title: data.title,
				fundraiser_details: data.details,
				fundraiser_goal: data.goal,
			};

			console.log('Creating individual details with payload:', individualPayload);
			const { data: individualResult, error: individualError } = await createIndividualDetails(individualPayload);
			
			if (individualError) {
				console.error('Failed to create individual details:', individualError);
				handleErrors(individualError);
				return;
			}

			// Success: proceed to next step or show success message
			console.log('Individual fundraiser created successfully:', { 
				fundraiser: fundraiserResult, 
				details: individualResult 
			});
			console.log('Full individual details response:', individualResult);
			handleStepComplete('fundraiser-details');
			
		} catch (error) {
			console.error('Unexpected error during submission:', error);
			handleErrors(error);
		}
	};

	const { formState: { errors, isValid } } = methods;

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<Card className="w-full max-w-3xl mx-auto sm:mt-2 mt-2 px-8 sm:px-4.5">
					<CardHeader>
						<CardTitle className="text-2xl font-bold mb-2 text-center md:text-left">Fundraiser details</CardTitle>
						<CardDescription className="text-center">
							Share the details of your fundraiser so we can know how to help you. Make it as detailed as possible
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
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
								placeholder="What is the fundraiser about? Share the details here"
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
								<span className="text-xs text-[#bdbdbd] mt-2">maximum file size 15MB</span>
							</div>
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

export default IndividualFundraiserForm;
