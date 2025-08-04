import { useFormContext, Controller } from "react-hook-form"
import { useState, useCallback } from "react"
import { Upload, File } from "lucide-react"
import { Label } from "@components/ui/label"
import type { FileUploadProps } from "types/form"
import { formatFileSize } from "@lib/utils"
import { enqueueSnackbar } from "notistack"

export function FileUploadField({
  name,
  label,
  accept,
  maxSize = 15,
  required = false,
  disabled = false,
  className = "",
}: FileUploadProps) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext()
  const [isDragOver, setIsDragOver] = useState(false)
  const error = errors[name]

  const handleFileSelect = useCallback(
    (file: File) => {
      if (file.size > maxSize * 1024 * 1024) {
        // Show an error notification if file exceeds max size
        enqueueSnackbar(`File size exceeds ${maxSize}MB limit`)
        return
      }
      // Directly set the form value using react-hook-form's setValue
      setValue(name, file, { shouldValidate: true })
    },
    [maxSize, setValue, name],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }, [disabled])

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (disabled) return

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      if (accept && (accept.includes(file.type) || accept.includes(`.${file.name.split(".").pop()}`))) {
        handleFileSelect(file)
      } else if (!accept) {
        handleFileSelect(file)
      }
    }
  }, [disabled, accept, handleFileSelect])

  const handleClick = useCallback(() => {
    if (disabled) return
    
    const input = document.createElement("input")
    input.type = "file"
    input.accept = accept || ""
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    }
    input.click()
  }, [disabled, accept, handleFileSelect])

  const handleRemove = useCallback(() => {
    setValue(name, null, { shouldValidate: true })
  }, [setValue, name])

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-gray-700">
        {label}
        {!required && <span className="text-gray-500 ml-1">(Optional)</span>}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="space-y-3">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver ? "border-blue-400 bg-blue-50" : error ? "border-red-300" : "border-gray-300"
              } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-900">Upload an image</p>
                <p className="text-sm text-gray-600">Fundraisers with images receive 35% more donations</p>
                <p className="text-sm text-blue-600">Click to upload file or drag and drop here.</p>
                <p className="text-xs text-gray-500">maximum file size {maxSize}MB</p>
              </div>
            </div>

            {field.value && (
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <File className="h-5 w-5 text-gray-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{field.value.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(field.value.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={handleRemove}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        )}
      />
      {error && <p className="text-sm text-red-600">{error.message as string}</p>}
    </div>
  )
}