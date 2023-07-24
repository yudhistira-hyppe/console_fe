import React from 'react';
import CmtList from '@coremat/CmtList';
import CmtProgressBar from '@coremat/CmtProgressBar';
import { Typography } from '@material-ui/core';
import { Box, Card, CircularProgress, Stack } from '@mui/material';
import ScrollBar from 'react-perfect-scrollbar';

const CardWithIndicator = (props) => {
  const { title, data, loading } = props;

  const ProgressIndicator = (props) => {
    const { item, ...rest } = props;

    return (
      <Box width={1} {...rest}>
        <CmtProgressBar
          label={
            <Box display="flex" alignItems="center">
              {item?._id === 'OTHER'
                ? 'Lainnya'
                : item?._id === 'MALE'
                ? 'Laki-laki'
                : item?._id === 'FEMALE'
                ? 'Perempuan'
                : item?._id || 'Lainnya'}{' '}
              | {item?.count || 0}
            </Box>
          }
          labelPos="top-left"
          value={(item?.count / data?.map((item) => item?.count).reduce((a, b) => a + b, 0)) * 100}
          renderValue={(value) => {
            return `${value?.toFixed(2)}%`;
          }}
          containedColor="#AB22AF"
          onlyContained
        />
      </Box>
    );
  };

  return (
    <Card style={{ padding: 24 }}>
      <Stack direction="column" gap="24px">
        <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Typography>
        {loading ? (
          <Stack direction="column" alignItems="center" justifyContent="center" height={210} gap={2}>
            <CircularProgress color="secondary" size={32} />
            <Typography style={{ fontWeight: 'bold', color: '#737373' }}>Loading data...</Typography>
          </Stack>
        ) : data?.length >= 1 ? (
          <ScrollBar style={{ height: 210 }}>
            <CmtList
              data={[...data]?.sort((a, b) => b?.count - a?.count)}
              renderRow={(item, index) => <ProgressIndicator key={index} item={item} />}
            />
          </ScrollBar>
        ) : (
          <Stack direction="column" alignItems="center" justifyContent="center" gap="20px" textAlign="center" height={210}>
            <img src="/images/icon-media-empty.png" style={{ width: 60, height: 60 }} />
            <Typography style={{ color: '#666666' }}>Musik belum memiliki data {title}</Typography>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default CardWithIndicator;
