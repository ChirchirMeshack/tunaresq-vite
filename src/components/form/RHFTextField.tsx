import { ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@components/ui/input"; // Adjust the import path as needed
import { Label } from "@components/ui/label"; // Adjust the import path as needed

import { cn } from "@lib/utils"; // Assuming you have a utility for className merging

/**
 * TextFieldProps Interface
 * Defines the props for the TextField component
 */
interface TextFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;              // Field name for form control
	label: string;             // Label text for the input
	hideLabel?: boolean;       // Option to hide the label
	secured?: boolean;         // Option for password field
	confirmPasswordHandler?: (ev: ChangeEvent<HTMLInputElement>) => void; // Not used in this example, but kept for similarity
	description?: string;      // Optional description text below the input
	endContent?: React.ReactNode; // Optional content to display at the end
}

/**
 * TextField Component
 * A reusable form input component that integrates with React Hook Form
 * 
 * Features:
 * - Form validation integration
 * - Error message display
 * - Optional description text
 * - Customizable styling
 * - Label visibility control
 */
const TextField = ({
	name,
	label,
	className,
    hideLabel = false,
	description,
	endContent,
	...props
}: TextFieldProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div className="grid w-full items-center gap-1.5 md:min-h-[80px]">
                    {/* Label - Conditionally rendered based on hideLabel prop */}
                    {!hideLabel && (
						<Label htmlFor={name}>{label}</Label>
					)}
					
                    {/* Input Field */}
					<Input
						id={name}
						{...field}
						className={cn(className, error && "border-destructive")} // Apply error styling
						{...props}
					/>

					{/* End Content */}
					{endContent && (
						<div className="absolute right-2 top-2">{endContent}</div>
					)}

                    {/* Description or Error Message Container */}
                    <div className="md:min-h-[20px]">
                        {description && !error && (
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                        {error && (
                            <p className="text-sm font-medium text-destructive">
                                {error.message}
                            </p>
                        )}
                    </div>
				</div>
			)}
		/>
	);
};


export const RHFTextField = ({
	name,
	label,
	className,
    hideLabel = false,
	description,
	endContent,
	...props
}: TextFieldProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div className="grid w-full items-center gap-1.5">
                    {/* Label - Conditionally rendered based on hideLabel prop */}
                    {!hideLabel && (
						<Label htmlFor={name}>{label}</Label>
					)}
					
					<div className="relative">
                    {/* Input Field */}
					<Input
						id={name}
						{...field}
						className={cn(className, error && "border-destructive")} // Apply error styling
						{...props}
					/>
					{endContent && (endContent
					)}
              </div>


                    {/* Description or Error Message Container */}
                    <div className="md:min-h-[20px]">
                        {description && !error && (
                            <p className="text-sm text-muted-foreground">
                                {description}
                            </p>
                        )}
                        {error && (
                            <p className="text-sm font-medium text-destructive">
                                {error.message}
                            </p>
                        )}
                    </div>
				</div>
			)}
		/>
	);
};

export default TextField;
