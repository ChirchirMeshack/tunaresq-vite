import { create } from 'zustand';

interface FundraiserTypeState {
  fundraiserType: string | null;
  setFundraiserType: (type: string) => void;
}

export const useFundraiserTypeStore = create<FundraiserTypeState>((set) => ({
  fundraiserType: null,
  setFundraiserType: (type) => set({ fundraiserType: type }),
})); 