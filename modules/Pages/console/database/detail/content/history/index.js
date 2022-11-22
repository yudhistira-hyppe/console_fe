import React from 'react';
import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const History = (props) => {
  const { detail } = props;

  return (
    <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardHeader title={<Typography variant="h3">Riwayat</Typography>} />
      <CardContent style={{ paddingTop: 5, height: '100%' }}>
        <Stack spacing={1} height="100%">
          {detail?.data[0]?.namapenjual && (
            <>
              <Typography variant="caption">
                Dijual oleh <span style={{ color: '#AB22AF', fontWeight: 'bold' }}>@{detail?.data[0]?.namapenjual}</span>{' '}
                seharga Rp.
                {numberWithCommas(detail?.data[0]?.saleAmount)} kepada
                <span style={{ color: '#AB22AF', fontWeight: 'bold' }}> @{detail?.data[0]?.pemiliksekarang}</span>
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {moment(detail?.data[0]?.tgltransaksi).format('DD/MM/YYYY - HH:mm')} WIB
              </Typography>
              <Divider style={{ margin: '15px 0 5px' }} />
            </>
          )}
          <Typography variant="caption">
            Kepemilikan didaftarkan oleh{' '}
            <span style={{ color: '#AB22AF', fontWeight: 'bold' }}>@{detail?.data[0]?.username}</span>
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {moment(detail?.data[0]?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default History;
