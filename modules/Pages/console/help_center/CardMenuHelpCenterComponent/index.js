//MODIFIED HYPPE
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
      '& .MuiTypography-h4': {
          fontSize: 18
      },
      '& .MuiTypography-h5': {
        fontSize: 14,
        color: '#C91D1D'
    }
    },
    innerBox: {
        alignItems: 'center'
    },
    imageIcon: {
        height: 20,
    },
    roundedIconBg: {
        width: 56,
        height: 56,
        backgroundColor: '#803882',
        borderRadius: 28,
        flexShrink: 0,
        marginRight: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
  }));

const CardMenuHelpCenterComponent = ({icon, title, subtitle, backgroundColor, clickedElement}) => {
  const classes = useStyles();
  return (
    <>
        <CmtAdvCard backgroundColor={backgroundColor}  className={classes.root}>
            <CmtAdvCardContent>
                <Box display="flex" className={classes.innerBox} onClick={clickedElement}>
                    <Box className={classes.roundedIconBg}>
                        <img className={classes.imageIcon} src={icon}/>
                    </Box>
                    <Box>
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

export default CardMenuHelpCenterComponent;
