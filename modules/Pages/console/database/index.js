import { Fragment } from 'react';
import PropTypes from 'prop-types';
import DatabaseTabComponent from './tab';
import DatabaseDetailComponent from './detail';

const DatabaseComponent = (props) => {
  const { tab, detailId } = props;

  return (
    <Fragment>
      {detailId ? <DatabaseDetailComponent tab={tab} detailId={detailId} /> : <DatabaseTabComponent tab={tab} />}
    </Fragment>
  );
};

DatabaseComponent.propTypes = {
  tab: PropTypes.string,
  detailId: PropTypes.string,
};

export default DatabaseComponent;
