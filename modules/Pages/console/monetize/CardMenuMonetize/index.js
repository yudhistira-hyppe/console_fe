import React from 'react';
import { Box } from '@material-ui/core';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    cursor: 'pointer',
    color: 'black',
    '& .MuiTypography-h4': {
      fontSize: 18,
    },
    '& .MuiTypography-h5': {
      fontSize: 14,
    },
  },
  // imageIcon: {
  //   // height: 'auto',
  //   paddingRight: '90px',
  // },
}));

const CardMenuMonetizeComponent = ({ icon, title, subtitle, backgroundColor, clickedElement }) => {
  const classes = useStyles();
  return (
    <>
      <CmtAdvCard backgroundColor={backgroundColor} className={classes.root}>
        <CmtAdvCardContent>
          <Box display="flex" onClick={clickedElement}>
            <span
              style={{
                width: '180px',
                height: '115px',
                backgroundImage: `url('${icon}')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}></span>
            {/* <img className={classes.imageIcon} src={icon} /> */}
            <Box ml={5} mt={5}>
              <Typography component="div" variant="h4">
                {title}
              </Typography>
              <Typography component="div" variant="h5">
                {subtitle}
              </Typography>
            </Box>
          </Box>
        </CmtAdvCardContent>
      </CmtAdvCard>
    </>
  );
};

export default CardMenuMonetizeComponent;
