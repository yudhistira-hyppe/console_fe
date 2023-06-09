import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';
import React from 'react';
import dynamic from 'next/dynamic';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';

const UtilitasComponent = dynamic(() => import('modules/Pages/console/utilitas'), {
  loading: () => <PageLoader />,
});

const Utilitas = () => {
  return (
    <SecureConsolePage>
      <UtilitasComponent />
    </SecureConsolePage>
  );
};

export default Utilitas;
