import * as yup from "yup";


export const SignUpFormSchema = yup.object().shape({
	firstName: yup.string().required("Company Name is required"),
	lastName: yup.string().required("Company Name is required"),

	email: yup
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
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password"), undefined], "Passwords must match")
        .required("Please confirm password"),
});

export type SignUpFormData = yup.InferType<typeof SignUpFormSchema>;

export const DefaultSignUpFormValues: SignUpFormData = {
	firstName: "",
    lastName: "",
	email: "",
	password: "",
    confirmPassword: "",
};
