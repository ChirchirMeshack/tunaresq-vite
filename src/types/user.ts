
export interface Timestamps {
            verified_at: string | null;
            created_at: string;
            updated_at: string;
}

export interface USER extends Timestamps {            
            id: string;
            firstname: string;
            lastname: string;
            full_name: string;
            country_code: string;
            mobile_number: string;
            email_address: string;
            is_verified: boolean;
        }