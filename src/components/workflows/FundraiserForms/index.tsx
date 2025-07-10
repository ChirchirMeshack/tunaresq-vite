import { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useFundraiserTypeStore } from 'stores/fundraiser-form';
import IndividualFundraiserForm from './individualForm';
import StartupFundraiserForm from './startupForm';
import OrganizationFundraiserForm from './OrganizationForm';
import { LayoutContextType } from '@layouts/registration';

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
  if (!fundraiserType) return null;

  // Render appropriate form based on fundraiser type
  switch (fundraiserType.toLowerCase()) {
    case FUNDRAISER_TYPES.YOURSELF:
      return <IndividualFundraiserForm />;
    case FUNDRAISER_TYPES.STARTUP:
      return <StartupFundraiserForm />;
    case FUNDRAISER_TYPES.ORGANIZATION:
      return <OrganizationFundraiserForm />;
    default:
      // Fallback for unexpected fundraiser types
      console.warn(`Unknown fundraiser type: ${fundraiserType}`);
      return null;
  }
};

export default FundraiserDetailsPage; 