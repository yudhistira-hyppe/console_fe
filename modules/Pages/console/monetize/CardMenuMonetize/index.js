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
      color: '#FFFFFF',
      '& .MuiTypography-h4': {
          fontSize: 18
      },
      '& .MuiTypography-h5': {
        fontSize: 14
    }
    },
    imageIcon: {
        height: 32,
        paddingRight: 10
    }
  }));

const CardMenuMonetizeComponent = ({icon, title, subtitle, backgroundColor, clickedElement}) => {
  const classes = useStyles();
  return (
    <>
        <CmtAdvCard backgroundColor={backgroundColor}  className={classes.root}>
            <CmtAdvCardContent>
                <Box display="flex" onClick={clickedElement}>
                    <img className={classes.imageIcon} src={icon}/>
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

export default CardMenuMonetizeComponent;
