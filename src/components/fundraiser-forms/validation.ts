import * as yup from "yup";
export const fundraiserDetailsSchema = yup.object({
  title: yup
    .string()
    .required("Fundraiser title is required")
    .max(120, "Title must be at most 120 characters"),
  details: yup
    .string()
    .required("Fundraiser details are required")
    .max(1000, "Details must be at most 1000 characters"),
  goal: yup
    .number()
    .typeError("Goal must be a number")
    .required("Fundraising goal is required")
    .positive("Goal must be a positive number"),
  // image: yup.mixed().notRequired(),
});

export type IndividualFundraiserFormData = yup.InferType<
  typeof fundraiserDetailsSchema
>;


export const startUpDetailsSchema = yup.object({
  startupName: yup.string().required('Startup name is required'),
  startupLocation: yup.string().required('Startup location is required'),
  industry: yup.string().required('Industry is required'),
  startupStage: yup.string().required('Startup stage is required'),
  teamSize: yup.string().required('Team size is required'),
  businessDescription: yup.string().required('Business description is required').max(1000, 'Description must be at most 1000 characters'),
  website: yup.string().url('Enter a valid URL').notRequired().nullable().default(''),
  social: yup.string().notRequired().nullable().default(''),
  title: yup.string().required('Fundraiser title is required').max(120, 'Title must be at most 120 characters'),
  details: yup.string().required('Fundraiser details are required').max(1000, 'Details must be at most 1000 characters'),
  goal: yup
    .number()
    .typeError('Goal must be a number')
    .required('Fundraising goal is required')
    .positive('Goal must be a positive number'),
  // image: yup.mixed().notRequired(),
});

export type StartupFundraiserFormData = yup.InferType<typeof startUpDetailsSchema>;

export const OrganizationDetailsSchema = yup.object({
  organizationName: yup.string().required("Organization name is required"),
  registrationNumber: yup.string().required("Registration number is required"),
  website: yup
    .string()
    .url("Enter a valid URL")
    .notRequired()
    .nullable()
    .default(""),
  social: yup.string().notRequired().nullable().default(""),
  mission: yup
    .string()
    .required("Organization's mission is required")
    .max(500, "Mission must be at most 500 characters"),
  title: yup
    .string()
    .required("Fundraiser title is required")
    .max(120, "Title must be at most 120 characters"),
  details: yup
    .string()
    .required("Fundraiser details are required")
    .max(1000, "Details must be at most 1000 characters"),
  goal: yup
    .number()
    .typeError("Goal must be a number")
    .required("Fundraising goal is required")
    .positive("Goal must be a positive number"),
  image: yup.object().shape({
    file: yup.mixed(),
    preview: yup.string(),
  }),
});

export type OrganizationFundraiserFormData = yup.InferType<
  typeof OrganizationDetailsSchema
>;
