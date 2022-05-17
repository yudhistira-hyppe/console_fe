import React from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { fakeDb } from '../../../FakeDb/fake-db';
const useStyles = makeStyles((theme) => ({
  cardServicesView: {
    marginLeft: -24,
    marginRight: -24,
    paddingLeft: 20,
    paddingRight: 20,
  },
  cardServices: {
    display: 'flex',
    alignItems: 'center',
  },
  cardServicesItem: {
    width: '33.33%',
    textAlign: 'center',
    padding: '0 10px',
  },
  capitalize: {
    textTransform: 'capitalize',
  },
  cardContentRoot: {
    paddingTop: 24,
    display: 'flex',
    alignItems: 'flex-end',
    color: theme.palette.text.secondary,
  },
}));

const UserInfo = ({ authUser }) => {
  const classes = useStyles();
  return (
    <Box>
      <Box className={classes.cardServicesView}>
        <Box className={classes.cardServices}>
          
            <Box className={classes.cardServicesItem} >
              <Box
                component="span"
                fontSize={12}
                color="text.secondary"
                display="block"
                mb={1}
                className={classes.capitalize}>
                {`Follower `}
              </Box>
              <Box component="span" fontSize={14} color="text.primary" display="block">
                {authUser.insight.followers}
              </Box>
            </Box>

            <Box className={classes.cardServicesItem} >
              <Box
                component="span"
                fontSize={12}
                color="text.secondary"
                display="block"
                mb={1}
                className={classes.capitalize}>
                {`Following `}
              </Box>
              <Box component="span" fontSize={14} color="text.primary" display="block">
                {authUser.insight.followings}
              </Box>
            </Box>

            <Box className={classes.cardServicesItem} >
              <Box
                component="span"
                fontSize={12}
                color="text.secondary"
                display="block"
                mb={1}
                className={classes.capitalize}>
                {`Reactions `}
              </Box>
              <Box component="span" fontSize={14} color="text.primary" display="block">
                {authUser.insight.reactions}
              </Box>
            </Box>
          
        </Box>
      </Box>
      <Box className={classes.cardContentRoot}>
        <Box></Box>
      </Box>
    </Box>
  );
};

export default UserInfo;
