

import { useFormContext, Controller } from "react-hook-form"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import type { BaseFieldProps } from "types/form"
import { formatCurrency } from "@lib/utils"

interface CurrencyFieldProps extends BaseFieldProps {
  currency?: string
}

export function CurrencyField({
  name,
  label,
  placeholder = "0.00",
  currency = "USD",
  required = false,
  disabled = false,
  className = "",
}: CurrencyFieldProps) {
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
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
              {currency}
            </div>
            <Input
              {...field}
              id={name}
              type="text"
              placeholder={placeholder}
              disabled={disabled}
              className={`h-11 pl-12 border-gray-300 focus:border-gray-400 focus:ring-0 ${
                error ? "border-red-500" : ""
              }`}
              onChange={(e) => {
                const formatted = formatCurrency(e.target.value)
                field.onChange(formatted)
              }}
            />
          </div>
        )}
      />
      {error && <p className="text-sm text-red-600">{error.message as string}</p>}
    </div>
  )
}
