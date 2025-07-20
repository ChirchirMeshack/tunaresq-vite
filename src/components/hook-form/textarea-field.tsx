

import { useFormContext, Controller } from "react-hook-form"
import { Textarea } from "@components/ui/textarea"
import { Label } from "@components/ui/label"
import type { BaseFieldProps } from "types/form"

interface TextAreaFieldProps extends BaseFieldProps {
  rows?: number
  maxLength?: number
}

export function TextAreaField({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  className = "",
}: TextAreaFieldProps) {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext()
  const error = errors[name]
  const currentValue = watch(name) || ""

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <Label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
          {maxLength && <span className="text-gray-500 ml-1">(max {maxLength} words)</span>}
          {!required && <span className="text-gray-500 ml-1">(Optional)</span>}
        </Label>
        {maxLength && (
          <span className="text-xs text-gray-500">
            {currentValue.split(" ").filter(Boolean).length}/{maxLength} words
          </span>
        )}
      </div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Textarea
            {...field}
            id={name}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            className={`border-gray-300 focus:border-gray-400 focus:ring-0 resize-none ${
              error ? "border-red-500" : ""
            }`}
          />
        )}
      />
      {error && <p className="text-sm text-red-600">{error.message as string}</p>}
    </div>
  )
}
