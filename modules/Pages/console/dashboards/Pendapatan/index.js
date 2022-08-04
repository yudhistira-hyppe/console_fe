import React from 'react';

import PendapatanCard from './PendapatanCard';
import PendapatanGraph from './PendapataGraph';

const Pendapatan = ({ title, secondaryTitle, amount }) => {
  return (
    <PendapatanCard title={title} secondaryTitle={secondaryTitle} amount={amount}>
      <PendapatanGraph />
    </PendapatanCard>
  );
};

export default Pendapatan;
