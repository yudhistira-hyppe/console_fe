import { Fragment } from 'react';
import PropTypes from 'prop-types';
import ChallengeTabComponent from './tab';

const ChallengeComponent = (props) => {
  const { tab, detailId } = props;

  return (
    <Fragment>
      <ChallengeTabComponent tab={tab} />
    </Fragment>
  );
};

ChallengeComponent.propTypes = {
  tab: PropTypes.string,
  detailId: PropTypes.string,
};

export default ChallengeComponent;
