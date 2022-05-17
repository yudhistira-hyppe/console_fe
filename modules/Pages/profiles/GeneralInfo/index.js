import React, { useContext } from 'react';
import CoverPic from './CoverPic';
import Box from '@material-ui/core/Box';

import { useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { getWallHeight } from '../../../@jumbo/constants/AppConstants';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AppContext from '../../../@jumbo/components/contextProvider/AppContextProvider/AppContext';

const useStyles = makeStyles(() => ({
  perfectScrollbarGerneralInfo: {
    height: (props) => `calc(100vh - ${props.height}px)`,
  },
}));

const GeneralInfo = (width) => {
  const { showFooter } = useContext(AppContext);
  const { userDetail } = useSelector(({ wallApp }) => wallApp);
  const classes = useStyles({
    height: getWallHeight(width, showFooter),
  });

  return (
    <PerfectScrollbar className={classes.perfectScrollbarGerneralInfo}>
      {userDetail && (
        <Box>
          <Box mb={11}>
            <CoverPic userDetail={userDetail} />
          </Box>
          
        </Box>
      )}
    </PerfectScrollbar>
  );
};

export default GeneralInfo;
