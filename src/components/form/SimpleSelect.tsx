import { useFormContext } from 'react-hook-form';
import { FieldError } from 'react-hook-form';

interface SimpleSelectProps {
  name: string;
  label: string;
  placeholder: string;
  options: string[];
  loading?: boolean;
  error?: string | null;
  disabled?: boolean;
  className?: string;
}

/**
 * Simple select dropdown component for string-based options
 * Handles loading states, error display, and form validation
 */
export const SimpleSelect = ({
  name,
  label,
  placeholder,
  options,
  loading = false,
  error = null,
  disabled = false,
  className = ''
}: SimpleSelectProps) => {
  const { register, formState: { errors } } = useFormContext();
  const fieldError = errors[name] as FieldError | undefined;

  return (
    <div className={className}>
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        className={`w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
          fieldError || error ? 'border-red-500' : ''
        }`}
        defaultValue=""
        disabled={loading || disabled}
      >
        <option value="" disabled>
          {loading ? 'Loading...' : placeholder}
        </option>
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      {fieldError && <p className="text-xs text-red-500 mt-1">{fieldError.message as string}</p>}
    </div>
  );
}; 