import PropTypes from 'prop-types';
import DatabaseDetailAccountComponent from './account';
import DatabaseDetailContentComponent from './content';
import DatabaseDetailEffectComponent from './effect';
import DatabaseDetailMediaComponent from './media';

const DatabaseDetailComponent = (props) => {
  const { tab, detailId } = props;

  switch (tab) {
    case 'account':
      return <DatabaseDetailAccountComponent detailId={detailId} />;
    case 'content':
      return <DatabaseDetailContentComponent detailId={detailId} />;
    case 'music':
      return <DatabaseDetailMediaComponent detailId={detailId} />;
    default:
      return <DatabaseDetailEffectComponent detailId={detailId} />;
  }
};

DatabaseDetailComponent.propTypes = {
  tab: PropTypes.string,
  detailId: PropTypes.string,
};

export default DatabaseDetailComponent;
