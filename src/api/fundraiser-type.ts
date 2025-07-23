import { Timestamps } from './commons';
import axiosInstance from '@lib/axios';

export interface FundraiserType extends Timestamps {
    id: string,
    name: string,
    icon: string,
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

