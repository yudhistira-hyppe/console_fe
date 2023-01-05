import React from 'react';
import { Card, CardContent, CardHeader, Divider, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import ScrollBar from 'react-perfect-scrollbar';

const History = (props) => {
  const { data } = props;

  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title={<Typography variant="h3">Riwayat</Typography>} />
      <CardContent style={{ paddingTop: 5, height: '100%' }}>
        <ScrollBar style={{ height: 127 }}>
          <Stack direction="column" spacing={1} height="100%">
            <Typography variant="caption">
              Kepemilikan dipegang oleh{' '}
              <span style={{ color: '#AB22AF', fontWeight: 'bold' }}>@{data?.username || '-'}</span>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {moment(data?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB
            </Typography>
            {data?.riwayat?.length >= 1 &&
              data?.riwayat?.map((item, key) => (
                <Stack key={key} spacing={1}>
                  <Divider style={{ margin: '15px 0 5px' }} />
                  <Typography variant="caption">
                    Dijual oleh <span style={{ color: '#AB22AF', fontWeight: 'bold' }}>@{item?.penjual || '-'}</span> seharga
                    Rp.
                    {numberWithCommas(item?.amount || 0)} kepada
                    <span style={{ color: '#AB22AF', fontWeight: 'bold' }}> @{item?.pembeli || '-'}</span>
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {moment(item?.timestamp).format('DD/MM/YYYY - HH:mm')} WIB
                  </Typography>
                </Stack>
              ))}
          </Stack>
        </ScrollBar>
      </CardContent>
    </Card>
  );
};

export default History;
