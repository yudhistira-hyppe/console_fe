import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import { Divider, Stack } from '@mui/material';
import { formatNumber } from 'helpers/stringHelper';

const InsightComponent = ({ insight, friends }) => {
  return (
    <Stack
      direction="row"
      justifyContent={{ xs: 'space-evenly' }}
      spacing={3}
      divider={<Divider orientation="vertical" flexItem />}>
      <Stack>
        <Typography component="div" variant="h1" align="center">
          {formatNumber(insight?.followers || 0)}
        </Typography>
        <Box component="span" fontSize={12} color="text.secondary" mt={1} textAlign="center">
          Pengikut
        </Box>
      </Stack>
      <Stack>
        <Typography component="div" variant="h1" align="center">
          {formatNumber(insight?.followings || 0)}
        </Typography>
        <Box component="span" fontSize={12} color="text.secondary" mt={1} textAlign="center">
          Mengikuti
        </Box>
      </Stack>
      <Stack>
        <Typography component="div" variant="h1" align="center">
          {formatNumber(friends || 0)}
        </Typography>
        <Box component="span" fontSize={12} color="text.secondary" mt={1} textAlign="center">
          Teman
        </Box>
      </Stack>
    </Stack>
  );
};

InsightComponent.propTypes = {
  insight: PropTypes.object,
};

export default InsightComponent;
