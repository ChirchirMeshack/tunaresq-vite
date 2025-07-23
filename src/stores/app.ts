import { create } from 'zustand';

interface StartupOption {
  id: string;
  name: string;
}

interface IndustryOption {
  id: string;
  name: string;
}

interface TeamSizeOption {
  id: string;
  name: string;
}
  
const industryOptions: IndustryOption[] = [
  { id: "technology", name: "Technology" },
  { id: "healthcare", name: "Healthcare" },
  { id: "finance", name: "Finance" },
  { id: "education", name: "Education" },
  { id: "retail", name: "Retail" },
  { id: "manufacturing", name: "Manufacturing" },
  { id: "agriculture", name: "Agriculture" },
  { id: "other", name: "Other" },
]

const stageOptions: StartupOption[] = [
  { id: "idea", name: "Idea Stage" },
  { id: "prototype", name: "Prototype" },
  { id: "mvp", name: "MVP" },
  { id: "growth", name: "Growth" },
  { id: "scale", name: "Scale" },
]

const teamSizeOptions: TeamSizeOption[] = [
  { id: "1", name: "Just me" },
  { id: "2-5", name: "2-5 people" },
  { id: "6-10", name: "6-10 people" },
  { id: "11-50", name: "11-50 people" },
  { id: "50+", name: "50+ people" },
]
interface AppCommonsStore {
  startUpOptions: StartupOption[];
  industryOptions: IndustryOption[];
  teamSizeOptions: TeamSizeOption[];
  updateStartUpOptions: (startUpOptions: StartupOption[] | string | StartupOption) => void;
  updateIndustryOptions: (industryOptions: IndustryOption[] | string | IndustryOption) => void;
  updateTeamSizeOptions: (teamSizeOptions: TeamSizeOption[] | string | TeamSizeOption) => void;
  resetCommonOptions: () => void;
}

export const useAppStore = create<AppCommonsStore>(
  (set) => ({
    
    startUpOptions: stageOptions || [],
    industryOptions: industryOptions || [],
    teamSizeOptions: teamSizeOptions || [],
    updateIndustryOptions: (industryOptions) => set((state) => {
      if (Array.isArray(industryOptions)) {
        // Replace items with new array
        return {
          ...state,
          industryOptions: industryOptions,
        };
      }
      const currentIndustries = state.industryOptions;
      if (typeof industryOptions === "string") {
        // Remove item by ID
        const filteredIndustries = currentIndustries.filter(
          (obj) => obj.id !== industryOptions
        );
        return {
          ...state,
          industryOptions: filteredIndustries,
        };
      }
      const foundIndex = currentIndustries.findIndex(
        (obj) => obj.id === industryOptions.id
      );
      if (foundIndex !== -1) {
        const updatedItems = [...currentIndustries];
        updatedItems[foundIndex] = industryOptions;
        return {
          ...state,
          industryOptions: updatedItems,
        };
      }
      return {
        ...state,
        industryOptions: [...currentIndustries, industryOptions],
      };
    }),
    updateStartUpOptions: (startUpOptions) => set((state) => {
      if (Array.isArray(startUpOptions)) {
        // Replace items with new array
        return {
          ...state,
          startUpOptions: startUpOptions,
        };
      }
      const currentStartUps = state.startUpOptions;
      if (typeof startUpOptions === "string") {
        // Remove item by ID
        const filteredStartUps = currentStartUps.filter(
          (obj) => obj.id !== startUpOptions
        );
        return {
          ...state,
          startUpOptions: filteredStartUps,
        };
      }
      const foundIndex = currentStartUps.findIndex(
        (obj) => obj.id === startUpOptions.id
      );
      if (foundIndex !== -1) {
        const updatedItems = [...currentStartUps];
        updatedItems[foundIndex] = startUpOptions;
        return {
          ...state,
          startUpOptions: updatedItems,
        };
      }
      return {
        ...state,
        startUpOptions: [...currentStartUps, startUpOptions],
      };
    }),
    updateTeamSizeOptions: (teamSizeOptions) => set((state) => {
      if (Array.isArray(teamSizeOptions)) {
        // Replace items with new array
        return {
          ...state,
          teamSizeOptions: teamSizeOptions,
        };
      }
      const currentTeamSizes = state.teamSizeOptions;
      if (typeof teamSizeOptions === "string") {
        // Remove item by ID
        const filteredTeamSizes = currentTeamSizes.filter(
          (obj) => obj.id !== teamSizeOptions
        );
        return {
          ...state,
          teamSizeOptions: filteredTeamSizes,
        };
      }
      const foundIndex = currentTeamSizes.findIndex(
        (obj) => obj.id === teamSizeOptions.id
      );
      if (foundIndex !== -1) {
        const updatedItems = [...currentTeamSizes];
        updatedItems[foundIndex] = teamSizeOptions;
        return {
          ...state,
          teamSizeOptions: updatedItems,
        };
      }
      return {
        ...state,
        teamSizeOptions: [...currentTeamSizes, teamSizeOptions],
      };
    }),
    resetCommonOptions: () => set(() => ({
      startUpOptions: [],
      industryOptions: [],
      teamSizeOptions: [],
    }))
  })
);