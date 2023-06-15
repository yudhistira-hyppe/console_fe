import { Fragment } from 'react';
import PropTypes from 'prop-types';
import ChallengeTabComponent from './tab';
import EditChallenge from './edit';

const ChallengeComponent = (props) => {
  const { tab, detailId } = props;
  console.log(detailId);

  if (detailId) {
    return <EditChallenge />;
  } else {
    return <ChallengeTabComponent tab={tab} />;
  }
};

ChallengeComponent.propTypes = {
  tab: PropTypes.string,
  detailId: PropTypes.string,
};

export default ChallengeComponent;
