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
        <Typography style={{ fontSize: 10 }}>List Penonton Iklan</Typography>
        <Typography style={{ fontSize: 8, color: '#737373' }}>Ini merupakan riwayat penonton, dari iklan</Typography>
      </Stack>
      <Table style={{ width: 400 }}>
        <TableRow>
          <TableCell style={{ fontSize: 8, padding: 5, width: 50, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Tanggal
          </TableCell>
          <TableCell style={{ fontSize: 8, padding: 5, width: 50, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Penonton
          </TableCell>
          <TableCell style={{ fontSize: 8, padding: 5, width: 50, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Jenis Kelamin
          </TableCell>
          <TableCell style={{ fontSize: 8, padding: 5, width: 50, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Umur
          </TableCell>
          <TableCell style={{ fontSize: 8, padding: 5, width: 50, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Area
          </TableCell>
          <TableCell style={{ fontSize: 8, padding: 5, width: 50, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Minat
          </TableCell>
          <TableCell style={{ fontSize: 8, padding: 5, width: 50, borderBottom: 'none', backgroundColor: '#FBFBFB' }}>
            Kesamaan Audiens
          </TableCell>
        </TableRow>
        <TableBody>
          {data?.map((item, key) => (
            <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
              <TableCell style={{ padding: 5, width: 50, borderBottom: 'none' }} align="left">
                <Typography variant="body1" style={{ fontSize: 8, width: 80 }}>
                  {moment(item?.timestamp).utc().format('DD/MM/YYYY')}
                </Typography>
              </TableCell>
              <TableCell style={{ padding: 5, width: 50, borderBottom: 'none' }} align="left">
                <Typography variant="body1" style={{ fontSize: 8, color: '#00000099' }}>
                  {item?.username || '-'}
                </Typography>
              </TableCell>
              <TableCell style={{ padding: 5, width: 50, borderBottom: 'none' }} align="left">
                <Typography variant="body1" style={{ fontSize: 8, color: '#00000099' }}>
                  {item?.gender || 'Lainnya'}
                </Typography>
              </TableCell>
              <TableCell style={{ padding: 5, width: 50, borderBottom: 'none' }} align="left">
                <Typography variant="body1" style={{ fontSize: 8, color: '#00000099' }}>
                  {item?.age || 0}
                </Typography>
              </TableCell>
              <TableCell style={{ padding: 5, width: 50, borderBottom: 'none' }} align="left">
                <Typography variant="body1" style={{ fontSize: 8, color: '#00000099' }}>
                  {item?.lokasi ? item?.lokasi : 'Lainnya'}
                </Typography>
              </TableCell>
              <TableCell style={{ padding: 5, width: 50, borderBottom: 'none' }} align="left">
                <Typography variant="body1" style={{ fontSize: 8 }} title={item?.interest?.join(', ') || '-'}>
                  {item?.interest?.length >= 1 ? item?.interest?.join(', ') : '-'}
                </Typography>
              </TableCell>
              <TableCell style={{ padding: 5, width: 50, borderBottom: 'none' }} align="left">
                <Typography variant="body1" style={{ fontSize: 8 }}>
                  {item?.commonality < 25 && '< 25%'}
                  {item?.commonality >= 25 && item?.commonality < 50 && '25 - 50%'}
                  {item?.commonality >= 50 && item?.commonality < 75 && '50 - 75%'}
                  {item?.commonality >= 75 && item?.commonality <= 100 && '75 - 100%'}
                </Typography>
              </TableCell>
            </TableRow>
            // <TableRow key={key}>
            //   <TableCell style={{ padding: 5, width: 80, borderBottom: 'none' }}>
            //     <Typography style={{ fontSize: 8 }}>{moment(item?.createdAt).format('DD/MM/YYYY')}</Typography>
            //     <Typography style={{ fontSize: 6, color: 'rgba(0, 0, 0, 0.6)' }}>
            //       {moment(item?.createdAt).format('HH:mm')} WIB
            //     </Typography>
            //   </TableCell>
            //   <TableCell style={{ padding: 5, width: 120, borderBottom: 'none' }}>
            //     <Typography style={{ fontSize: 8 }}>{item?.fullName || '-'}</Typography>
            //   </TableCell>
            //   <TableCell style={{ padding: 5, width: 80, borderBottom: 'none', overflow: 'hidden' }}>
            //     <Typography
            //       variant="body1"
            //       style={{
            //         width: '100%',
            //         fontSize: 8,
            //         overflow: 'hidden',
            //       }}>
            //       {item?.gender === 'OTHER' && 'Lainnya'}
            //       {item?.gender === 'MALE' && 'Laki-laki'}
            //       {item?.gender === 'FEMALE' && 'Perempuan'}
            //     </Typography>
            //   </TableCell>
            //   <TableCell style={{ padding: 5, width: 50, borderBottom: 'none' }}>
            //     <Typography style={{ fontSize: 8 }}>{item?.age || 0}</Typography>
            //   </TableCell>
            //   <TableCell style={{ padding: 5, width: 70, borderBottom: 'none' }}>
            //     <Typography style={{ fontSize: 8 }}>{item?.areas === 'OTHER' ? 'Lainnya' : item?.areas}</Typography>
            //   </TableCell>
            //   <TableCell style={{ padding: 5, width: 70, borderBottom: 'none' }}>
            //     <Typography style={{ fontSize: 8 }}>
            //       {item?.priority === 'HIGHT' && 'Tertinggi'}
            //       {item?.priority === 'MEDIUM' && 'Menengah'}
            //       {item?.priority === 'LOW' && 'Rendah'}
            //       {item?.priority === 'LOWEST' && 'Terendah'}
            //     </Typography>
            //   </TableCell>
            // </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
};

export default DocumentPDF;
