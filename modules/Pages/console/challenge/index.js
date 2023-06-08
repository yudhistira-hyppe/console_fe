import { Fragment } from 'react';
import PropTypes from 'prop-types';
import ChallengeTabComponent from './tab';

const ChallengeComponent = (props) => {
  const { tab, detailId } = props;

  return <ChallengeTabComponent tab={tab} />;
};

ChallengeComponent.propTypes = {
  tab: PropTypes.string,
  detailId: PropTypes.string,
};

export default ChallengeComponent;
