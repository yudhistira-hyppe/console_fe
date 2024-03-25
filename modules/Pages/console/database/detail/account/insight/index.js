import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from '@material-ui/core';
import { Divider, Stack } from '@mui/material';
import { formatNumber } from 'helpers/stringHelper';

const InsightComponent = ({ insight, friends }) => {
  return (
    <Stack direction="row" justifyContent="center" gap={3.5}>
      <Stack direction="column" alignItems="center" gap="2px" width={60}>
        <Typography style={{ fontSize: 14, color: '#00000099' }}>Pengikut</Typography>
        <Typography style={{ fontSize: 16 }}>{formatNumber(insight?.followers || 0)}</Typography>
      </Stack>
      <Stack direction="column" alignItems="center" gap="2px" width={60}>
        <Typography style={{ fontSize: 14, color: '#00000099' }}>Mengikuti</Typography>
        <Typography style={{ fontSize: 16 }}>{formatNumber(insight?.followings || 0)}</Typography>
      </Stack>
      <Stack direction="column" alignItems="center" gap="2px" width={60}>
        <Typography style={{ fontSize: 14, color: '#00000099' }}>Teman</Typography>
        <Typography style={{ fontSize: 16 }}>{formatNumber(friends || 0)}</Typography>
      </Stack>
    </Stack>
  );
};

InsightComponent.propTypes = {
  insight: PropTypes.object,
};

export default InsightComponent;
