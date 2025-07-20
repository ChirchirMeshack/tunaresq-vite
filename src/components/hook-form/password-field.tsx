import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@components/ui/input"
import { Label } from "@components/ui/label"
import { useFormContext, Controller } from "react-hook-form"
import type { BaseFieldProps } from "types/form"

export function PasswordField({
  name,
  label,
  placeholder,
  required = false,
  disabled = false,
  className = "",
}: BaseFieldProps) {
  const [showPassword, setShowPassword] = useState(false)
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
      <div className="relative">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              id={name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              disabled={disabled}
              className={`h-11 pr-10 border-gray-300 focus:border-gray-400 focus:ring-0 ${error ? "border-red-500" : ""}`}
            />
          )}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </button>
      </div>
      {error && <p className="text-sm text-red-600">{error.message as string}</p>}
    </div>
  )
}
