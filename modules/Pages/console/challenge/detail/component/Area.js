import CmtList from '@coremat/CmtList';
import CmtProgressBar from '@coremat/CmtProgressBar';
import { Typography } from '@material-ui/core';
import { Box, Card, CircularProgress, Stack } from '@mui/material';
import { useGetAreaUserChallengeQuery } from 'api/console/challenge';
import React from 'react';
import ScrollBar from 'react-perfect-scrollbar';

const ProgressIndicator = (props) => {
  const { item, ...rest } = props;

  return (
    <Box width={1} {...rest}>
      <CmtProgressBar
        label={
          <Box display="flex" alignItems="center">
            {item._id === 'OTHER' || item._id === 'other'
              ? 'Lainnya'
              : item._id === 'FEMALE'
              ? 'Perempuan'
              : item._id === 'MALE'
              ? 'Laki-laki'
              : item._id}
          </Box>
        }
        labelPos="top-left"
        value={item.persentase}
        renderValue={(value) => {
          return `${value}%`;
        }}
        containedColor="#AB22AF"
        onlyContained
      />
    </Box>
  );
};

const AreaComponent = ({ detail }) => {
  const { data: areaUser, isLoading: loadingArea } = useGetAreaUserChallengeQuery(detail?._id);

  console.log(areaUser);

  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="column" gap={3}>
        <Typography style={{ fontSize: 20, fontWeight: 'bold' }}>Wilayah Pengguna</Typography>

        {loadingArea ? (
          <Stack direction="column" alignItems="center" justifyContent="center" height={360} gap={2}>
            <CircularProgress color="secondary" />
            <Typography style={{ fontFamily: 'Normal' }}>Loading data...</Typography>
          </Stack>
        ) : areaUser?.data?.length >= 1 ? (
          <ScrollBar style={{ height: 360 }}>
            <CmtList data={areaUser?.data} renderRow={(item, index) => <ProgressIndicator key={index} item={item} />} />
          </ScrollBar>
        ) : (
          <Stack direction="column" alignItems="center" justifyContent="center" height={360} gap={2}>
            <img src="/images/icon-media-empty.png" style={{ width: 60, height: 60 }} />
            <Typography style={{ color: '#666666', width: 250, textAlign: 'center' }}>
              Anda akan melihat metrik wilayah audiens di sini.
            </Typography>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default AreaComponent;
