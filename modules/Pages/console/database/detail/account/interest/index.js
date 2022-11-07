import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

const InterestComponent = (props) => {
  const { interests } = props;

  return (
    <Stack spacing={3}>
      <Typography variant="h3">Minat</Typography>
      <Divider />
      <Stack gap={1.25} direction="row" flexWrap="wrap">
        {interests.map((interest, index) => (
          <Box
            key={`${interest}-${index}`}
            sx={{
              boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0, 0, 0.2)',
              backgroundColor: '#FFFFFF',
              borderRadius: '4px',
              color: 'rgba(0, 0, 0, 0.6)',
              padding: '6px 8px',
            }}>
            <Typography variant="h5">{interest.interestName}</Typography>
          </Box>
        ))}
      </Stack>
    </Stack>
  );
};

InterestComponent.propTypes = {
  interests: PropTypes.array,
};

export default InterestComponent;
