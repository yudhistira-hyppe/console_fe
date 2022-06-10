import React from 'react';
import ActiveUsersGraph from './ActiveUsersGraph';
import StatisticsClassicCard from '@jumbo/components/Common/StatisticsClassicCard';

const ActiveUsersCard = (props) => {
  const { title, jumlah, color, background, dataGraph, xAxisKeyGraph, lineKeyGraph } = props;

  return (
    <StatisticsClassicCard
      backgroundColor={background}
      gradientDirection="180deg"
      color={color}
      title={jumlah}
      subTitle={title}
      growth={0}>
      <ActiveUsersGraph data={dataGraph} xAxisKey={xAxisKeyGraph} lineKey={lineKeyGraph} />
    </StatisticsClassicCard>
  );
};

export default ActiveUsersCard;
