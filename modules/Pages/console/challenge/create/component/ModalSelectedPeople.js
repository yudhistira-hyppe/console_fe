import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Avatar, Button, Paper, Stack } from '@mui/material';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import { makeStyles } from '@material-ui/styles';
import { Add, Check, Remove } from '@material-ui/icons';
import ScrollBar from 'react-perfect-scrollbar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 960,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '12px',
};

const useStyles = makeStyles(() => ({
  textTruncate: {
    width: '100%',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': 2,
    lineClamp: 2,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

export default function ModalSelectedPeople({ showModal, onClose, selectedItem, handleInputChange }) {
  const { authUser } = useAuth();
  const classes = useStyles();
  const [hoverRemove, setHoverRemove] = useState({ show: false, id: null });
  const [listItem, setListItem] = useState(selectedItem);

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const endpoint = mediaEndpoint?.split('_');

    return `${STREAM_URL}${endpoint?.[0]}${authToken}`;
  };

  useEffect(() => {
    setListItem(selectedItem);
  }, [showModal]);

  const handleClick = (event, id) => {
    const selectedIndex = listItem?.map((item) => item?.iduser).indexOf(id?.iduser);

    let newListItem = [];

    if (selectedIndex === -1) {
      newListItem = newListItem.concat(listItem, id);
    } else if (selectedIndex === 0) {
      newListItem = newListItem.concat(listItem.slice(1));
    } else if (selectedIndex === listItem.length - 1) {
      newListItem = newListItem.concat(listItem.slice(0, -1));
    } else if (selectedIndex > 0) {
      newListItem = newListItem.concat(listItem.slice(0, selectedIndex), listItem.slice(selectedIndex + 1));
    }
    setListItem(newListItem);
  };

  console.log(listItem);

  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" gap={2}>
            <Typography style={{ fontWeight: 'bold', fontSize: 24 }}>List Partisipan Challenge</Typography>
            <TableContainer style={{ maxHeight: 540 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Nama</TableCell>
                    <TableCell align="left">Jenis Kelamin</TableCell>
                    <TableCell align="left">Umur</TableCell>
                    <TableCell align="left">Lokasi</TableCell>
                    <TableCell align="left">Jenis Akun</TableCell>
                    <TableCell align="left">Status Undangan</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {selectedItem?.length >= 1 ? (
                    selectedItem?.map((item, i) => (
                      <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} hover>
                        <TableCell align="left">
                          <Stack direction="row" alignItems="center" gap="15px" width={240}>
                            <Avatar src={getMediaUri(item?.avatar[0]?.mediaEndpoint)} />
                            <Stack gap="4px" overflow="hidden" width="100%">
                              <Typography
                                style={{ fontSize: '14px', color: '#00000099' }}
                                className={classes.textTruncate}
                                title={item?.username || '-'}>
                                {item?.username || '-'}
                              </Typography>
                              <Typography
                                style={{ fontSize: '12px', color: '#00000099' }}
                                className={classes.textTruncate}
                                title={item?.email || '-'}>
                                {item?.email || '-'}
                              </Typography>
                            </Stack>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            variant="body1"
                            style={{ fontSize: '12px', textOverflow: 'ellipsis', width: 80, overflow: 'hidden' }}>
                            {item?.gender === 'MALE' && 'Laki-laki'}
                            {item?.gender === 'FEMALE' && 'Perempuan'}
                            {item?.gender === 'OTHER' && 'Lainnya'}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" style={{ fontSize: '12px' }}>
                            {item?.age || 0}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography
                            variant="body1"
                            style={{
                              fontSize: '12px',
                              textOverflow: 'ellipsis',
                              overflow: 'hidden',
                              whiteSpace: 'nowrap',
                            }}>
                            {item?.areas || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body1" style={{ fontSize: '12px' }}>
                            {item?.jenis === 'BASIC' && 'Tidak Terverifikasi'}
                            {item?.jenis === 'PREMIUM' && 'Terverifikasi'}
                            {!item?.jenis && '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant={listItem?.map((item) => item?.iduser).includes(item?.iduser) ? 'outlined' : 'contained'}
                            color={hoverRemove.show && item?.iduser === hoverRemove?.id ? 'error' : 'secondary'}
                            endIcon={
                              listItem?.map((item) => item?.iduser).includes(item?.iduser) ? (
                                hoverRemove.show && item?.iduser === hoverRemove?.id ? (
                                  <Remove style={{ fontSize: 20 }} />
                                ) : (
                                  <Check style={{ fontSize: 20 }} />
                                )
                              ) : (
                                <Add style={{ fontSize: 20 }} />
                              )
                            }
                            onClick={(event) => {
                              handleClick(event, item);
                              setHoverRemove({ show: false, id: null });
                            }}
                            onMouseEnter={() => {
                              if (listItem?.map((item) => item?.iduser).includes(item?.iduser)) {
                                setHoverRemove({ show: true, id: item?.iduser });
                              }
                            }}
                            onMouseLeave={() => {
                              if (listItem?.map((item) => item?.iduser).includes(item?.iduser)) {
                                setHoverRemove({ show: false, id: null });
                              }
                            }}
                            style={{ width: 120 }}>
                            <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                              {listItem?.map((item) => item?.iduser).includes(item?.iduser)
                                ? hoverRemove.show && item?.iduser === hoverRemove?.id
                                  ? 'Batalkan'
                                  : 'Diundang'
                                : 'Undang'}
                            </Typography>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Stack direction="column" alignItems="center" justifyContent="center" height={440} spacing={2}>
                          <Typography style={{ fontFamily: 'Normal' }}>Belum ada partisipan yang dipilih</Typography>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>

          <Stack direction="row" mt={5} spacing={1}>
            <Button
              variant="contained"
              color="secondary"
              style={{ borderRadius: 6, padding: '10px 20px' }}
              onClick={() => {
                handleInputChange('invited_people', listItem);
                onClose();
              }}
              disabled={selectedItem?.length === listItem?.length}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                Terapkan Perubahan
              </Typography>
            </Button>
            <Button variant="outlined" color="secondary" style={{ borderRadius: 6, padding: '10px 20px' }} onClick={onClose}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Kembali</Typography>
            </Button>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
