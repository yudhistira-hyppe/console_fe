import { Typography } from '@material-ui/core';
import { Chip, Divider, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import ScrollBar from 'react-perfect-scrollbar';

const ActivityItem = ({ detail }) => {
  const now = dayjs();

  return (
    <ScrollBar style={{ height: 572, marginTop: 16 }}>
      <Stack direction="column" gap={2} style={{ width: '100%', paddingRight: 16 }}>
        {[{}, {}, {}].map((item, key) => (
          <>
            <Stack direction="column" gap={1}>
              <Typography style={{ color: '#737373' }}>
                <span style={{ color: '#3F3F3F', fontWeight: 'bold' }}>Paramitha</span> berhasil mengedit kompetisi
              </Typography>
              <Typography style={{ color: '#00000099', fontSize: 14 }}>
                {now.diff(dayjs(), 'hours') < 12
                  ? 'Hari ini'
                  : now.diff(dayjs(), 'hours') < 24
                  ? 'Kemarin'
                  : `${now.diff(dayjs(), 'days')} hari lalu`}
                , {dayjs().format('DD/MM/YYYY - HH:mm')} WIB
              </Typography>
            </Stack>
            <Divider flexItem />
          </>
        ))}
      </Stack>
    </ScrollBar>
  );
};

export default ActivityItem;
