import PropTypes from 'prop-types';
import DatabaseDetailAccountComponent from './account';
import DatabaseDetailContentComponent from './content';
import DatabaseDetailMediaComponent from './media';

const DatabaseDetailComponent = (props) => {
  const { tab, detailId } = props;

  switch (tab) {
    case 'account':
      return <DatabaseDetailAccountComponent detailId={detailId} />;
    case 'content':
      return <DatabaseDetailContentComponent detailId={detailId} />;
    default:
      return <DatabaseDetailMediaComponent detailId={detailId} />;
  }
};

DatabaseDetailComponent.propTypes = {
  tab: PropTypes.string,
  detailId: PropTypes.string,
};

export default DatabaseDetailComponent;
