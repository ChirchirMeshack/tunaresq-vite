/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useFormContext, Controller } from "react-hook-form"
import { useState, useCallback } from "react"
import { Upload, File, X } from "lucide-react"
import { Label } from "@components/ui/label"
import { Progress } from "@components/ui/progress"
import type { FileUploadProps } from "types/form"
import { formatFileSize } from "@lib/utils"

interface MultiFileUploadFieldProps extends FileUploadProps {
  maxFiles?: number
}

export function MultiFileUploadField({
  name,
  label,
  accept,
  maxSize = 10,
  maxFiles = 5,
  required = false,
  disabled = false,
  className = "",
}: MultiFileUploadFieldProps) {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext()
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: number }>({})
  const error = errors[name]

  const simulateUpload = useCallback((file: File): Promise<File> => {
    const fileId = `${file.name}-${file.size}-${Date.now()}` // Unique ID for tracking progress
    setUploadingFiles((prev) => ({ ...prev, [fileId]: 0 }))

    return new Promise((resolve) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadingFiles((prev) => ({ ...prev, [fileId]: progress }))
        if (progress >= 100) {
          clearInterval(interval)
          setUploadingFiles((prev) => {
            const { [fileId]: _, ...rest } = prev // Remove from uploading state
            return rest
          })
          resolve(file) // Resolve with the uploaded file
        }
      }, 100)
    })
  }, [])

  const handleFilesSelect = useCallback(
    async (newlySelectedFiles: File[]) => {
      const currentFiles = getValues(name) || []
      
      const filesToUpload = newlySelectedFiles.filter((file) => {
        // Check size limit and total file limit
        return file.size <= maxSize * 1024 * 1024 && currentFiles.length + Object.keys(uploadingFiles).length < maxFiles
      })

      if (filesToUpload.length === 0) return

      const uploadedPromises = filesToUpload.map((file) => simulateUpload(file))
      const uploadedFiles = await Promise.all(uploadedPromises)

      // Combine existing files with newly uploaded files and update using setValue
      const updatedFiles = [...currentFiles, ...uploadedFiles]
      setValue(name, updatedFiles, { shouldValidate: true })
    },
    [maxSize, maxFiles, uploadingFiles, simulateUpload, setValue, getValues, name],
  )

  const handleFileRemove = useCallback(
    (indexToRemove: number) => {
      const currentFiles = getValues(name) || []
      const newFiles = currentFiles.filter((_: any, i: any) => i !== indexToRemove)
      setValue(name, newFiles, { shouldValidate: true })
    },
    [setValue, getValues, name]
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
      handleFilesSelect(files)
    }
  }, [disabled, handleFilesSelect])

  const handleClick = useCallback(() => {
    if (disabled) return
    const input = document.createElement("input")
    input.type = "file"
    input.accept = accept || ""
    input.multiple = true
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || [])
      if (files.length > 0) {
        handleFilesSelect(files)
      }
    }
    input.click()
  }, [disabled, accept, handleFilesSelect])

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
          const currentFiles = field.value || []

          return (
            <div className="space-y-3">
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragOver ? "border-blue-400 bg-blue-50" : error ? "border-red-300" : "border-gray-300"
                } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
              >
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-3" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">Upload documents</p>
                  <p className="text-xs text-blue-600">Click to upload files or drag and drop here.</p>
                  <p className="text-xs text-gray-500">
                    Max {maxFiles} files, {maxSize}MB each
                  </p>
                </div>
              </div>

              {/* Uploading files */}
              {Object.entries(uploadingFiles).map(([fileId, progress]) => (
                <div key={fileId} className="space-y-2 p-3 bg-blue-50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Uploading {fileId.split("-")[0]}...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              ))}

              {/* Uploaded files */}
              {currentFiles.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Uploaded files:</p>
                  {currentFiles.map((file: any, index: any) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <File className="h-5 w-5 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleFileRemove(index)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
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