import { useGetUserActiveQuery } from 'api/console/dashboard';
import moment from 'moment';
import React, { useState } from 'react';

import UserActiveCard from './userActiveCard';
import UserActiveGraph from './userActiveGraph';

const UserActive = () => {
  const [payload, setPayload] = useState({ date: moment().subtract(6, 'day').format('YYYY-MM-DD') });
  const { data: userActive } = useGetUserActiveQuery(payload);

  const handlePayload = (value) => {
    setPayload({ ...payload, date: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const totalActive = () => {
    return userActive?.data?.data?.map((item) => item.totaldata).reduce((a, b) => a + b) || 0;
  };

  return (
    <UserActiveCard title="Pengguna Aktif" secondaryTitle="Bulan ini" amount={totalActive()} handlePayload={handlePayload}>
      <UserActiveGraph data={userActive?.data?.data} />
    </UserActiveCard>
  );
};

export default UserActive;
