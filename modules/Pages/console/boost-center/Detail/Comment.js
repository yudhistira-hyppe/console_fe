import React from 'react';
import { Typography } from '@material-ui/core';
import { Avatar, Card, Stack } from '@mui/material';
import ScrollBar from 'react-perfect-scrollbar';
import moment from 'moment';

const Comment = () => {
  return (
    <Card style={{ padding: 24 }}>
      <Stack direction="column" gap="24px">
        <Stack direction="row" justifyContent="space-between">
          <Typography style={{ fontWeight: 'bold' }}>Komentar</Typography>
          <Typography style={{ fontSize: 14 }}>503 Komentar</Typography>
        </Stack>
        <ScrollBar
          style={{ height: '100%', maxHeight: 230, display: 'flex', flexDirection: 'column', gap: 16, paddingRight: 20 }}>
          {[{}, {}, {}, {}, {}, {}, {}].map((item, key) => (
            <Stack direction="row" gap="16px">
              <Avatar style={{ width: '100%', maxWidth: 56, height: 56 }} />
              <Stack direction="column" justifyContent="center" gap="4px" width="100%">
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography
                    style={{ fontSize: 14, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: 420 }}>
                    <span style={{ color: '#AB22AF' }}>Gerry Lay</span> berkomentar "Keren Banget"
                  </Typography>
                  <Typography style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.38)' }}>5m lalu</Typography>
                </Stack>
                <Typography style={{ fontSize: 12, fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.38)' }}>
                  {moment().format('HH:mm - DD.MM.YY')}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </ScrollBar>
      </Stack>
    </Card>
  );
};

export default Comment;
