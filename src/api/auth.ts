/* eslint-disable @typescript-eslint/no-explicit-any */
import { SignUpFormData } from '@components/onboarding-forms/validation';
import axiosInstance, { authenticatedAxiosInstance } from '@lib/axios';
import axios from 'axios';
import { BASE_URL } from 'config';
import { USER } from 'types/user';

interface LoginResponse {
    data: {
        access_token: string;
        token_type: string;
        expires_in: number;
        user: USER;
    } | null;
    message: string;
}

interface RegisterResponse {
    message: string;
    data: {
        user: USER;
        tokens: {
            refresh: string;
            access: string;
        };
        warning?: string;
    } | null;
}
interface VerifyAccountResponse {
    message: string;
    data: {
        user: USER;
    } | null;
}
interface ResetPasswordResponse {
    message: string;
    data: {
    token:string,
    new_password:string,
    confirm_password:string
    } | null;
}
interface ForgotPasswordResponse {
    message: string;
    data: {
        email_address: string;
    } | null;
}

export async function signInWithEmailAndPassword(email: string, password: string): Promise<LoginResponse> {
    try {
        const response = await axiosInstance.post(`/users/login/`, { email_address: email, password });
       
        return {data: response.data.data, message: response.data.message};
    } catch (error: any) {
        return {
            message: error.response?.data?.message || "Invalid email or password",
            data: null
        };
    }
}

export async function registerWithEmailAndPassword(formData: SignUpFormData): Promise<RegisterResponse> {
    try {
        const response = await axiosInstance.post(`/users/register/`, formData);
        return {
            message: response.data.message,
            data: response.data.data
        };
    } catch (error: any) {
        return {
            message: error.response?.data?.message || "Registration failed",
            data: null
        };
    }
}

export async function signInWithFirebaseAuth(provider: 'google' | 'facebook' | 'twitter', data: any): Promise<LoginResponse> {
    try {
        const payload ={
            firstname: data.displayName.split(' ')[0],
    lastname: data.displayName.split(' ')[1] || '',
	email_address: data.email,
	uid: data.uid,
    photoURL: data.photoURL,
    provider: data.providerId || provider,
        }
        const response = await axios.post(`${BASE_URL}/users/social-auth/`, payload);
        return {
            data: response.data.data,
            message: response.data.message
        };
    } catch (error: any) {
        return {
            message: error.response?.data?.message || "Firebase authentication failed",
            data: null
        };
    }
}


export async function verifyAccount(email: string, otp: string): Promise<VerifyAccountResponse> {
    try {
        const response = await axiosInstance.post(`/users/verify/`, {
    email_address:email,
    verification_code:otp
});
        return {
            message: response.data.message,
            data: response.data.data
        };
    } catch (error: any) {
        return {
            message: error.response?.data?.message || "Account verification failed",
            data: null
        };
    }
}


export async function resendVerificationCode(email: string): Promise<{ message: string, type:string }> {
    try {
        const response = await axiosInstance.post(`/users/verify/`, {
    email_address:email
});
        return {
            message: response.data.message,
            type: "success"
        };
    } catch (error: any) {
        return {
            message: error.response?.data?.message || "verification request failed",
            type: "error"
        };
    }
}

export async function forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    try {
        const response = await axiosInstance.post(`/users/forgot_password/`, { email_address: email });
        return {
            message: response.data.message,
            data: response.data.data
        };
    } catch (error: any) {
        return {
            message: error.response?.data?.message || "Forgot password request failed",
            data: null
        };
    }
}

export async function resetPassword(_email: string, otp: string, newPassword: string): Promise<ResetPasswordResponse> {
    try {
        const response = await axiosInstance.post(`/users/reset_password/`, {
    token:  otp,
    new_password:   newPassword,
    confirm_password:   newPassword
    });
        return {
            message: response.data.message,
            data: response.data.data
        };
    } catch (error: any) {
        return {
            message: error.response?.data?.message || "Reset password failed",
            data: null
        };
    }
}

// logout
export async function logoutUser(): Promise<{ message: string; type: string }> {
    try {
        await authenticatedAxiosInstance.post(`/users/logout/`, {});
        return { message: "Logout successful", type: "success" };
    } catch (error: any) {
        return { message: error.response?.data?.message || "Logout failed", type: "error" };
    }
}