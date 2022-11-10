import React from 'react';

import UnggahanCard from './unggahanCard';
import UnggahanGraph from './unggahanGraph';

const Unggahan = ({ title, secondaryTitle, amount }) => {
  return (
    <UnggahanCard title={title} secondaryTitle={secondaryTitle} amount={amount}>
      <UnggahanGraph />
    </UnggahanCard>
  );
};

export default Unggahan;
