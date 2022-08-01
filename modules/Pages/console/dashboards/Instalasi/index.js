import React from 'react';

import InstalasiCard from './instalasi_card';
import Graph from './graph';

const GraphSmall = ({ title, secondaryTitle, amount }) => {
  return (
    <InstalasiCard title={title} secondaryTitle={secondaryTitle} amount={amount}>
      <Graph />
    </InstalasiCard>
  );
};

export default GraphSmall;
