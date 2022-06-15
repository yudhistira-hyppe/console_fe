import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid, Box } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import GridContainer from '@jumbo/components/GridContainer';
import { makeStyles } from '@material-ui/core/styles';

const useRowStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    //paddingBottom: 10,
    paddingLeft: 15,
  },
  boxInsight: {
    borderBottom: `1px solid ${theme.palette.borderColor.main}`,
  },
  insightCol: {
    padding: '0px!important',
    textAlign: 'center',
    marginTop: 20,
    '&:not(:last-child)': {
      borderRight: `1px solid ${theme.palette.borderColor.main}`,
    },
    '& .MuiTypography-h1': {
      fontSize: 18,
    },
  },
  insightColLast: {
    borderRight: 'none!important',
  },
  minatBlock: {
    width: '100%',
    padding: '25px 0 0 0px!important',
    margin: '15px 0',
    borderTop: `1px solid ${theme.palette.borderColor.main}`,
    borderBottom: `1px solid ${theme.palette.borderColor.main}`,
    '& .MuiGrid-item': {
      padding: 0,
    },
    '& .MuiTypography-h1': {
      fontSize: 18,
      paddingBottom: 10,
      width: 60,
      borderBottom: `3px solid ${theme.palette.primary.main}`,
    },
  },
  minatBlockTag: {
    width: '100%',
    marginTop: 25,
    padding: 0,
  },
  minatBlockTagItem: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 5,
    boxShadow: '0px 1px 3px rgb(0 0 0 / 20%), 0px 2px 1px rgb(0 0 0 / 12%), 0px 1px 1px rgb(0 0 0 / 14%)',
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    '&:not(:last-child)': {
      marginRight: 10,
    },
  },
}));

const InsightComponent = ({ insight, interest }) => {
  const classes = useRowStyles();
  return (
    <>
      <GridContainer className={classes.root}>
        <Grid item xs={12} lg={4} className={classes.insightCol}>
          <Typography component="div" variant="h1">
            {insight.followers}
          </Typography>
          <Box component="span" fontSize={12} color="text.disabled" mt={1}>
            Pengikut
          </Box>
        </Grid>
        <Grid item xs={12} lg={4} className={classes.insightCol}>
          <Typography component="div" variant="h1">
            {insight.followings}
          </Typography>
          <Box component="span" fontSize={12} color="text.disabled" mt={1}>
            Mengikuti
          </Box>
        </Grid>
        <Grid item xs={12} lg={4} className={[classes.insightCol, classes.insightColLast]}>
          <Typography component="div" variant="h1">
            {insight.comments}
          </Typography>
          <Box component="span" fontSize={12} color="text.disabled" mt={1}>
            Percakapan
          </Box>
        </Grid>
        <Grid item xs={12} lg={12} className={classes.minatBlock}>
          <Typography component="div" variant="h1">
            Minat
          </Typography>
        </Grid>
        <Grid xs={12} lg={12}>
          {interest.map((value, index) => {
            return <Chip className={classes.minatBlockTagItem} label={value} />;
          })}
        </Grid>
      </GridContainer>
    </>
  );
};

export default InsightComponent;
