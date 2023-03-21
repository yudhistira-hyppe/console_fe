import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import moment from 'moment';
import React from 'react';

// Create Document Component
const DocumentPDF = ({ data }) => {
  return (
    <Stack padding="20px" width="800px" spacing={2}>
      <img src="/images/logo-hyppe.png" style={{ width: 100, height: 'auto', backgroundColor: 'white' }} />
      <Stack>
        <Typography style={{ fontSize: 10 }}>Riwayat Transaksi</Typography>
        <Typography style={{ fontSize: 8, color: '#737373' }}>
          Ini merupakan riwayat transaksi, yang kamu lakukan di hyppe
        </Typography>
      </Stack>
      <Table style={{ width: 400 }}>
        <TableRow>
          <TableCell style={{ fontSize: 8, padding: 5, width: 80, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Tanggal
          </TableCell>
          <TableCell style={{ fontSize: 8, padding: 5, width: 120, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Penonton
          </TableCell>
          <TableCell style={{ fontSize: 8, padding: 5, width: 80, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Jenis Kelamin
          </TableCell>
          <TableCell style={{ fontSize: 8, padding: 5, width: 50, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Umur
          </TableCell>
          <TableCell style={{ fontSize: 8, padding: 5, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>Area</TableCell>
          <TableCell style={{ fontSize: 8, padding: 5, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Prioritas
          </TableCell>
        </TableRow>
        <TableBody>
          {data?.map((item, key) => (
            <TableRow key={key}>
              <TableCell style={{ padding: 5, width: 80, borderBottom: 'none' }}>
                <Typography style={{ fontSize: 8 }}>{moment(item?.createdAt).format('DD/MM/YYYY')}</Typography>
                <Typography style={{ fontSize: 6, color: 'rgba(0, 0, 0, 0.6)' }}>
                  {moment(item?.createdAt).format('HH:mm')} WIB
                </Typography>
              </TableCell>
              <TableCell style={{ padding: 5, width: 120, borderBottom: 'none' }}>
                <Typography style={{ fontSize: 8 }}>{item?.fullName || '-'}</Typography>
              </TableCell>
              <TableCell style={{ padding: 5, width: 80, borderBottom: 'none', overflow: 'hidden' }}>
                <Typography
                  variant="body1"
                  style={{
                    width: '100%',
                    fontSize: 8,
                    overflow: 'hidden',
                  }}>
                  {item?.gender === 'OTHER' && 'Lainnya'}
                  {item?.gender === 'MALE' && 'Laki-laki'}
                  {item?.gender === 'FEMALE' && 'Perempuan'}
                </Typography>
              </TableCell>
              <TableCell style={{ padding: 5, width: 50, borderBottom: 'none' }}>
                <Typography style={{ fontSize: 8 }}>{item?.age || 0}</Typography>
              </TableCell>
              <TableCell style={{ padding: 5, width: 70, borderBottom: 'none' }}>
                <Typography style={{ fontSize: 8 }}>{item?.areas === 'OTHER' ? 'Lainnya' : item?.areas}</Typography>
              </TableCell>
              <TableCell style={{ padding: 5, width: 70, borderBottom: 'none' }}>
                <Typography style={{ fontSize: 8 }}>
                  {item?.priority === 'HIGHT' && 'Tertinggi'}
                  {item?.priority === 'MEDIUM' && 'Menengah'}
                  {item?.priority === 'LOW' && 'Rendah'}
                  {item?.priority === 'LOWEST' && 'Terendah'}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default DocumentPDF;
