import React from 'react';
import Box from '@material-ui/core/Box';
import CmtProgressBar from '@coremat/CmtProgressBar';
import { Typography } from '@mui/material';

const ProgressIndicator = ({ item, colorIndex, ...rest }) => {
  const color = ['#E6094B', '#FF8C00', '#8DCD03', '#7C7C7C'];

  return (
    <Box width={1} {...rest}>
      <CmtProgressBar
        label={
          <Box display="flex" alignItems="center">
            <Typography style={{ fontSize: 12, marginRight: 4 }} title={item._id} fontFamily="Lato">
              {item.reason || '-'}
            </Typography>
            | <Box pl={1} component="span" color="text.secondary" fontSize={12}>{`${item.count || 0}`}</Box>
          </Box>
        }
        labelPos="top-left"
        value={item.persen === 'Infinity' ? 0 : item.persen}
        renderValue={(value) => {
          return `${value}%`;
        }}
        containedColor={color[colorIndex]}
        onlyContained
      />
    </Box>
  );
};

export default ProgressIndicator;
