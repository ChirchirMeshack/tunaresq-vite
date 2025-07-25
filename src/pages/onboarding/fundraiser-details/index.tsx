import { useEffect } from 'react';
import { Navigate,useOutletContext } from 'react-router-dom';
import { useFundraiserTypeStore } from 'stores/fundraiser-form';
import { LayoutContextType } from '@layouts/registration';
import {PATHS} from 'config'
import { IndividualForm, OrganizationForm, StartupForm } from '@components/fundraiser-forms';
// Constants for fundraiser types to avoid hardcoded strings
const FUNDRAISER_TYPES = {
  YOURSELF: 'yourself',
  STARTUP: 'startup',
  ORGANIZATION: 'organization'
} as const;

const FundraiserDetailsPage = () => {
  const { selectedFundraiserType: fundraiserType } = useFundraiserTypeStore();
  const { handleStepComplete } = useOutletContext<LayoutContextType>();

  useEffect(() => {
    if (!fundraiserType) {
      handleStepComplete('create-account');
    }
  }, [fundraiserType, handleStepComplete]);

  // Early return if no fundraiser type is selected
  if (!fundraiserType) return <Navigate to={PATHS.dashboard.index} replace />;

  // Render appropriate form based on fundraiser type

  switch (fundraiserType.name.toLowerCase()) {
    case FUNDRAISER_TYPES.YOURSELF:
      return <IndividualForm />;
    case FUNDRAISER_TYPES.STARTUP:
      return <StartupForm />;
    case FUNDRAISER_TYPES.ORGANIZATION:
      return <OrganizationForm />;
    default:
      <OrganizationForm />;
  }
};

export default FundraiserDetailsPage; 