import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 2px 3px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    padding: '10px 24px',
    width: '23%',
    height: 'fit-content',
  },
  accordion: {
    '&.MuiAccordion-root::before': {
      display: 'none',
    },
  },
  accordionSummary: {
    '&.MuiAccordionSummary-root, &.MuiAccordionSummary-root.Mui-expanded': {
      minHeight: '24px',
      padding: '0px',

      '& .MuiAccordionSummary-content': {
        margin: '12px 0px',
      },
    },
  },
  accordionDetails: {
    '&.MuiAccordionDetails-root': {
      padding: '0px 0px 12px',
    },
  },
  divider: {
    '&.MuiDivider-root:last-of-type': {
      display: 'none',
    },
  },
  filterHeader: {
    fontSize: '14px',
    color: 'black',
  },
}));

export default useStyles;
