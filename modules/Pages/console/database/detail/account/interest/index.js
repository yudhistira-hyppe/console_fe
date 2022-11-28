import React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

const InterestComponent = (props) => {
  const { interests } = props;

  return (
    <Stack spacing={3}>
      <Typography
        style={{
          fontWeight: 'bold',
          borderBottom: '1px solid #0000001F',
          paddingBottom: 20,
          fontSize: 18,
          position: 'relative',
        }}>
        Minat
        <Box style={{ height: 4, width: 40, backgroundColor: '#AB22AF', position: 'absolute', bottom: 0 }} />
      </Typography>
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
