import { Typography } from '@material-ui/core';
import { FileCopyOutlined } from '@material-ui/icons';
import { Box, Chip, Modal, Stack } from '@mui/material';
import { GridCloseIcon } from '@mui/x-data-grid';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import moment from 'moment';
import React from 'react';
import { toast } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: '#ffffff',
  borderRadius: 4,
  padding: '45px 25px 25px',
};

const ModalDetail = ({ visible, data, handleClose }) => {
  const copyVAToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Nomor virtual berhasil disalin', {
      id: 'va',
      style: {
        backgroundColor: '#56AF26',
        color: 'white',
      },
    });
  };

  return (
    <Modal
      open={visible}
      onClose={handleClose}
      disableAutoFocus
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        <div style={{ position: 'absolute', zIndex: 100, top: 15, right: 15, cursor: 'pointer' }} onClick={handleClose}>
          <GridCloseIcon style={{ color: '#666666' }} />
        </div>
        <Typography
          style={{
            fontFamily: 'Lato',
            fontSize: 22,
            position: 'absolute',
            top: 20,
            left: 0,
            paddingBottom: 20,
            width: '100%',
            textAlign: 'center',
            borderBottom: '1px solid rgb(223 219 219)',
            margin: 0,
          }}>
          {data?.type === 'Rewards' ? 'Detail Hadiah' : 'Detail Transaksi'}
        </Typography>
        <Stack direction="column" marginTop="50px">
          <Stack alignItems="flex-start" marginBottom="5px">
            {data?.type === 'Rewards' && (
              <Chip
                label="Diterima"
                style={{
                  backgroundColor: 'rgba(113, 165, 0, 0.1)',
                  color: '#71A500D9',
                  fontFamily: 'Normal',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              />
            )}
            {data?.status === 'WAITING_PAYMENT' && data?.type !== 'Rewards' && (
              <Chip
                label="Menunggu Pembayaran"
                style={{
                  backgroundColor: '#0356AF1A',
                  color: '#0356AF',
                  fontFamily: 'Normal',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              />
            )}
            {data?.status === 'Success' && data?.type !== 'Rewards' && (
              <Chip
                label="Berhasil"
                style={{
                  backgroundColor: 'rgba(113, 165, 0, 0.1)',
                  color: '#71A500D9',
                  fontFamily: 'Normal',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              />
            )}
            {data?.status === 'Cancel' && data?.type !== 'Rewards' && (
              <Chip
                label="Gagal"
                style={{
                  backgroundColor: 'rgba(103, 103, 103, 0.1)',
                  color: '#676767D9',
                  fontFamily: 'Normal',
                  fontWeight: 'bold',
                  fontSize: 14,
                }}
              />
            )}
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" padding="0 5px" marginTop="10px">
            <Typography style={{ fontSize: 14 }}>No. Invoice</Typography>
            <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#666666' }}>{data?.noinvoice}</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            padding="0 5px"
            marginTop="8px"
            paddingBottom="20px"
            borderBottom="1px dashed rgb(223 219 219)">
            <Typography style={{ fontSize: 14 }}>Tanggal Pembelian</Typography>
            <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#666666' }}>
              {moment(data?.timestamp).utc().format('DD MMMM YYYY, HH:mm')} WIB
            </Typography>
          </Stack>
          <Typography style={{ fontWeight: 'bold', margin: '15px 0 5px' }}>Detail Konten</Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginTop="8px">
            <Typography style={{ fontSize: 14 }} title={data?.title}>
              {data?.title}
              <br />
              <span style={{ fontSize: 10 }}>Type: Hyppe{data?.postType}</span>
            </Typography>
          </Stack>
          <div style={{ marginTop: 8, paddingBottom: 10, borderBottom: '1px dashed rgb(223 219 219)' }} />
          <Typography style={{ fontWeight: 'bold', margin: '15px 0 5px' }}>Rincian Pembayaran</Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginTop="8px">
            <Typography style={{ fontSize: 14 }}>Metode Pembayaran</Typography>
            <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#666666' }}>Virtual Account</Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            marginTop="8px"
            paddingBottom="10px"
            borderBottom="1px dashed rgb(223 219 219)">
            <Typography style={{ fontSize: 14 }}>Nomor VA</Typography>
            <Typography
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#666666',
                height: 30,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}>
              {data?.nova}{' '}
              <FileCopyOutlined
                htmlColor="#AB22AF"
                style={{ fontSize: 16, cursor: 'pointer' }}
                onClick={() => copyVAToClipboard(data?.nova)}
              />
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginTop="10px">
            <Typography style={{ fontSize: 14 }}>Total Harga</Typography>
            <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#666666' }}>
              Rp{numberWithCommas(data?.amount || 0)}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginTop="10px">
            <Typography style={{ fontSize: 14 }}>Biaya Admin (1%)</Typography>
            <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#666666' }}>
              Rp{numberWithCommas(data?.amount / 100)}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            marginTop="8px"
            paddingBottom="20px"
            borderBottom="1px dashed rgb(223 219 219)">
            <Typography style={{ fontSize: 14 }}>Biaya Servis</Typography>
            <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#666666' }}>
              Rp{numberWithCommas(6000)}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between" marginTop="10px">
            <Typography style={{ fontWeight: 'bold' }}>Total Transaksi</Typography>
            <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#666666' }}>
              Rp{numberWithCommas(data?.totalamount || 0)}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalDetail;
