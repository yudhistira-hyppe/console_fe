import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import { Divider, Stack } from '@mui/material';
import { formatNumber } from 'helpers/stringHelper';

const InsightComponent = ({ insight }) => {
  return (
    <Stack
      direction="row"
      justifyContent={{ xs: 'space-evenly' }}
      spacing={3}
      divider={<Divider orientation="vertical" flexItem />}>
      <Stack>
        <Typography component="div" variant="h1" align="center">
          {formatNumber(insight.followers)}
        </Typography>
        <Box component="span" fontSize={12} color="text.secondary" mt={1} textAlign="center">
          Pengikut
        </Box>
      </Stack>
      <Stack>
        <Typography component="div" variant="h1" align="center">
          {formatNumber(insight.followings)}
        </Typography>
        <Box component="span" fontSize={12} color="text.secondary" mt={1} textAlign="center">
          Mengikuti
        </Box>
      </Stack>
      <Stack>
        <Typography component="div" variant="h1" align="center">
          {formatNumber(insight.totalFriends)}
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
