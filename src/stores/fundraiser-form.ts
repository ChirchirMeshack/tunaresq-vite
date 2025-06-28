import { IndividualFundraiserFormData } from '@components/workflows/FundariserForms/individualForm';
import { OrganizationFundraiserFormData } from '@components/workflows/FundariserForms/OrganizationForm';
import { StartupFundraiserFormData } from '@components/workflows/FundariserForms/startupForm';
import { create } from 'zustand';


export type FundraiserData =
  | IndividualFundraiserFormData
  | StartupFundraiserFormData
  | OrganizationFundraiserFormData;

interface FundraiserTypeState {
  fundraiserType: string | null;
  fundraiserData: FundraiserData | null;
  setFundraiserType: (type: string) => void;
  setFundraiserDetails: (details: string) => void;
  setFundraiserData: (data: FundraiserData) => void;
}
export const fundraiserDetails = 
    `Help Sarah Johnson recover from a life-changing accident.
    Sarah, a devoted mother of two and elementary school teacher,
    was involved in a serious car accident that has left her with multiple injuries requiring extensive medical treatment and rehabilitation.
    The medical bills are mounting, and she will be unable to work for several months while she recovers.
    Your donation will help cover medical expenses, physical therapy, and basic living costs for her family during this difficult time.
    Every contribution, no matter how small, makes a meaningful difference in Sarah's journey to recovery.`
  ;

export const useFundraiserTypeStore = create<FundraiserTypeState>((set) => ({
  fundraiserType: null,
  fundraiserData: null,

  setFundraiserType: (type) => set({ fundraiserType: type }),

  setFundraiserDetails: (details) =>
    set((state) => {
      if (!state.fundraiserData) {
        console.warn("Trying to set details, but fundraiserData is null");
        return state;
      }
      return {
        fundraiserData: { ...state.fundraiserData, details },
      };
    }),

  setFundraiserData: (data) => set({ fundraiserData: data }),
}));