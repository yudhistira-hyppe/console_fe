import React from 'react';

import InstalasiCard from './instalasiCard';
import InstalasiGraph from './instalasiGraph';

const Installasi = ({ title, secondaryTitle, amount }) => {
  return (
    <InstalasiCard title={title} secondaryTitle={secondaryTitle} amount={amount}>
      <InstalasiGraph />
    </InstalasiCard>
  );
};

export default Installasi;
