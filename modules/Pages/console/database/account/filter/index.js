import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary, Divider } from '@mui/material';
import { Box, Typography } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import DatabaseAccountFilterItemComponent from './item';
import useStyles from './index.style';

const DatabaseAccountFilterComponent = (props) => {
  const classes = useStyles();
  const { configFilters, filters, onChange } = props;

  return (
    <Box className={classes.card}>
      {Object.keys(configFilters).map((key) => (
        <>
          <Accordion className={classes.accordion} key={key} elevation={0} disableGutters>
            <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMore />}>
              <Typography className={classes.filterHeader}>{configFilters[key].label}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.accordionDetails}>
              <DatabaseAccountFilterItemComponent
                configKey={key}
                configItem={configFilters[key]}
                filters={filters}
                onChange={onChange}
              />
            </AccordionDetails>
          </Accordion>
          <Divider className={classes.divider} />
        </>
      ))}
    </Box>
  );
};

DatabaseAccountFilterComponent.propTypes = {
  configFilters: PropTypes.object,
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

export default DatabaseAccountFilterComponent;
