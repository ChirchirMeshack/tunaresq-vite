import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface WelcomeCardProps {
	onCreateFundraiser: () => void;
	skipToSignUp: () => void;
}

const WelcomeCard = ({ onCreateFundraiser, skipToSignUp }: WelcomeCardProps) => {
	return (
		<Card className="w-full max-w-md mx-auto">
			<CardHeader>
				<CardTitle>Welcome to TunaresQ</CardTitle>
				<CardDescription>
					Welcome to TunaresQ! We're excited to help you raise funds for your cause
					or your startup.
					<br />
					<br />
					TunaresQ makes it easy to create and share your fundraiser with friends,
					family, and your community. Let's get started with a few simple steps to
					set up your fundraiser.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					onClick={onCreateFundraiser}
					className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
				>
					Let's create your fundraiser
				</Button>
				<Button
					onClick={skipToSignUp}
					variant="outline"
					className="text-gray-700 border-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded"
				>
					Or sign up to support other fundraisers
				</Button>
			</CardContent>
		</Card>
	);
};

export default WelcomeCard;
