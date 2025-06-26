import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFundraiserTypeStore } from '@lib/fundraiserTypeStore';
import IndividualFundraiserForm from './individualForm';
import StartupFundraiserForm from './startupForm';
import OrganizationFundraiserForm from './OrganizationForm';

const FundraiserDetailsPage = () => {
  const { fundraiserType } = useFundraiserTypeStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fundraiserType) {
      navigate('/registration/fundraiser-type'); // Adjust route as needed
    }
  }, [fundraiserType, navigate]);

  if (!fundraiserType) return null;

  if (fundraiserType === 'yourself') {
    return <IndividualFundraiserForm />;
  }
  if (fundraiserType === 'startup') {
    return <StartupFundraiserForm />;
  }
  if (fundraiserType === 'organization') {
    return <OrganizationFundraiserForm />;
  }
  return null;
};

export default FundraiserDetailsPage; 