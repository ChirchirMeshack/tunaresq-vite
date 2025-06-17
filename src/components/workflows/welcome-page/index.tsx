import { useState } from 'react';
import WelcomeDialog from "../../WelcomeDialog";
import FundraiserTypePage from "../fundraiserType-page";

const WelcomePage = () => {
	const [showFundraiserType, setShowFundraiserType] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(true);

	const handleCreateFundraiser = () => {
		setShowFundraiserType(true);
		setIsDialogOpen(false);
	};

	const handleClose = () => {
		setIsDialogOpen(false);
	};

	const handleSkipToSignUp = () => {
		// Handle sign up navigation here
		console.log('Navigate to sign up');
	};

	return (
		<div className="flex flex-col min-h-screen bg-gray-50 md:w-full">
			<main className="flex-grow flex items-center justify-center p-4">
				{!showFundraiserType ? (
					<WelcomeDialog 
						onCreateFundraiser={handleCreateFundraiser}
						skipToSignUp={handleSkipToSignUp}
						isOpen={isDialogOpen}
						handleClose={handleClose}
					/>
				) : (
					<FundraiserTypePage />
				)}
			</main>
		</div>
	);
};

export default WelcomePage;
