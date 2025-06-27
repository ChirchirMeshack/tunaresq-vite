
export interface Timestamps {
    createdAt: Date,
    updatedAt: Date
}

export interface USER extends Timestamps {
    id: string,
    firstname: string,
    lastname: string
    country_code: string
    mobile_number: string
    email_address: string
// role: 'donor' | 'recipient' | 'rider' | 'admin'
status:	'pending' | 'approved' | 'suspended'
profile_photo?: string
}