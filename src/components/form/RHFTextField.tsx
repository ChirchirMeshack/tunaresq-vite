import { ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { Input } from "@components/ui/input"; // Adjust the import path as needed
import { Label } from "@components/ui/label"; // Adjust the import path as needed

import { cn } from "@lib/utils"; // Assuming you have a utility for className merging

interface TextFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label: string;
	hideLabel?: boolean; // used to show or hide label
	secured?: boolean; // used for password
	confirmPasswordHandler?: (ev: ChangeEvent<HTMLInputElement>) => void; // Not used in this example, but kept for similarity
	description?: string; // Optional description text below the input
}

const TextField = ({
	name,
	label,
	className,
    hideLabel = false,
	description,
	...props
}: TextFieldProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div className="grid w-full items-center gap-1.5">
                    {!hideLabel && (
						<Label htmlFor={name}>{label}</Label>
					)}
					
					<Input
						id={name}
						{...field}
						className={cn(className, error && "border-destructive")} // Apply error styling
						{...props}
					/>
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

export default TextField;
