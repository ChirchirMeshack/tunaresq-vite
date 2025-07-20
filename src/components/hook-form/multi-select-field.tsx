

import { useFormContext, Controller } from "react-hook-form"
import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Label } from "@components/ui/label"
import { Button } from "@components/ui/button"
import { Badge } from "@components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@components/ui/popover"
import type { BaseFieldProps, SelectOption } from "types/form"

interface MultiSelectFieldProps extends BaseFieldProps {
  options: SelectOption[]
}

export function MultiSelectField({
  name,
  label,
  placeholder,
  options,
  required = false,
  disabled = false,
  className = "",
}: MultiSelectFieldProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext()
  const [open, setOpen] = useState(false)
  const error = errors[name]

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {!required && <span className="text-gray-500 ml-1">(Optional)</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const selectedValues = field.value || []
          const selectedOptions = options.filter((option) => selectedValues.includes(option.value))

          const handleSelect = (optionValue: string) => {
            const newValues = selectedValues.includes(optionValue)
              ? selectedValues.filter((value: string) => value !== optionValue)
              : [...selectedValues, optionValue]
            field.onChange(newValues)
          }

          const handleRemove = (optionValue: string) => {
            const newValues = selectedValues.filter((value: string) => value !== optionValue)
            field.onChange(newValues)
          }

          return (
            <div className="space-y-2">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={`h-11 w-full justify-between border-gray-300 hover:border-gray-400 ${
                      error ? "border-red-500" : ""
                    }`}
                    disabled={disabled}
                  >
                    <span className="text-gray-500">
                      {selectedValues.length > 0 ? `${selectedValues.length} selected` : placeholder}
                    </span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandList>
                      <CommandEmpty>No options found.</CommandEmpty>
                      <CommandGroup>
                        {options.map((option) => (
                          <CommandItem key={option.value} onSelect={() => handleSelect(option.value)}>
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                selectedValues.includes(option.value) ? "opacity-100" : "opacity-0"
                              }`}
                            />
                            {option.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>

              {selectedOptions.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedOptions.map((option) => (
                    <Badge key={option.value} variant="secondary" className="px-2 py-1 text-xs">
                      {option.label}
                      <button
                        type="button"
                        onClick={() => handleRemove(option.value)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )
        }}
      />
      {error && <p className="text-sm text-red-600">{error.message as string}</p>}
    </div>
  )
}
