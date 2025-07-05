import axiosInstance from "@lib/axios";
import { handleErrors } from "@lib/utils";

export interface Timestamps {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface OrganizationDetailsPayload {
    fundraiser?: string;
    fundraiser_title: string;
    fundraiser_details: string;
    fundraiser_goal: number;
    organisation_name: string;
    registration_number: string;
    website?: string;
    social_media?: string;
    mission: string;
}

export interface OrganizationDetailsResponse extends Timestamps {
    id: string;
    fundraiser: string;
    fundraiser_title: string;
    fundraiser_details: string;
    fundraiser_goal: string; // API returns as string
    organisation_name: string;
    registration_number: string;
    website: string | null;
    social_media: string | null;
    mission: string;
    is_active: boolean;
    created_by: string;
    updated_by: string;
}

/**
 * Creates organization details for a fundraiser
 * @param payload - Organization details data
 * @returns Promise with response data or error
 */
export const createOrganizationDetails = async (
    payload: OrganizationDetailsPayload
): Promise<{ data: OrganizationDetailsResponse | null; error: unknown }> => {
    try {
        const result = await axiosInstance.post('/organisation-details/', payload);
        return { data: result.data as OrganizationDetailsResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error: error };
    }
};

/**
 * Gets organization details by ID
 * @param id - Organization details ID
 * @returns Promise with response data or error
 */
export const getOrganizationDetails = async (
    id: string
): Promise<{ data: OrganizationDetailsResponse | null; error: unknown }> => {
    try {
        const result = await axiosInstance.get(`/organisation-details/${id}/`);
        return { data: result.data as OrganizationDetailsResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error: error };
    }
};

/**
 * Updates organization details
 * @param id - Organization details ID
 * @param payload - Updated organization details data
 * @returns Promise with response data or error
 */
export const updateOrganizationDetails = async (
    id: string,
    payload: Partial<OrganizationDetailsPayload>
): Promise<{ data: OrganizationDetailsResponse | null; error: unknown }> => {
    try {
        const result = await axiosInstance.put(`/organisation-details/${id}/`, payload);
        return { data: result.data as OrganizationDetailsResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error: null };
    }
};

/**
 * Gets all organization details
 * @returns Promise with response data or error
 */
export const getAllOrganizationDetails = async (): Promise<{ 
    data: OrganizationDetailsResponse[] | null; 
    error: unknown 
}> => {
    try {
        const result = await axiosInstance.get('/organisation-details/');
        return { data: result.data.data as OrganizationDetailsResponse[], error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error: error };
    }
};

/**
 * Deletes organization details
 * @param id - Organization details ID
 * @returns Promise with success status or error
 */
export const deleteOrganizationDetails = async (
    id: string
): Promise<{ success: boolean; error: unknown }> => {
    try {
        await axiosInstance.delete(`/organisation-details/${id}/`);
        return { success: true, error: null };
    } catch (error) {
        handleErrors(error);
        return { success: false, error: error };
    }
};

