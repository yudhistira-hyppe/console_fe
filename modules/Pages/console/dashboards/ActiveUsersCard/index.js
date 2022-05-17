import React from 'react';
import ActiveUsersGraph from './ActiveUsersGraph';
import StatisticsClassicCard from '@jumbo/components/Common/StatisticsClassicCard';

const ActiveUsersCard = ({title, jumlah, color, background}) => {
  return (
    <StatisticsClassicCard
      backgroundColor={background}
      gradientDirection="180deg"
      color={color}
      title={jumlah}
      subTitle={title}
      growth={0}>
      <ActiveUsersGraph />
    </StatisticsClassicCard>
  );
};

export default ActiveUsersCard;
