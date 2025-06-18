import { useState } from 'react';
import WelcomeCard from "../../WelcomeCard";
import FundraiserTypePage from "../fundraiserType-page";

const WelcomePage = () => {
	const [showFundraiserType, setShowFundraiserType] = useState(false);

	const handleCreateFundraiser = () => {
		setShowFundraiserType(true);
	};

	const handleSkipToSignUp = () => {
		// Handle sign up navigation here
		console.log('Navigate to sign up');
	};

	return (
		<div className="flex flex-col min-h-screen md:w-full">
			<main className="flex-grow flex items-center justify-center p-4">
				{!showFundraiserType ? (
					<WelcomeCard
						onCreateFundraiser={handleCreateFundraiser}
						skipToSignUp={handleSkipToSignUp}
					/>
				) : (
					<FundraiserTypePage />
				)}
			</main>
		</div>
	);
};

export default WelcomePage;
