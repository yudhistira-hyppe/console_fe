import { Fragment } from 'react';
import PropTypes from 'prop-types';
import ChallengeTabComponent from './tab';
import EditChallenge from './edit';

const ChallengeComponent = (props) => {
  const { tab, detailId } = props;
  console.log(detailId);

  if (tab === 'edit') {
    return <EditChallenge />;
  } else if (tab === 'detail') {
    return <p>detail</p>;
  } else {
    return <ChallengeTabComponent tab={tab} />;
  }
};

ChallengeComponent.propTypes = {
  tab: PropTypes.string,
  detailId: PropTypes.string,
};

export default ChallengeComponent;
