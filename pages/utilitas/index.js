import SecureConsolePage from 'authentication/auth-page-wrappers/SecureConsolePage';
import UtilitasComponent from 'modules/Pages/console/utilitas';
import React from 'react';

const Utilitas = () => {
  return (
    <SecureConsolePage>
      <UtilitasComponent />
    </SecureConsolePage>
  );
};

export default Utilitas;
