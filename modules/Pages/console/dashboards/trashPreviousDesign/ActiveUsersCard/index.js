import React from 'react';
import PropTypes from 'prop-types';
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

ActiveUsersCard.propTypes = {
  data: PropTypes.array,
  xAxisKey: PropTypes.string,
  lineKey: PropTypes.string,
  title: PropTypes.string,
  jumlah: PropTypes.string,
  color: PropTypes.string,
  background: PropTypes.array,
  dataGraph: PropTypes.array,
  xAxisKeyGraph: PropTypes.string,
  lineKeyGraph: PropTypes.string,
};

export default ActiveUsersCard;
