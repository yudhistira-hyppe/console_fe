import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  adCampaignImage: {
    minWidth: '120px',
    width: '120px',
    height: '90px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  adCampaignDescription: {
    '&.MuiTypography-root': {
      wordBreak: 'break-word',
    },
  },
}));

export default useStyles;
