import React from 'react';

import VoucherCard from './VoucherCard';
import VoucherGraph from './VoucherGraph';

const UserACtiveGraphhh = ({ title, secondaryTitle, amount }) => {
  return (
    <VoucherCard title={title} secondaryTitle={secondaryTitle} amount={amount}>
      <VoucherGraph />
    </VoucherCard>
  );
};

export default UserACtiveGraphhh;
