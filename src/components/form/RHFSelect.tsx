import { useFormContext } from "react-hook-form";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select";

interface SelectFieldProps {
	name: string;
	label: string;
	hideLabel?: boolean; // used to show or hide label
	description?: string; // Optional description text below the input
    selectOptions: { id: string; name: string }[]
	placeholder?: string;
	actionButton?: React.ReactNode
	loading?: boolean
}

const SelectField = ({
	name,
	label,
    hideLabel = false,
	loading = false,
	description,
	placeholder,
    selectOptions,
	actionButton,
	...props
}: SelectFieldProps) => {
	const { control } = useFormContext();

	return (
		<FormField
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
                <FormItem>
                        {!hideLabel && (
						<FormLabel>{label}</FormLabel>
					)}
                <div className={actionButton ? "flex items-center gap-2" : ""}>
                    <Select
                    {...props}
					{...field}
					// className={cn(className, error && "border-destructive")}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={placeholder || 'Select an option'} />
                      </SelectTrigger>
                        </FormControl>
                          <SelectContent>
							{!loading && selectOptions.length === 0 && <SelectItem value={`no-${name}`} disabled>No options found. Add one.</SelectItem>}
                    
                      {selectOptions.map((data) => (
                        <SelectItem key={data.id} value={data.id}>
                          {data.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
				  {actionButton && (
					  <>{actionButton}</>				  
				  )}
                </div>
					{description && !error && (
						<FormDescription>{description}</FormDescription>
                    )}
                        
					{error && (
						<FormMessage>{error.message}</FormMessage>
					)}
                      </FormItem>
				
			)}
		/>
	);
};

export default SelectField;
