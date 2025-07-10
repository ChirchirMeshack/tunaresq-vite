import axiosInstance from "@lib/axios";
import { handleErrors } from "@lib/utils";

export interface Timestamps {
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface Timestamps2 {
    created_at: string;
    updated_at: string;
}


export interface UserLog extends Timestamps {
    created_by: string,
    updated_by: string
}

export interface Industry extends UserLog {
    id: string;
    name: string;
    description?: string;
    is_active?: boolean;
}

export interface StartupStage extends UserLog {
    id: string;
    name: string;
    description?: string;
    is_active?: boolean;
}

export interface TeamSizes extends UserLog {
    id: string;
    name: string;
    description?: string;
    is_active?: boolean;
}


// GET /industries
export const getAllIndustries = async (): Promise<{ data: Industry[] | null; error: unknown }> => {
    try {
        const result = await axiosInstance.get('/common/industries/');
        return {data: result.data.data as Industry[], error: null};
    } catch (error) {
        handleErrors(error);
        return {data: null, error: error};
    }
}

//GET /Startup stages 
export const getAllStartupStages = async (): Promise<{ data: StartupStage[] | null; error: unknown }> => {
    try {
        const result = await axiosInstance.get('/common/startup-stages/');
        return {data: result.data.data as StartupStage[], error: null};
    } catch (error) {
        handleErrors(error);
        return {data: null, error: error};
    }
}

//GET /Team sizes
export const getAllTeamSizes = async (): Promise<{ data: TeamSizes[] | null; error: unknown }> => {
    try {
        const result = await axiosInstance.get('/common/team-sizes/');
        return {data: result.data.data as TeamSizes[], error: null};
    } catch (error) {
        handleErrors(error);
        return {data: null, error: error};
    }
}
