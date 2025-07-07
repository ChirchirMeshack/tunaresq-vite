import { useEffect } from 'react';
import { Navigate, useOutletContext } from 'react-router-dom';
import { useFundraiserTypeStore } from 'stores/fundraiser-form';
import IndividualFundraiserForm from './individualForm';
import StartupFundraiserForm from './startupForm';
import OrganizationFundraiserForm from './OrganizationForm';
import { LayoutContextType } from '@layouts/registration';
import { PATHS } from 'config';

const FundraiserDetailsPage = () => {
  const { selectedFundraiserType: fundraiserType } = useFundraiserTypeStore();
  const { handleStepComplete } = useOutletContext<LayoutContextType>();


  useEffect(() => {
    if (!fundraiserType) {
      handleStepComplete('create-account');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fundraiserType]);

  if (!fundraiserType) return <Navigate to={PATHS.dashboard.index} />;

  if (fundraiserType.toLowerCase() === 'yourself') {
    return <IndividualFundraiserForm />;
  }
  if (fundraiserType.toLowerCase() === 'startup') {
    return <StartupFundraiserForm />;
  }
  if (fundraiserType.toLowerCase() === 'organization') {
    return <OrganizationFundraiserForm />;
  }
  return null;

};

export default FundraiserDetailsPage; 