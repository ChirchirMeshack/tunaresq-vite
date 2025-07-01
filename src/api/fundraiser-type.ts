import axiosInstance from "@lib/axios";

export interface Timestamps {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}
export interface FundraiserType extends Timestamps {
    id: string,
    name: string,
    description: string
    is_active: boolean,
    created_by: string,
    updated_by: string
}


// GET /fundraiser-types
export const getAllFundraiserTypes = async () => {
    try {
        const result = await axiosInstance.get('/common/fundraising-categories/');
        return {data: result.data.data, error: null};
    } catch (error) {
        console.log(error);
        return {data: null, error: error};
    }
}

