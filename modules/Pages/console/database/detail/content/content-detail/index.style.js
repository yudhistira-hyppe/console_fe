import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles(() => ({
  chipStyle: {
    borderRadius: '4px !important',
    width: 'fit-content',
    fontFamily: 'Lato !important',
    height: '28px !important',
    padding: '4px !important',
    fontSize: '12px !important',
    fontWeight: 'bold !important',
    color: '#666666 !important',
  },
  label: {
    fontSize: '12px !important',
    color: 'rgba(0, 0, 0, 0.38)',
    fontFamily: 'Lato !important',
    width: 250,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));
