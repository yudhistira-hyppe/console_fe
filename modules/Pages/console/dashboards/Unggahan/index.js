import React, { useState } from 'react';

import { useGetUserTotalPostQuery } from 'api/console/dashboard';
import UnggahanCard from './unggahanCard';
import UnggahanGraph from './unggahanGraph';
import moment from 'moment';

const Unggahan = () => {
  const [payload, setPayload] = useState({ date: moment().subtract(6, 'day').format('YYYY-MM-DD') });
  const { data: userPost } = useGetUserTotalPostQuery(payload);

  const handlePayload = (value) => {
    setPayload({ ...payload, date: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const totalPost = () => {
    return userPost?.data?.data?.map((item) => item.totaldata).reduce((a, b) => a + b) || 0;
  };

  return (
    <UnggahanCard title="Total Post" secondaryTitle="Bulan ini" amount={totalPost()} handlePayload={handlePayload}>
      <UnggahanGraph data={userPost?.data?.data} />
    </UnggahanCard>
  );
};

export default Unggahan;
