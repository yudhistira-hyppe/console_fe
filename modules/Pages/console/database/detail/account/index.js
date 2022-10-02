import PropTypes from 'prop-types';

const DatabaseDetailAccountComponent = (props) => {
  const { detailId } = props;

  return <div>DatabaseDetailAccountComponent - {detailId}</div>;
};

DatabaseDetailAccountComponent.propTypes = {
  detailId: PropTypes.string,
};

export default DatabaseDetailAccountComponent;
