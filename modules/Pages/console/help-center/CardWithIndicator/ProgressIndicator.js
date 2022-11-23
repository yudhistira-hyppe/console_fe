import React from 'react';
import Box from '@material-ui/core/Box';
import CmtProgressBar from '@coremat/CmtProgressBar';
import { Typography } from '@mui/material';

const ProgressIndicator = ({ item, ...rest }) => {
  return (
    <Box width={1} {...rest}>
      <CmtProgressBar
        label={
          <Box display="flex" alignItems="center">
            <Typography style={{ fontSize: 12, marginRight: 4 }} title={item._id} fontFamily="Lato">
              {item._id}
            </Typography>
            | <Box pl={1} component="span" color="text.secondary" fontSize={12}>{`${item.myCount}`}</Box>
          </Box>
        }
        labelPos="top-left"
        value={item.persen === 'Infinity' ? 0 : item.persen}
        renderValue={(value) => {
          return `${value}%`;
        }}
        containedColor={item.color}
        onlyContained
      />
    </Box>
  );
};

export default ProgressIndicator;
