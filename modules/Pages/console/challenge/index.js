import { Fragment } from 'react';
import PropTypes from 'prop-types';
import ChallengeTabComponent from './tab';
import EditChallenge from './edit';
import DetailChallenge from './detail';

const ChallengeComponent = (props) => {
  const { tab, detailId } = props;
  console.log(detailId);

  if (tab === 'edit') {
    return <EditChallenge />;
  } else if (tab === 'detail') {
    return <DetailChallenge detailId={detailId} />;
  } else {
    return <ChallengeTabComponent tab={tab} />;
  }
};

ChallengeComponent.propTypes = {
  tab: PropTypes.string,
  detailId: PropTypes.string,
};

export default ChallengeComponent;
