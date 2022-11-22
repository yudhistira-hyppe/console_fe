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
            {item.label}
          </Box>
        }
        labelPos="top-left"
        value={item.value}
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
        <ScrollBar style={{ maxHeight: 210 }}>
          <CmtList data={data} renderRow={(item, index) => <ProgressIndicator key={index} item={item} />} />
        </ScrollBar>
      </Stack>
    </Card>
  );
};

export default CardWithIndicator;
