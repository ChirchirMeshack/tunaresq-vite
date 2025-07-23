

import { useFormContext, Controller } from "react-hook-form"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import type { BaseFieldProps } from "types/form"

interface TextFieldProps extends BaseFieldProps {
  type?: "text" | "email" | "url" | "tel"
  maxLength?: number
}

export function TextField({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  type = "text",
  className = "",
  maxLength,
}: TextFieldProps) {
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
          <Input
            {...field}
            id={name}
            type={type}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={disabled}
            className={`h-11 border-gray-300 focus:border-gray-400 focus:ring-0 ${error ? "border-red-500" : ""}`}
          />
        )}
      />
      {error && <p className="text-sm text-red-600">{error.message as string}</p>}
    </div>
  )
}
