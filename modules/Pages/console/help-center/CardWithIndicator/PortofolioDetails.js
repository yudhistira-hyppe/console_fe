import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ProgressIndicator from './ProgressIndicator';
import CmtList from '@coremat/CmtList';
import { Stack } from '@mui/material';
import CmtProgressBar from '@coremat/CmtProgressBar';

const useStyles = makeStyles(() => ({
  titleRoot: {
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  listItemRoot: {
    padding: 0,
    marginBottom: 0,
  },
}));

const PortfolioDetails = ({ data }) => {
  const classes = useStyles();
  const baru = data?.find((item) => item._id === 'BARU');
  const ditangguhkan = data?.find((item) => item._id === 'DITANGGUHKAN');
  const tidak_ditangguhkan = data?.find((item) => item._id === 'TIDAK DITANGGUHKAN');
  const sensitif = data?.find((item) => item._id === 'DITANDAI SENSITIF');

  return (
    <Box width={1} style={{ zIndex: -1 }}>
      <Stack direction="column">
        <CmtProgressBar
          label={
            <Box display="flex" alignItems="center">
              <Typography
                style={{ fontSize: 12, marginRight: 4, textTransform: 'capitalize' }}
                title={baru?._id || 'BARU'}
                fontFamily="Lato">
                {baru?._id || 'BARU'}
              </Typography>
              |
              <Box pl={1} component="span" color="text.secondary" fontSize={12}>
                {baru?.myCount || 0}
              </Box>
            </Box>
          }
          labelPos="top-left"
          value={Number(baru?.persen) || 0}
          renderValue={(value) => {
            return `${value}%`;
          }}
          containedColor={baru?.warna || '#AB22AF'}
          onlyContained
        />
        <CmtProgressBar
          label={
            <Box display="flex" alignItems="center">
              <Typography
                style={{ fontSize: 12, marginRight: 4, textTransform: 'capitalize' }}
                title={ditangguhkan?._id || 'DITANGGUHKAN'}
                fontFamily="Lato">
                {ditangguhkan?._id || 'DITANGGUHKAN'}
              </Typography>
              |
              <Box pl={1} component="span" color="text.secondary" fontSize={12}>
                {ditangguhkan?.myCount || 0}
              </Box>
            </Box>
          }
          labelPos="top-left"
          value={Number(ditangguhkan?.persen) || 0}
          renderValue={(value) => {
            return `${value}%`;
          }}
          containedColor={ditangguhkan?.warna || '#AB22AF'}
          onlyContained
        />
        <CmtProgressBar
          label={
            <Box display="flex" alignItems="center">
              <Typography
                style={{ fontSize: 12, marginRight: 4, textTransform: 'capitalize' }}
                title={tidak_ditangguhkan?._id || 'TIDAK DITANGGUHKAN'}
                fontFamily="Lato">
                {tidak_ditangguhkan?._id || 'TIDAK DITANGGUHKAN'}
              </Typography>
              |
              <Box pl={1} component="span" color="text.secondary" fontSize={12}>
                {tidak_ditangguhkan?.myCount || 0}
              </Box>
            </Box>
          }
          labelPos="top-left"
          value={Number(tidak_ditangguhkan?.persen) || 0}
          renderValue={(value) => {
            return `${value}%`;
          }}
          containedColor={tidak_ditangguhkan?.warna || '#AB22AF'}
          onlyContained
        />
        <CmtProgressBar
          label={
            <Box display="flex" alignItems="center">
              <Typography
                style={{ fontSize: 12, marginRight: 4, textTransform: 'capitalize' }}
                title={sensitif?._id || 'DITANDAI SENSITIF'}
                fontFamily="Lato">
                {sensitif?._id || 'DITANDAI SENSITIF'}
              </Typography>
              |
              <Box pl={1} component="span" color="text.secondary" fontSize={12}>
                {sensitif?.myCount || 0}
              </Box>
            </Box>
          }
          labelPos="top-left"
          value={Number(sensitif?.persen) || 0}
          renderValue={(value) => {
            return `${value}%`;
          }}
          containedColor={sensitif?.warna || '#AB22AF'}
          onlyContained
        />
      </Stack>
    </Box>
  );
};

export default PortfolioDetails;
