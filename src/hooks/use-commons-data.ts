import { useState, useEffect } from 'react';
import { getAllIndustries, Industry, getAllStartupStages, StartupStage, getAllTeamSizes, TeamSizes } from '../api/commons';

interface CommonsDataState {
  options: string[];
  loading: boolean;
  error: string | null;
}

interface UseCommonsDataReturn {
  industryData: CommonsDataState;
  startupStageData: CommonsDataState;
  teamSizeData: CommonsDataState;
}

/**
 * Custom hook to manage commons data fetching for dropdowns
 * Handles loading states, error handling, and data transformation
 */
export const useCommonsData = (): UseCommonsDataReturn => {
  const [industryData, setIndustryData] = useState<CommonsDataState>({
    options: [],
    loading: true,
    error: null
  });

  const [startupStageData, setStartupStageData] = useState<CommonsDataState>({
    options: [],
    loading: true,
    error: null
  });

  const [teamSizeData, setTeamSizeData] = useState<CommonsDataState>({
    options: [],
    loading: true,
    error: null
  });

  // Fetch industry data
  useEffect(() => {
    const fetchIndustries = async () => {
      setIndustryData(prev => ({ ...prev, loading: true, error: null }));
      const { data, error } = await getAllIndustries();
      
      if (error) {
        setIndustryData({
          options: [],
          loading: false,
          error: 'Failed to load industries'
        });
      } else {
        setIndustryData({
          options: Array.isArray(data) ? data.map((item: Industry) => item.name) : [],
          loading: false,
          error: null
        });
      }
    };
    fetchIndustries();
  }, []);

  // Fetch startup stage data
  useEffect(() => {
    const fetchStartupStages = async () => {
      setStartupStageData(prev => ({ ...prev, loading: true, error: null }));
      const { data, error } = await getAllStartupStages();
      
      if (error) {
        setStartupStageData({
          options: [],
          loading: false,
          error: 'Failed to load startup stages'
        });
      } else {
        setStartupStageData({
          options: Array.isArray(data) ? data.map((item: StartupStage) => item.name) : [],
          loading: false,
          error: null
        });
      }
    };
    fetchStartupStages();
  }, []);

  // Fetch team size data
  useEffect(() => {
    const fetchTeamSizes = async () => {
      setTeamSizeData(prev => ({ ...prev, loading: true, error: null }));
      const { data, error } = await getAllTeamSizes();
      
      if (error) {
        setTeamSizeData({
          options: [],
          loading: false,
          error: 'Failed to load team sizes'
        });
      } else {
        setTeamSizeData({
          options: Array.isArray(data) ? data.map((item: TeamSizes) => item.name) : [],
          loading: false,
          error: null
        });
      }
    };
    fetchTeamSizes();
  }, []);

  return {
    industryData,
    startupStageData,
    teamSizeData
  };
}; 