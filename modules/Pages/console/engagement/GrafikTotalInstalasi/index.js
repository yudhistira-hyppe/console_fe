import React, { useState } from 'react';

import CmtBackDrop from '@coremat/CmtBackDrop';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Box from '@material-ui/core/Box';
import AppDatePicker from '@jumbo/components/Common/formElements/AppDatePicker';
import TotalInstalasiGraph from './TotalInstalasiGraph';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import { getFormattedDate } from '@jumbo/utils/dateHelper';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CmtImage from '@coremat/CmtImage';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import { fakeDb } from 'modules/FakeDb/fake-db';

const {totalInstall} = fakeDb;

const useStyles = makeStyles((theme) => ({
  headerItem: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    [theme.breakpoints.down('xs')]: {
      fontSize: 13,
      paddingLeft: 8,
      paddingRight: 8,
    },
    color: alpha(theme.palette.common.white, 0.74),
    '&:not(:first-child)': {
      borderLeft: `1px solid ${alpha(theme.palette.common.white, 0.8)}`,
    },
    '& .MuiSvgIcon-root': {
      marginRight: 12,
    },
  },
  backdropContent: {
    color: alpha(theme.palette.common.white, 0.74),
    '& .form-control': {
      marginBottom: 20,
      '& label, & .MuiInput-formControl, & .MuiSelect-icon, & .MuiIconButton-root': {
        color: alpha(theme.palette.common.white, 0.74),
      },
      '& .MuiInput-underline:before, & .MuiInput-underline:after': {
        borderBottomColor: alpha(theme.palette.common.white, 0.74),
      },
    },
  },
  boxLegend: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
}));

const Project = ({ startDate, setStartDate, endDate, setEndDate }) => {

  const onStartDateChange = (date) => {
    setStartDate(date);
  };

  const onEndDateChange = (date) => {
    setEndDate(date);
  };
  const classes = useStyles();

  return (
    <CmtCardContent>
      <Box className={classes.backdropContent}>
        <AppDatePicker label="Start Date" value={startDate} onChange={onStartDateChange} />
        <AppDatePicker label="End Date" value={endDate} onChange={onEndDateChange} />
      </Box>
    </CmtCardContent>
  );
};

const ProjectHeader = ({ startDate, endDate }) => {
  const classes = useStyles();
  return (
    <Box display="flex" alignItems="center" mx={{ xs: -2, sm: -4 }}>
      <Box className={classes.headerItem}>
        <CalendarTodayIcon />
        {getFormattedDate(startDate, ' DD MMM')} - {getFormattedDate(endDate, ' DD MMM')}
      </Box>
    </Box>
  );
};

const GrafikTotalInstalasi = () => {
  const [startDate, setStartDate] = React.useState('2020-07-03');
  const [endDate, setEndDate] = React.useState('2020-08-20');
  const [revealed, setRevealed] = useState(false);
  const classes = useStyles();

  const handleOnRevealed = (status) => {
    setRevealed(status);
  };

  return (
    <CmtBackDrop
      concealedIcon={<CmtImage src={'/images/icons/filter_icon.png'} alt="filter" />}
      backLayerConcealed={
        revealed ? '' : <ProjectHeader startDate={startDate} endDate={endDate} />
      }
      backLayerRevealed={
        <Project
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      }
      onRevealed={handleOnRevealed}>
      <GridContainer>
          <Grid className={classes.boxLegend} item xs={4} md={4} xl={4}>
            { totalInstall.map((install,idx) => 
              <Box key={idx} style={{paddingLeft:20,paddingBottom:20}} display="flex" alignItems="baseline">
                <Typography component="div" variant="h1">
                  {install.total}
                </Typography>
                <Box component="span" fontSize={14} color="text.secondary" ml={2}>
                  {install.value}
                </Box>
              </Box>
            )}
          </Grid>
          <Grid item xs={8} md={8} xl={8}>
            <TotalInstalasiGraph data={totalInstall} />
          </Grid>
        </GridContainer>
    </CmtBackDrop>
  );
};

export default GrafikTotalInstalasi;
