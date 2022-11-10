import PropTypes from 'prop-types';

const DatabaseDetailContentComponent = (props) => {
  const { detailId } = props;

  return <div>DatabaseDetailContentComponent - {detailId}</div>;
};

DatabaseDetailContentComponent.propTypes = {
  detailId: PropTypes.string,
};

export default DatabaseDetailContentComponent;
