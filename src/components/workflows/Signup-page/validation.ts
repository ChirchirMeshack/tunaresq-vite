import * as yup from "yup";


export const SignUpFormSchema = yup.object().shape({
	firstname: yup.string().required("Company Name is required"),
	lastname: yup.string().required("Company Name is required"),

	email_address: yup
		.string()
		.required("Email is required")
		.email("Enter a valid email address"),

	password: yup
		.string()
		.required("Password is required")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
			"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
		),
    password_confirm: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "Passwords must match")
        .required("Please confirm password"),
});

export type SignUpFormData = yup.InferType<typeof SignUpFormSchema>;

export const DefaultSignUpFormValues: SignUpFormData = {
	firstname: "",
    lastname: "",
	email_address: "",
	password: "",
    password_confirm: "",
};



// Validation schema with Yup
export const verificationSchema = yup.object({
  code: yup.string().length(6, "The code must be 6 digits long.").required("A code is required."),
	email_address: yup
		.string()
		.required("Email is required")
		.email("Enter a valid email address"),
});

export type VerificationFormData = yup.InferType<typeof verificationSchema>;