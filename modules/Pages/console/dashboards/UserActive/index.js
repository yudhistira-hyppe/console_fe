import React from 'react';

import UserActiveCard from './userActiveCard';
import UserActiveGraph from './userActiveGraph';

const UserActive = ({ title, secondaryTitle, amount }) => {
  return (
    <UserActiveCard title={title} secondaryTitle={secondaryTitle} amount={amount}>
      <UserActiveGraph />
    </UserActiveCard>
  );
};

export default UserActive;
