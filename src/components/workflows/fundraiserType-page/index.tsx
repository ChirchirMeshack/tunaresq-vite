// import { useState } from "react";
import { User, ArrowLeft, ArrowRight } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Button } from "@components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@components/ui/card";
import { useFundraiserTypeStore } from 'stores/fundraiser-form';
import { LayoutContextType } from '@layouts/registration';
import useAuthCtx from '@contexts/auth/use-auth';

const FundraiserTypePage = () => {
	const {user} = useAuthCtx();
	const { fundraiserTypes, selectedFundraiserType, selectFundraiserType } = useFundraiserTypeStore();
	const { handleStepComplete, setCurrentStep } = useOutletContext<LayoutContextType>();

	const handleBack = () => {
		setCurrentStep('welcome');
	};

	const handleContinue = () => {
		if (user) {
			handleStepComplete('create-account');
		} else {
		handleStepComplete('select-beneficiary');
			
		}
	};

	return (
		<>
		<div className="flex flex-col">
			<Card className="w-full max-w-3xl mx-auto">
				<CardHeader>
					<CardTitle className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
						Who are you fundraising for?
					</CardTitle>
					<CardDescription className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
						Select the option that best describes your fundraiser.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3 sm:space-y-4">
					{/* For Yourself */}
					{fundraiserTypes && fundraiserTypes.length > 0 && (
						fundraiserTypes.map((fundraiserType) => (
					<label
					key={fundraiserType.name}
						className={`flex items-center p-3 sm:p-4 rounded-lg border cursor-pointer ${fundraiserType.name === selectedFundraiserType ? "border-green-500 bg-green-50" : "border-gray-300"}`}
						htmlFor={fundraiserType.name}
					>
						<input
							type="radio"
							id={fundraiserType.name}
							name="fundraiserType"
							value={fundraiserType.name}
							checked={fundraiserType.name === selectedFundraiserType}
							onChange={() => selectFundraiserType(fundraiserType.name)}
							className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-green-600"
						/>
						<div className="ml-3 sm:ml-4 flex-grow">
							<span className="text-base sm:text-lg font-semibold text-gray-800">
								{fundraiserType.name.charAt(0).toUpperCase() + fundraiserType.name.slice(1)}
							</span>
							<p className="text-xs sm:text-sm text-gray-500">
								{fundraiserType.description}
							</p>
						</div>
						{/* User icon from lucide-react */}
						<div className="text-gray-400">
							<User className="size-5 sm:size-6" />
						</div>
					</label>)
))}
				</CardContent>
			</Card>
			<div className="w-full max-w-3xl mx-auto px-2 sm:px-4 pb-6 flex flex-row justify-between gap-3 sm:gap-4 mt-4">
				<Button
					onClick={handleBack}
					variant="outline"
					className="w-[120px] md:w-[150px] rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
				>
					<ArrowLeft className="size-4 sm:size-5" />
					Back
				</Button>
				<Button
					onClick={handleContinue}
					className="w-[120px] md:w-[150px] rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
					disabled={!selectedFundraiserType}
					// Disable button if no type is selected
				>
					Continue
					<ArrowRight className="size-4 sm:size-5" />
				</Button>
			</div>
			</div>
		</>
	);
};

export default FundraiserTypePage;
