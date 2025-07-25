import * as yup from 'yup';

// Define the form schema with validation rules
export const formSchema = yup.object().shape({
    name: yup.string().required('Full name is required').default(''),
    email: yup.string().email('Invalid email address').required('Email is required'),
  });

// Define the form values type
export type FormValues = yup.InferType<typeof formSchema>

// Define the default form values
export const DefaultWaitListFormValues: FormValues = {
    name: "",
    email: "",
};