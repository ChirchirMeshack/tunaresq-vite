import { useState } from "react";
import { Building2, User, Users } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Step } from '@lib/progressUtils';
import { Button } from "@components/ui/button";

const FundraiserTypePage = () => {
	const [selectedFundraiserType, setSelectedFundraiserType] = useState<string | null>(null);
	const { handleStepComplete, setCurrentStep } = useOutletContext<{ steps: Step[]; currentStep: string; handleStepComplete: (stepId: string) => void; setCurrentStep: (stepId: string) => void }>();

	const handleBack = () => {
		setCurrentStep('welcome');
	};

	const handleContinue = () => {
		handleStepComplete('select-beneficiary');
	};

	return (
		<>
			<div className="flex flex-col max-w-3xl">
				<section className="flex-grow flex items-center justify-center p-4 sm:p-6">
					<div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-2xl border border-gray-200">
						<h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800">
							Who are you fundraising for?
						</h2>
						<p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
							Select the option that best describes your fundraiser.
						</p>

						<div className="space-y-3 sm:space-y-4">
							{/* For Yourself */}
							<label
								className={`flex items-center p-3 sm:p-4 rounded-lg border cursor-pointer ${selectedFundraiserType === "yourself" ? "border-green-500 bg-green-50" : "border-gray-300"}`}
								htmlFor="yourself"
							>
								<input
									type="radio"
									id="yourself"
									name="fundraiserType"
									value="yourself"
									checked={selectedFundraiserType === "yourself"}
									onChange={() => setSelectedFundraiserType("yourself")}
									className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-green-600"
								/>
								<div className="ml-3 sm:ml-4 flex-grow">
									<span className="text-base sm:text-lg font-semibold text-gray-800">
										For Yourself
									</span>
									<p className="text-xs sm:text-sm text-gray-500">
										You are raising funds for yourself or your project
									</p>
								</div>
								{/* User icon from lucide-react */}
								<div className="text-gray-400">
									<User className="size-5 sm:size-6" />
								</div>
							</label>

							{/* For a Startup or Business */}
							<label
								className={`flex items-center p-3 sm:p-4 rounded-lg border cursor-pointer ${selectedFundraiserType === "startup" ? "border-green-500 bg-green-50" : "border-gray-300"}`}
								htmlFor="startup"
							>
								<input
									type="radio"
									id="startup"
									name="fundraiserType"
									value="startup"
									checked={selectedFundraiserType === "startup"}
									onChange={() => setSelectedFundraiserType("startup")}
									className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-green-600"
								/>
								<div className="ml-3 sm:ml-4 flex-grow">
									<span className="text-base sm:text-lg font-semibold text-gray-800">
										For a Startup or Business
									</span>
									<p className="text-xs sm:text-sm text-gray-500">
										You are raising funds for your startup or your business
									</p>
								</div>
								{/* Users icon from lucide-react */}
								<div className="text-gray-400">
									<Users className="size-5 sm:size-6" />
								</div>
							</label>

							{/* For a Charity or Nonprofit */}
							<label
								className={`flex items-center p-3 sm:p-4 rounded-lg border cursor-pointer ${selectedFundraiserType === "organization" ? "border-green-500 bg-green-50" : "border-gray-300"}`}
								htmlFor="organization"
							>
								<input
									type="radio"
									id="organization"
									name="fundraiserType"
									value="organization"
									checked={selectedFundraiserType === "organization"}
									onChange={() => setSelectedFundraiserType("organization")}
									className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-green-600"
								/>
								<div className="ml-3 sm:ml-4 flex-grow">
									<span className="text-base sm:text-lg font-semibold text-gray-800">
										For a Charity or Nonprofit
									</span>
									<p className="text-xs sm:text-sm text-gray-500">
										You are raising funds for a charity drive or a nonprofit organisation
									</p>
								</div>
								{/* Building icon from lucide-react */}
								<div className="text-gray-400">
									<Building2 className="size-5 sm:size-6" />
								</div>
							</label>
						</div>
					</div>
				</section>
				{/* Buttons outside the card */}
				<div className="w-full max-w-2xl mx-auto px-2 sm:px-4 pb-6 flex flex-row justify-between gap-3 sm:gap-4">
					<Button
						onClick={handleBack}
						variant="outline"
						className="flex-1 max-w-xs rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-4 sm:size-5 mr-1 sm:mr-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
							/>
						</svg>
						Back
					</Button>
					<Button
						onClick={handleContinue}
						className="flex-1 max-w-xs rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
						disabled={!selectedFundraiserType}
						// Disable button if no type is selected
					>
						Continue
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-4 sm:size-5 ml-1 sm:ml-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
							/>
						</svg>
					</Button>
				</div>
			</div>
		</>
	);
};

export default FundraiserTypePage;
