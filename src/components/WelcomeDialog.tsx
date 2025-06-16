import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const WelcomeDialog = () => {
	const navigate = useNavigate();

	// const handleClose = () => {
	// 	navigate("/");
	// };

	const handleCreateFundraiser = () => {
		navigate("/register/fundraiser-type");
	};

	const handleSignUp = () => {
		navigate("/signUp");
	};

	return (
		<Dialog open={true} >
			<DialogContent className="w-full max-w-md p-6">
				<DialogHeader className="text-center">
					<DialogTitle className="text-2xl font-bold mb-4">
						Welcome to TunaresQ
					</DialogTitle>
					<DialogDescription className="text-gray-600 text-base leading-relaxed">
						Welcome to TunaresQ! We're excited to help you raise funds for your cause
						or your startup.
						<br />
						<br />
						TunaresQ makes it easy to create and share your fundraiser with friends,
						family, and your community. Let's get started with a few simple steps to
						set up your fundraiser.
					</DialogDescription>
				</DialogHeader>
				<div className="flex flex-col space-y-4 mt-6">
					<Button 
						onClick={handleCreateFundraiser}
						className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
					>
						Let's create your fundraiser
					</Button>
					<Button 
						onClick={handleSignUp}
						variant="outline" 
						className="text-gray-700 border-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded"
					>
						Or sign up to support other fundraisers
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default WelcomeDialog;
