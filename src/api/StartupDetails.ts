import axiosInstance from "@lib/axios";
import { handleErrors } from "@lib/utils";

export interface Timestamps {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface StartupDetailsPayload {
    fundraiser?: string;
    fundraiser_title: string;
    fundraiser_details: string;
    fundraiser_goal: number;
    startup_name: string;
    business_description: string;
    location: string;
    industry: string;
    industry_name?: string;
    stage: string;
    stage_name?: string;
    team_size: string;
    team_size_name?: string;
    website?: string;
    social_media?: string;
}

export interface StartupDetailsResponse extends Timestamps {
    id: string;
    fundraiser: string;
    fundraiser_title: string;
    fundraiser_details: string;
    fundraiser_goal: number;
    startup_name: string;
    business_description: string;
    location: string;
    industry: string;
    industry_name: string;
    stage: string;
    stage_name: string;
    team_size: string;
    team_size_name: string;
    website: string | null;
    social_media: string | null;
    created_by: string;
    updated_by: string;
}

/**
 * Creates startup details for a fundraiser
 * @param payload - Startup details data
 * @returns Promise with response data or error
 */
export const createStartupDetails = async (
    payload: StartupDetailsPayload
): Promise<{ data: StartupDetailsResponse | null; error: unknown }> => {
    try {
        const result = await axiosInstance.post('/startup-details/', payload);
        return { data: result.data as StartupDetailsResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error: error };
    }
};

/**
 * Gets startup details by ID
 * @param id - Startup details ID
 * @returns Promise with response data or error
 */
export const getStartupDetails = async (
    id: string
): Promise<{ data: StartupDetailsResponse | null; error: unknown }> => {
    try {
        const result = await axiosInstance.get(`/startup-details/${id}/`);
        return { data: result.data as StartupDetailsResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error: error };
    }
};

/**
 * Updates startup details
 * @param id - Startup details ID
 * @param payload - Updated startup details data
 * @returns Promise with response data or error
 */
export const updateStartupDetails = async (
    id: string,
    payload: Partial<StartupDetailsPayload>
): Promise<{ data: StartupDetailsResponse | null; error: unknown }> => {
    try {
        const result = await axiosInstance.put(`/startup-details/${id}/`, payload);
        return { data: result.data as StartupDetailsResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error: error };
    }
};
