import React from 'react';

import GraphCard from './userActiveCard';
import Graph from './userActiveGraph';

const UserACtiveGraphhh = ({ title, secondaryTitle, amount }) => {
  return (
    <GraphCard title={title} secondaryTitle={secondaryTitle} amount={amount}>
      <Graph />
    </GraphCard>
  );
};

export default UserACtiveGraphhh;
