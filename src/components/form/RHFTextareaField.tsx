import { Controller, useFormContext } from "react-hook-form";

import { Label } from "@components/ui/label"; // Adjust the import path as needed

import { cn } from "@lib/utils"; // Assuming you have a utility for className merging
import { Textarea } from "@components/ui/textarea";

/**
 * TextFieldProps Interface
 * Defines the props for the TextField component
 */
interface TextAreaFieldProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: string;              // Field name for form control
	label: string;             // Label text for the input
	hideLabel?: boolean;       // Option to hide the label
	description?: string;      // Optional description text below the input
	endContent?: React.ReactNode; // Optional content to display at the end
}


const RHFTextAreaField = ({
	name,
	label,
	className,
    hideLabel = false,
	description,
	endContent,
	...props
}: TextAreaFieldProps) => {
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
                        <Textarea
						id={name}
						{...field}
						className={cn(className, error && "border-destructive")} // Apply error styling
						{...props}
					/>
					{endContent && (endContent
					)}
              </div>

                    {/* Description or Error Message Container */}
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
			)}
		/>
	);
};

export default RHFTextAreaField;
