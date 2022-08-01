import React from 'react';

import GraphCard from './VoucherCard';
import Graph from './VoucherGraph';

const UserACtiveGraphhh = ({ title, secondaryTitle, amount }) => {
  return (
    <GraphCard title={title} secondaryTitle={secondaryTitle} amount={amount}>
      <Graph />
    </GraphCard>
  );
};

export default UserACtiveGraphhh;
