import React from 'react';

import GraphCard from './PendapatanCard';
import Graph from './PendapataGraph';

const Pendapatan = ({ title, secondaryTitle, amount }) => {
  return (
    <GraphCard title={title} secondaryTitle={secondaryTitle} amount={amount}>
      <Graph />
    </GraphCard>
  );
};

export default Pendapatan;
