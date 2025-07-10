import { IndividualFundraiserFormData } from '@components/workflows/FundraiserForms/individualForm';
import { OrganizationFundraiserFormData } from '@components/workflows/FundraiserForms/OrganizationForm';
import { StartupFundraiserFormData } from '@components/workflows/FundraiserForms/startupForm';
import { create } from 'zustand';
import { FundraiserType } from '../api/fundraiser-type';


export type FundraiserData =
  | IndividualFundraiserFormData
  | StartupFundraiserFormData
  | OrganizationFundraiserFormData;

// interface FundraiserTypeState {
//   fundraiserType: string | null;
//   fundraiserData: FundraiserData | null;
//   setFundraiserType: (type: string) => void;
//   setFundraiserDetails: (details: string) => void;
//   setFundraiserData: (data: FundraiserData) => void;
// }
export const fundraiserDetails = 
    `Help Sarah Johnson recover from a life-changing accident.
    Sarah, a devoted mother of two and elementary school teacher,
    was involved in a serious car accident that has left her with multiple injuries requiring extensive medical treatment and rehabilitation.
    The medical bills are mounting, and she will be unable to work for several months while she recovers.
    Your donation will help cover medical expenses, physical therapy, and basic living costs for her family during this difficult time.
    Every contribution, no matter how small, makes a meaningful difference in Sarah's journey to recovery.`
  ;

  
interface FundraiserTypeStore {
  fundraiserTypes: FundraiserType[];
  selectedFundraiserType: string | null;
  selectFundraiserType: (type: string) => void;
  updateFundraiserTypes: (
    fundraiserData: FundraiserType[] | FundraiserType | string
  ) => void;
  resetFundraiserTypes: () => void;
}

export const useFundraiserTypeStore = create<FundraiserTypeStore>(
  (set) => ({
    fundraiserTypes: [],
    selectedFundraiserType: null,
    selectFundraiserType: (type) => set({ selectedFundraiserType: type }),
    updateFundraiserTypes: (fundraisersData) =>
      set((state) => {
        if (Array.isArray(fundraisersData)) {
          // Replace items with new array
          return {
            ...state,
            fundraiserTypes: fundraisersData,
          };
        }

        const currentFundraisers = state.fundraiserTypes;
  
        if (typeof fundraisersData === "string") {
          // Remove item by ID
          const filteredFundraisers = currentFundraisers.filter(
            (obj) => obj.id !== fundraisersData
          );
          return {
            ...state,
            fundraiserTypes: filteredFundraisers,
          };
        }
  
        // Update or add single fundraiser
        const foundIndex = currentFundraisers.findIndex(
          (obj) => obj.id === fundraisersData.id
        );
  
        if (foundIndex !== -1) {
          const updatedItems = [...currentFundraisers];
          updatedItems[foundIndex] = fundraisersData;
          return {
            ...state,
            fundraiserTypes: updatedItems,
          };
        }
  
        return {
          ...state,
          fundraiserTypes: [...currentFundraisers, fundraisersData],
        };
      }),
    resetFundraiserTypes: () =>
      set((state) => {
        return {
          ...state,
          fundraiserTypes: [],
        };
      }),
  })
);


// export const useFundraiserTypeStore = create<FundraiserTypeState>((set) => ({
//   fundraiserType: null,
//   fundraiserData: null,

//   setFundraiserType: (type) => set({ fundraiserType: type }),

//   setFundraiserDetails: (details) =>
//     set((state) => {
//       if (!state.fundraiserData) {
//         console.warn("Trying to set details, but fundraiserData is null");
//         return state;
//       }
//       return {
//         fundraiserData: { ...state.fundraiserData, details },
//       };
//     }),

//   setFundraiserData: (data) => set({ fundraiserData: data }),
// }));