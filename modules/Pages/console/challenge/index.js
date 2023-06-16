import PropTypes from 'prop-types';
import ChallengeTabComponent from './tab';

const ChallengeComponent = (props) => {
  const { tab, jenis } = props;

  return <ChallengeTabComponent tab={tab} jenis={jenis} />;
};

ChallengeComponent.propTypes = {
  tab: PropTypes.string,
};

export default ChallengeComponent;
