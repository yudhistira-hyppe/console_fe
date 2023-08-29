import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Avatar, Button, IconButton, InputAdornment, Paper, Stack, TextField } from '@mui/material';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import { makeStyles } from '@material-ui/styles';
import { Add, Check, Close, Delete, Remove, Search } from '@material-ui/icons';
import ScrollBar from 'react-perfect-scrollbar';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 560,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: '6px',
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

export default function ModalSelectedPeople({ showModal, onClose, selectedItem, handleInputChange, type }) {
  const { authUser } = useAuth();
  const classes = useStyles();
  const [hoverRemove, setHoverRemove] = useState({ show: false, id: null });
  const [listItem, setListItem] = useState(selectedItem);
  const [search, setSearch] = useState('');

  const filteredList = selectedItem?.filter((item) => item?.fullName?.toLowerCase()?.includes(search?.toLowerCase()));

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

  return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Stack direction="column" gap={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>{listItem?.length || 0} Total Penerima</Typography>
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            </Stack>

            <TextField
              placeholder="Cari nama penerima"
              color="secondary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ paddingRight: 6 }}>
                    <Search />
                  </InputAdornment>
                ),
                endAdornment: search?.length >= 1 && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearch('')}>
                      <Close style={{ fontSize: 20 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              // sx={{ '& input': { height: 32 } }}
            />

            <ScrollBar style={{ height: 540, paddingRight: 16 }}>
              <Stack direction="column" gap={2}>
                {filteredList?.length >= 1 ? (
                  filteredList?.map((item, i) => (
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Stack direction="row" alignItems="center" gap="15px" width={240}>
                        <Avatar src={getMediaUri(item?.avatar?.[0]?.mediaEndpoint)} style={{ height: 45, width: 45 }} />
                        <Stack gap="4px" overflow="hidden" width="100%">
                          <Typography style={{ fontWeight: 'bold', fontSize: 14 }} title={item?.username || '-'}>
                            {item?.fullName || '-'}
                          </Typography>
                          <Typography style={{ fontSize: 12, color: '#00000099' }} title={item?.email || '-'}>
                            {item?.email || '-'}
                          </Typography>
                        </Stack>
                      </Stack>

                      {type !== 'detail' && (
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
                          style={{ width: 110 }}>
                          <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                            {listItem?.map((item) => item?.iduser).includes(item?.iduser)
                              ? hoverRemove.show && item?.iduser === hoverRemove?.id
                                ? 'Batalkan'
                                : 'Terpilih'
                              : 'Pilih'}
                          </Typography>
                        </Button>
                      )}
                    </Stack>
                  ))
                ) : (
                  <Stack direction="column" alignItems="center" justifyContent="center" height={440} spacing={2}>
                    <Typography style={{ fontFamily: 'Normal' }}>Belum ada partisipan yang dipilih</Typography>
                  </Stack>
                )}
              </Stack>
            </ScrollBar>
          </Stack>

          {type !== 'detail' && (
            <Stack direction="row" justifyContent="flex-end" mt={3}>
              <Button
                variant="contained"
                color="secondary"
                style={{ borderRadius: 6, padding: '10px 20px' }}
                onClick={() => {
                  handleInputChange(listItem);
                  onClose();
                }}
                disabled={selectedItem?.length === listItem?.length}>
                <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>
                  Terapkan Perubahan
                </Typography>
              </Button>
            </Stack>
          )}
        </Box>
      </Modal>
    </div>
  );
}
