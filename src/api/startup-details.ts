import axiosInstance from "@lib/axios";
import { Timestamps2 as Timestamps } from "./commons";


export interface StartupDetails extends Timestamps {
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
    website?: string;
    social_media?: string ;
}

// POST /startup-details
export const createStartupDetails = async (startupDetails: Omit<StartupDetails, 'id' | 'created_at' | 'updated_at'>) => {
    try {
        const result = await axiosInstance.post('/startup-details/', startupDetails);
        return { data: result.data.data, error: null };
    } catch (error) {
        // @ts-expect-error: handleErrors may not be typed as a function in some contexts
        if (typeof handleErrors === 'function') handleErrors(error);
        return { data: null, error };
    }
};


