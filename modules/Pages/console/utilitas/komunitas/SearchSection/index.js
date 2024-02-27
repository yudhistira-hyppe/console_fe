import react from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useStyles from '../../../help-center/bantuan-pengguna/index.style';
import { Box, Typography } from '@material-ui/core';
import DelayedTextField from 'modules/Components/CommonComponent/DelayedTextField';

const SearchSection = ({ filter, handleChange }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.inBuildAppCard} p={5} pt={2} maxWidth={270}>
        <Accordion elevation={0} defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ padding: '0px' }}>
            <Typography style={{ fontSize: '13px' }}>Cari nama</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ padding: 0 }}>
            <DelayedTextField
              fullWidth
              waitForInput={true}
              placeholder="Cari nama"
              name="name"
              filterValue={filter.name}
              onChange={(e) => handleChange(e.target.name, e.target.value)}
              color="secondary"
            />
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default SearchSection;
