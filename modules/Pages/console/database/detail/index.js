import PropTypes from 'prop-types';
import DatabaseDetailAccountComponent from './account';
import DatabaseDetailContentComponent from './content';
import DatabaseDetailEffectComponent from './effect';
import DatabaseDetailMediaComponent from './media';
import DatabaseDetailStickerComponent from './sticker';

const DatabaseDetailComponent = (props) => {
  const { tab, detailId } = props;

  switch (tab) {
    case 'account':
      return <DatabaseDetailAccountComponent detailId={detailId} />;
    case 'content':
      return <DatabaseDetailContentComponent detailId={detailId} />;
    case 'music':
      return <DatabaseDetailMediaComponent detailId={detailId} />;
    case 'effect':
      return <DatabaseDetailEffectComponent detailId={detailId} />;
    case 'sticker':
      return <DatabaseDetailStickerComponent detailId={detailId} />;
    default:
      return null;
  }
};

DatabaseDetailComponent.propTypes = {
  tab: PropTypes.string,
  detailId: PropTypes.string,
};

export default DatabaseDetailComponent;
