import axiosInstance from "@lib/axios";
import { handleErrors } from "@lib/utils";

export interface FundraiserPayload {
    image: File;
    fundraiser: string;
}

export interface FundraiserResponse {
    id: string;
    image: string; // URL or path to image
    fundraiser: string | null;
}

/**
 * Creates a new fundraiser image
 * @param payload - Fundraiser image data
 * @returns Promise with response data or error
 */
export const createFundraiserImage = async (
    payload: FundraiserPayload
): Promise<{ data: FundraiserResponse | null; error: unknown }> => {
    try {
        const formData = new FormData();
        formData.append("image", payload.image);
        formData.append("fundraiser", payload.fundraiser);

        const result = await axiosInstance.post('/fundraiser-images/', formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return { data: result.data as FundraiserResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error };
    }
};

/**
 * Gets fundraiser image by ID
 * @param id - Fundraiser image ID
 * @returns Promise with response data or error
 */
export const getFundraiserImage = async (
    id: string
): Promise<{ data: FundraiserResponse | null; error: unknown }> => {
    try {
        const result = await axiosInstance.get(`/fundraiser-images/${id}/`);
        return { data: result.data as FundraiserResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error };
    }
};

/**
 * Updates fundraiser image
 * @param id - Fundraiser image ID
 * @param payload - Updated fundraiser image data
 * @returns Promise with response data or error
 */
export const updateFundraiserImage = async (
    id: string,
    payload: Partial<FundraiserPayload>
): Promise<{ data: FundraiserResponse | null; error: unknown }> => {
    try {
        const formData = new FormData();
        if (payload.image) formData.append("image", payload.image);
        if (payload.fundraiser) formData.append("fundraiser", payload.fundraiser);

        const result = await axiosInstance.put(`/fundraiser-images/${id}/`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        return { data: result.data as FundraiserResponse, error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error };
    }
};

/**
 * Gets all fundraiser images for the current user
 * @returns Promise with response data or error
 */
export const getAllFundraiserImages = async (): Promise<{ 
    data: FundraiserResponse[] | null; 
    error: unknown 
}> => {
    try {
        const result = await axiosInstance.get('/fundraiser-images/');
        return { data: result.data.data as FundraiserResponse[], error: null };
    } catch (error) {
        handleErrors(error);
        return { data: null, error };
    }
};

/**
 * Deletes fundraiser image
 * @param id - Fundraiser image ID
 * @returns Promise with success status or error
 */
export const deleteFundraiserImage = async (
    id: string
): Promise<{ success: boolean; error: unknown }> => {
    try {
        await axiosInstance.delete(`/fundraiser-images/${id}/`);
        return { success: true, error: null };
    } catch (error) {
        handleErrors(error);
        return { success: false, error };
    }
};