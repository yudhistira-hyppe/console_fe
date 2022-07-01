import React from 'react';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    textAlign: 'center',
    '& .MuiTypography-h4': {
      fontSize: 24,
    },
  },
}));

const CardInfoSaldoComponent = ({ saldo, title, backgroundColor }) => {
  const classes = useStyles();

  return (
    <>
      <CmtAdvCard backgroundColor={backgroundColor} className={classes.root}>
        <CmtAdvCardContent>
          <Typography component="div" variant="h4">
            {saldo}
          </Typography>
          <Typography component="div" variant="h5">
            {title}
          </Typography>
        </CmtAdvCardContent>
      </CmtAdvCard>
    </>
  );
};

export default CardInfoSaldoComponent;
