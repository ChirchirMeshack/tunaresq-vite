import WelcomeDialog from "../../components/WelcomeDialog";

const WelcomePage = () => {
	return (
		<div className="flex flex-col min-h-screen bg-gray-50 md:w-full">
			<main className="flex-grow flex items-center justify-center p-4">
				<WelcomeDialog />
			</main>
		</div>
	);
};

export default WelcomePage;
