import React from 'react';
import { Card, CircularProgress, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

const CardWithDivider = (props) => {
  const { title, value, description, loading } = props;

  return (
    <Card style={{ height: 250 }}>
      <Stack direction="column" height="100%">
        <Typography style={{ padding: 24, fontWeight: 'bold', boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.1)' }}>
          {title}
        </Typography>
        {loading ? (
          <Stack direction="column" alignItems="center" justifyContent="center" height="100%" gap={2}>
            <CircularProgress color="secondary" size={32} />
          </Stack>
        ) : (
          <Stack direction="column" alignItems="center" justifyContent="center" height="100%" gap="6px">
            <Typography style={{ fontWeight: 'bold', fontSize: 32, color: '#3F3F3FDE' }}>{value}</Typography>
            <Typography style={{ color: '#3F3F3FDE' }}>{description}</Typography>
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default CardWithDivider;
