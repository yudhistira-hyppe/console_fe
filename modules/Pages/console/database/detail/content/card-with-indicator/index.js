import React from 'react';
import CmtList from '@coremat/CmtList';
import CmtProgressBar from '@coremat/CmtProgressBar';
import { Typography } from '@material-ui/core';
import { Box, Card, Stack } from '@mui/material';
import ScrollBar from 'react-perfect-scrollbar';

const ProgressIndicator = (props) => {
  const { item, ...rest } = props;

  return (
    <Box width={1} {...rest}>
      <CmtProgressBar
        label={
          <Box display="flex" alignItems="center">
            {item._id === 'other' || item._id === 'OTHER'
              ? 'Lainnya'
              : item._id === 'FEMALE'
              ? 'Perempuan'
              : item._id === 'MALE'
              ? 'Laki-laki'
              : item._id}
          </Box>
        }
        labelPos="top-left"
        value={item.persen}
        renderValue={(value) => {
          return `${value}%`;
        }}
        containedColor="#AB22AF"
        onlyContained
      />
    </Box>
  );
};

const CardWithIndicator = (props) => {
  const { title, data } = props;

  return (
    <Card style={{ padding: 24 }}>
      <Stack direction="column" gap="24px">
        <Typography style={{ fontSize: 18, fontWeight: 'bold' }}>{title}</Typography>
        {data?.length >= 1 ? (
          <ScrollBar style={{ height: 210 }}>
            <CmtList data={data} renderRow={(item, index) => <ProgressIndicator key={index} item={item} />} />
          </ScrollBar>
        ) : (
          <Stack direction="column" alignItems="center" justifyContent="center" gap="20px" textAlign="center" height={210}>
            <img src="/images/icon-media-empty.png" style={{ width: 60, height: 60 }} />
            <Typography style={{ color: '#666666', fontSize: 14, fontWeight: 'bold' }}>
              Konten ini belum memiliki data {title}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default CardWithIndicator;
