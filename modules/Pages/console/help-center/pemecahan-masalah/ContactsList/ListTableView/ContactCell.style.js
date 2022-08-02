import { alpha, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  tableRowRoot: {
    transition: 'all .2s',
    borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.04),
      transform: 'translateY(-4px)',
      boxShadow: `0 3px 10px 0 ${alpha(theme.palette.common.dark, 0.2)}`,
      borderTopColor: 'transparent',
      '& .date-info': {
        visibility: 'hidden',
      },
      '& .contact-options': {
        display: 'flex',
      },
      '& .action-option': {
        visibility: 'visible',
        transform: 'translateX(0)',
      },
      '& .reply-option': {
        visibility: 'visible',
        transform: 'translateX(0)',
      },
    },
    '&.selected': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
  },
  tableCellRoot: {
    maxWidth: 600,
    padding: '20px',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    borderBottom: '0 none',
    '&:first-child': {
      paddingRight: 0,
    },
    '&:last-child': {
      width: '82px',
      position: 'relative',
      paddingLeft: 0,
    },
  },
  tableCellStatus: {
    width: '80px',
    '& div': {
      width: 'fit-content',
      borderRadius: 4,
      color: '#FFF',
      padding: '6px 8px',
      textAlign: 'center',
    },
    '& .status-close': {
      backgroundColor: '#00C4B4',
    },
    '& .status-onprogress': {
      backgroundColor: '#FF8C00',
    },
  },
  tableCellDate: {
    textAlign: 'right',
    minWidth: 'max-content',
  },
  gridContactCell: {
    border: `1px solid ${theme.palette.borderColor.main}`,
    borderRadius: 4,
    margin: 6,
    padding: 16,
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover': {
      boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.2)',
      '& .action-option': {
        visibility: 'visible',
        transform: 'translateX(0)',
      },
      '& .reply-option': {
        visibility: 'visible',
        transform: 'translateX(0)',
      },
    },
  },
  gridContactCellHeader: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
    '@media screen and (min-width: 1280px) and (max-width: 1399px)': {
      flexDirection: 'column',
    },
  },
  userName: {
    fontSize: 12,
    letterSpacing: 0.4,
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },
  title: {
    marginBottom: 2,
    fontSize: 16,
    letterSpacing: 0.25,
    color: theme.palette.common.dark,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },
  body: {
    fontSize: 12,
    letterSpacing: 0.4,
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },
  textTruncate: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '100%',
  },
}));

export default useStyles;
