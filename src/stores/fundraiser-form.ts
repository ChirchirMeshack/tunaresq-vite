// import { IndividualFundraiserFormData } from '@components/workflows/FundariserForms/individualForm';
// import { OrganizationFundraiserFormData } from '@components/workflows/FundariserForms/OrganizationForm';
// import { StartupFundraiserFormData } from '@components/workflows/FundariserForms/startupForm';
import { create } from 'zustand';

interface FundraiserTypeState {
  fundraiserType: string | null;
  fundraiserDetails: string | null;
  // IndividualFundraiserFormData | StartupFundraiserFormData | OrganizationFundraiserFormData | null;
  setFundraiserType: (type: string) => void;
  setFundraiserDetails: (details: string) => void;
  // (details: IndividualFundraiserFormData | StartupFundraiserFormData | OrganizationFundraiserFormData) => void;
}
const fundraiserDetails = 
    `Help Sarah Johnson recover from a life-changing accident.
    Sarah, a devoted mother of two and elementary school teacher,
    was involved in a serious car accident that has left her with multiple injuries requiring extensive medical treatment and rehabilitation.
    The medical bills are mounting, and she will be unable to work for several months while she recovers.
    Your donation will help cover medical expenses, physical therapy, and basic living costs for her family during this difficult time.
    Every contribution, no matter how small, makes a meaningful difference in Sarah's journey to recovery.`
  ;

export const useFundraiserTypeStore = create<FundraiserTypeState>((set) => ({
  fundraiserType: null,
  fundraiserDetails: fundraiserDetails || null,
  setFundraiserDetails: (details) => set({ fundraiserDetails: details }),
  setFundraiserType: (type) => set({ fundraiserType: type }),
})); 