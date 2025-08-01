import axiosInstance from "@lib/axios";
import { handleErrors } from "@lib/utils";
import { USER } from "types/user";
 
export interface FundraiserPayload {
    user: string;
    fundraising_category_id: string;
}

export interface FundraiserResponse {
    id: string;
    user: USER;
    fundraising_category_id: string | null;
}

/**
 * Creates a new fundraiser
 * @param payload - Fundraiser data
 * @returns Promise with response data or error
 */
export const createFundraiser = async (
    payload: FundraiserPayload
): Promise<{ data: FundraiserResponse | null; error: unknown }> => {
    try {
        const result = await axiosInstance.post('/fundraisers/', payload);
        return { data: result.data.data as FundraiserResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error: error };
    }
};

/**
 * Gets fundraiser by ID
 * @param id - Fundraiser ID
 * @returns Promise with response data or error
 */
export const getFundraiser = async (
    id: string
): Promise<{ data: FundraiserResponse | null; error: unknown }> => {
    try {
        const result = await axiosInstance.get(`/fundraisers/${id}/`);
        return { data: result.data.data as FundraiserResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error: error };
    }
};

/**
 * Updates fundraiser
 * @param id - Fundraiser ID
 * @param payload - Updated fundraiser data
 * @returns Promise with response data or error
 */
export const updateFundraiser = async (
    id: string,
    payload: Partial<FundraiserPayload>
): Promise<{ data: FundraiserResponse | null; error: unknown }> => {
    try {
        const result = await axiosInstance.put(`/fundraisers/${id}/`, payload);
        return { data: result.data.data as FundraiserResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error: error };
    }
};

/**
 * Gets all fundraisers for the current user
 * @returns Promise with response data or error
 */
export const getAllFundraisers = async (): Promise<{ 
    data: FundraiserResponse[] | null; 
    error: unknown 
}> => {
    try {
        const result = await axiosInstance.get('/fundraisers/');
        return { data: result.data.data as FundraiserResponse[], error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error: error };
    }
};

/**
 * Deletes fundraiser
 * @param id - Fundraiser ID
 * @returns Promise with success status or error
 */
export const deleteFundraiser = async (
    id: string
): Promise<{ success: boolean; error: unknown }> => {
    try {
        await axiosInstance.delete(`/fundraisers/${id}/`);
        return { success: true, error: null };
    } catch (error) {
        handleErrors(error);
        return { success: false, error: error };
    }
}; 