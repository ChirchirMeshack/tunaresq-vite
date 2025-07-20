

import { useFormContext, Controller } from "react-hook-form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@components/ui/select"
import { Label } from "@components/ui/label"
import type { BaseFieldProps, SelectOption } from "types/form"

interface SelectFieldProps extends BaseFieldProps {
  options: SelectOption[]
}

export function SelectField({
  name,
  label,
  placeholder,
  options,
  required = false,
  disabled = false,
  className = "",
}: SelectFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const error = errors[name]

  return (
    <div className={`space-y-2 ${className}`}>
      <Label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
        {!required && <span className="text-gray-500 ml-1">(Optional)</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value} disabled={disabled}>
            <SelectTrigger
              className={`h-11 border border-gray-300 rounded-md focus:border-gray-400 focus:ring-0 bg-white ${error ? "border-red-500" : ""}`}
            >
              <SelectValue placeholder={placeholder} className="text-gray-500" />
            </SelectTrigger>
            <SelectContent className="border border-gray-200 rounded-md shadow-lg bg-white p-0">
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-none focus:bg-gray-50 text-gray-700"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />
      {error && <p className="text-sm text-red-600">{error.message as string}</p>}
    </div>
  )
}
