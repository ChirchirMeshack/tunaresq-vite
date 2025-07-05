import axiosInstance from "@lib/axios";
import { handleErrors } from "@lib/utils";

export interface Timestamps {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface IndividualDetails extends Timestamps {
    id: string;
    fundraiser_title: string;
    fundraiser_details: string;
    fundraiser_goal: string;
    created_by: string;
    updated_by: string;
    fundraiser: string;
}

export interface IndividualDetailsPayload {
    fundraiser: string;
    fundraiser_title: string;
    fundraiser_goal: number;
    fundraiser_details: string;
}

// CREATE individual details
export const createIndividualDetails = async (payload: IndividualDetailsPayload) => {
    try {
        console.log('Creating individual details with payload:', payload);
        const result = await axiosInstance.post('/individual-details/', payload);
        console.log('Individual details created successfully:', result.data);
        return { data: result.data, error: null };
    } catch (error) {
        console.error('Error creating individual details:', error);
        handleErrors(error);
        return { data: null, error };
    }
};

// GET individual details by ID
export const getIndividualDetails = async (id: string) => {
    try {
        const result = await axiosInstance.get(`/individual-details/${id}/`);
        return { data: result.data, error: null };
    } catch (error) {
        console.error('Error fetching individual details:', error);
        handleErrors(error);
        return { data: null, error };
    }
};

// GET all individual details
export const getAllIndividualDetails = async () => {
    try {
        const result = await axiosInstance.get('/individual-details/');
        return { data: result.data, error: null };
    } catch (error) {
        console.error('Error fetching all individual details:', error);
        handleErrors(error);
        return { data: null, error };
    }
};

// UPDATE individual details
export const updateIndividualDetails = async (id: string, payload: Partial<IndividualDetailsPayload>) => {
    try {
        const result = await axiosInstance.put(`/individual-details/${id}/`, payload);
        return { data: result.data, error: null };
    } catch (error) {
        console.error('Error updating individual details:', error);
        handleErrors(error);
        return { data: null, error };
    }
};

// DELETE individual details
export const deleteIndividualDetails = async (id: string) => {
    try {
        await axiosInstance.delete(`/individual-details/${id}/`);
        return { data: true, error: null };
    } catch (error) {
        console.error('Error deleting individual details:', error);
        handleErrors(error);
        return { data: null, error };
    }
};
