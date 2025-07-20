export interface BaseFieldProps {
  name: string
  label: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
}

export interface SelectOption {
  value: string
  label: string
}

export interface FileUploadProps extends BaseFieldProps {
  accept?: string
  maxSize?: number // in MB
  maxFiles?: number
}
