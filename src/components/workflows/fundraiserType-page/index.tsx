import { useState } from "react";

const FundraiserTypePage = () => {
	const [selectedFundraiserType, setSelectedFundraiserType] = useState("");

	return (
		<>
			<div className="flex flex-col min-h-screen  md:w-full">
				<section className="flex-grow flex items-center justify-center p-4 sm:p-6">
					<div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-2xl">
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
								{/* Placeholder for icon */}
								<div className="text-gray-400">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="size-5 sm:size-6"
									>
										<path
											fillRule="evenodd"
											d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
											clipRule="evenodd"
										/>
									</svg>
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
								{/* Placeholder for icon */}
								<div className="text-gray-400">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="size-5 sm:size-6"
									>
										<path
											d="M4.5 6.375a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.75 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM7.5 10.875a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5h-6ZM17.25 10.875a.75.75 0 0 0 0 1.5H21a.75.75 0 0 0 0-1.5h-3.75ZM4.5 15.75a.75.75 0 0 0 0 1.5h5.25a.75.75 0 0 0 0-1.5H4.5ZM17.25 15.75a.75.75 0 0 0 0 1.5H21a.75.75 0 0 0 0-1.5h-3.75ZM3 19.5a.75.75 0 0 0 0 1.5h18a.75.75 0 0 0 0-1.5H3Z"
										/>
									</svg>
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
								{/* Placeholder for icon */}
								<div className="text-gray-400">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="currentColor"
										className="size-5 sm:size-6"
									>
										<path
											fillRule="evenodd"
											d="M12.602 1.5c-1.391 0-2.872.267-4.301.782A43.324 43.324 0 0 0 2.25 5.25c-1.071.189-1.802.993-1.802 2.076v9.274c0 1.083.731 1.887 1.802 2.076 2.585.456 5.262.831 8.022 1.026v2.302a.75.75 0 0 0 1.5 0V20.62c2.76-.195 5.437-.57 8.022-1.026 1.071-.189 1.802-.993 1.802-2.076V7.326c0-1.083-.731-1.887-1.802-2.076a43.326 43.326 0 0 0-6.051-2.968A4.52 4.52 0 0 0 12.602 1.5ZM8.25 12a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5Z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
							</label>
						</div>

						<div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4">
							<button className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 w-full sm:w-auto">
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
							</button>
							<button
								className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 w-full sm:w-auto"
								onClick={() => console.log(selectedFundraiserType)}
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
							</button>
						</div>
					</div>
				</section>
			</div>
			</>
	);
};

export default FundraiserTypePage;
