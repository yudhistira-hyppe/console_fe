import React from 'react';
import { Card, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

const CardWithDivider = (props) => {
  const { title, value, description } = props;

  return (
    <Card style={{ minHeight: 250, height: '100%' }}>
      <Stack direction="column" height="100%">
        <Typography style={{ padding: 24, fontWeight: 'bold', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)' }}>
          {title}
        </Typography>
        <Stack direction="column" alignItems="center" justifyContent="center" height="100%" gap="6px">
          <Typography style={{ fontWeight: 'bold', fontSize: 32, color: '#3F3F3FDE' }}>{value}</Typography>
          <Typography style={{ color: '#3F3F3FDE' }}>{description}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default CardWithDivider;
