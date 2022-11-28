import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Avatar, Button, Card, Chip, Divider, Grow, Paper, Popper, TextareaAutosize, Typography } from '@material-ui/core';
import React, { useRef, useState, useEffect } from 'react';
import { Box, Select, Stack } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Breadcrumbs from '../BreadCrumb/index';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import ModalChangeStatus from '../Modal';
import GetChipColor from 'helpers/getChipColor';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { FolderShared, KeyboardArrowDown } from '@material-ui/icons';
import {
  useGetDetailTicketQuery,
  useGetLogHistoryDetailTicketQuery,
  useGetUserDivisiQuery,
  useReplyTicketMutation,
  useUpdateDetailTicketMutation,
} from 'api/console/helpCenter/bantuan-pengguna';
import moment from 'moment';
import PageLoader from '@jumbo/components/PageComponents/PageLoader';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import { LoadingButton } from '@mui/lab';
import { useGetDivisiQuery } from 'api/console/divisi';

const breadcrumbs = [
  { label: 'Pusat Bantuan', link: '/help-center' },
  { label: 'Bantuan Pengguna', link: '/help-center/bantuan-pengguna' },
  { label: 'Detail Masalah', isActive: true },
];

const useStyles = makeStyles((theme) => ({
  scrollbarRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  textArea: {
    resize: 'none',
    height: '120px !important',
    borderRadius: 4,
    border: '1px solid #dddddd',
    padding: 10,
    fontSize: 14,
  },
}));

const DetailBantuanPengguna = () => {
  const router = useRouter();
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);
  const [buttonColor, setButtonColor] = useState({ background: '' });
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [tab, setTab] = useState('chat');
  const [body, setBody] = useState({ text: '', file: [] });
  const [showModal, setShowModal] = useState({
    show: false,
    type: 'Baru',
    done: false,
    children1: null,
    children2: null,
  });
  const [filter, setFilter] = useState({ id: router?.query?.id, type: 'chat' });
  const [loading, setLoading] = useState({
    reply: false,
    update: false,
  });
  const [divisiID, setDivisiID] = useState('');
  const [userAssign, setUserAssign] = useState('');
  const classes = useStyles();
  const { data: ticketData, isLoading, refetch } = useGetDetailTicketQuery(filter);
  const { data: logHistory } = useGetLogHistoryDetailTicketQuery({ iduserticket: router?.query?.id });
  const { data: listDivisi } = useGetDivisiQuery({ skip: 0, limit: 10 });
  const { data: userDivisi } = useGetUserDivisiQuery({ divisionId: divisiID || '' }) || [];
  const [updateTicket] = useUpdateDetailTicketMutation();
  const [replyTicket] = useReplyTicketMutation();
  const { authUser } = useAuth();

  const getMediaUri = (urlEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    const mediaURI = urlEndpoint;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const handleClose = (event) => {
    const child1 = showModal?.type?.repeat(1);
    event.target.id === 'Baru'
      ? setStatus('new')
      : event.target.id === 'Dalam Proses'
      ? setStatus('onprogress')
      : setStatus('close');
    if (event.target.id.toLowerCase() === 'baru' || event.target.id.toLowerCase() === 'dalam proses') {
      setShowModal((prevVal) => {
        return {
          ...prevVal,
          show: true,
          done: false,
          children1: <Chip label={child1} style={GetChipColor(child1)} />,
          children2: <Chip label={event.target.id} style={GetChipColor(event.target.id)} />,
        };
      });
    } else if (event.target.id.toLowerCase() === 'selesai') {
      setShowModal((prevVal) => {
        return {
          ...prevVal,
          show: true,
          done: true,
        };
      });
    }
    setOpen(false);
  };

  React.useEffect(() => {
    switch (ticketData?.data[0]?.status) {
      case 'new':
        setButtonColor({ background: '#E92A63' });
        break;
      case 'onprogress':
        setButtonColor({ background: '#FF8C00' });
        break;
      case 'close':
        setButtonColor({ background: '#8DCD03' });
        break;
      default:
        break;
    }
    setShowModal((prevVal) => {
      return {
        ...prevVal,
        type:
          ticketData?.data[0]?.status === 'new'
            ? 'Baru'
            : ticketData?.data[0]?.status === 'onprogress'
            ? 'Dalam Proses'
            : 'Selesai',
      };
    });
  }, [ticketData]);

  const onCloseModal = () => {
    setShowModal({
      ...showModal,
      show: false,
      children1: null,
      children2: null,
    });
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleChangeTab = (value) => {
    setTab(value);
    value !== 'history' &&
      setFilter((prevVal) => {
        return {
          ...prevVal,
          type: value,
        };
      });
    setBody({ text: '', file: [] });
  };

  const handleUpdateStatus = () => {
    const data = {
      status: status,
    };

    updateTicket({ id: ticketData?.data[0]?._id, data }).then(() => router.replace('/help-center/bantuan-pengguna'));
    setShowModal((prevVal) => {
      return { ...prevVal, show: false };
    });
  };

  const handleUpdateTicket = () => {
    const data = {
      status: ticketData?.data[0]?.status,
      assignTo: userAssign,
    };

    setLoading({ ...loading, update: true });
    setDivisiID('');
    setUserAssign('');
    updateTicket({ id: ticketData?.data[0]?._id, data }).then(() => {
      setLoading({ ...loading, update: false });
    });
  };

  const handleReplyTicket = () => {
    setLoading({ reply: true });
    let data = new FormData();
    data.append('IdUserticket', ticketData?.data[0]?._id);
    data.append('type', tab);
    data.append('status', ticketData?.data[0]?.status);
    data.append('body', body.text);
    body.file?.length >= 1 && Array.from(body.file).map((item) => data.append('supportFile', item));

    replyTicket(data).then(() => {
      setLoading({ reply: false });
      setBody({ text: '', file: [] });
      refetch();
    });
  };

  return (
    <>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/help-center/bantuan-pengguna')}
          gap="5px"
          style={{ width: 'fit-content', cursor: 'pointer' }}>
          <Stack direction={'column'} justifyContent={'center'}>
            <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }} />
          </Stack>
          <Typography variant="h1" style={{ fontSize: 20, color: 'black' }}>
            Kembali
          </Typography>
        </Stack>
      </Stack>
      {isLoading || (loading.reply && !ticketData?.data[0]?.penerima) ? (
        <PageLoader />
      ) : (
        <PageContainer>
          <Stack direction="row" spacing={6}>
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Stack direction={'column'} spacing={2}>
                <Typography variant="h1">{ticketData?.data[0]?.subject}</Typography>
                <Typography variant="subtitle2">{ticketData?.data[0]?.body}</Typography>
                {ticketData?.data[0]?.fsSourceUri?.length >= 1 ? (
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {ticketData?.data[0]?.fsSourceUri?.map(
                      (item, key) =>
                        key <= 1 && <Chip label="Filename.zip" avatar={<FolderShared />} style={{ marginRight: '1em' }} />,
                    )}
                    {ticketData?.data[0]?.fsSourceUri?.length > 2 && (
                      <Stack direction={'column'} justifyContent={'center'}>
                        <Typography variant="subtitle2" style={{ color: 'rgba(0, 0, 0, 0.38)' }}>
                          +{ticketData?.data[0]?.fsSourceUri.length - 2} Lagi
                        </Typography>
                      </Stack>
                    )}
                  </div>
                ) : (
                  <Stack direction={'column'} justifyContent={'center'}>
                    <Typography variant="subtitle2" style={{ color: 'rgba(0, 0, 0, 0.38)' }}>
                      Tidak ada lampiran.
                    </Typography>
                  </Stack>
                )}
              </Stack>
              <Divider style={{ margin: '1.3em 0px 1.3em 0px' }} />
              <Stack mt={2} mb={3} direction={'row'}>
                <Button
                  variant={tab === 'chat' ? 'contained' : 'text'}
                  size="small"
                  onClick={() => handleChangeTab('chat')}
                  style={{ elevation: 0, boxShadow: 'none', marginRight: '10px' }}>
                  Pesan
                </Button>
                <Button
                  variant={tab === 'comment' ? 'contained' : 'text'}
                  size="small"
                  onClick={() => handleChangeTab('comment')}
                  style={{ elevation: 0, boxShadow: 'none', marginRight: '10px' }}>
                  Komentar
                </Button>
                <Button
                  variant={tab === 'history' ? 'contained' : 'text'}
                  size="small"
                  onClick={() => handleChangeTab('history')}
                  style={{ elevation: 0, boxShadow: 'none', marginRight: '10px' }}>
                  Riwayat
                </Button>
              </Stack>
              <PerfectScrollbar className={classes.scrollbarRoot}>
                <Box height={tab !== 'history' ? 250 : 420} overflow="auto">
                  {tab !== 'history' && ticketData?.data[0]?.detail?.length >= 1 ? (
                    <Stack direction="column" spacing={3}>
                      {ticketData?.data[0]?.detail?.map((item, key) => (
                        <Stack key={key} direction="row" spacing={2}>
                          <Avatar src={getMediaUri(item?.avatar?.mediaEndpoint)} />
                          <Stack direction="column" spacing={1} width="100%">
                            <Typography>
                              {item?.fullName} -{' '}
                              <Typography variant="caption">{moment(item?.datetime).format('lll')}</Typography>
                            </Typography>
                            <Typography>{item?.body}</Typography>
                            {item?.fsSourceUri?.length >= 1 ? (
                              <div style={{ display: 'flex', flexDirection: 'row' }}>
                                {item?.fsSourceUri?.map((item, key) => (
                                  <Chip
                                    key={key}
                                    label="Filename.zip"
                                    avatar={<FolderShared />}
                                    style={{ marginRight: '1em' }}
                                  />
                                ))}
                              </div>
                            ) : (
                              <Stack direction={'column'} justifyContent={'center'}>
                                <Typography variant="subtitle2" style={{ color: 'rgba(0, 0, 0, 0.38)' }}>
                                  Tidak ada lampiran.
                                </Typography>
                              </Stack>
                            )}
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  ) : (
                    <Typography variant="subtitle2" style={{ color: '#666666' }}>
                      {tab === 'chat' && 'Jadi yang pertama untuk mengirim pesan.'}
                      {tab === 'comment' && 'Jadi yang pertama untuk berkomentar.'}
                    </Typography>
                  )}
                  {tab === 'history' ? (
                    logHistory?.data?.length >= 1 ? (
                      <Stack direction="column" spacing={3}>
                        {logHistory.data.map((item, key) => (
                          <Stack key={key} direction="row" spacing={2}>
                            <Avatar src={getMediaUri(item?.avatar?.mediaEndpoint)} />
                            <Stack direction="column" spacing={1} width="100%">
                              <Typography>
                                {item?.fullName} -{' '}
                                <Typography variant="caption">{moment(item?.datetime).format('lll')}</Typography>
                              </Typography>
                              <Typography>{item?.remark}</Typography>
                            </Stack>
                          </Stack>
                        ))}
                      </Stack>
                    ) : (
                      <Typography variant="subtitle2" style={{ color: '#666666' }}>
                        Log Riwayat Kosong.
                      </Typography>
                    )
                  ) : null}
                </Box>
                {tab !== 'history' && (
                  <Stack mt={3}>
                    <TextareaAutosize
                      aria-label="maximum height"
                      maxRows={3}
                      className={classes.textArea}
                      placeholder="Tambahkan komentar"
                      onChange={(e) => setBody({ ...body, text: e.target.value })}
                      value={body.text}
                    />
                    <Stack direction="row" justifyContent="space-between" mt={2}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Button
                          variant="contained"
                          color="primary"
                          component="label"
                          onChange={(e) => setBody({ ...body, file: e.target.files })}>
                          Upload File
                          <input hidden accept="image/*" multiple type="file" />
                        </Button>
                        <Typography>{body.file?.length} file dilampirkan</Typography>
                      </Stack>
                      <Stack direction="row" spacing={2}>
                        <LoadingButton
                          loading={loading.reply}
                          variant="contained"
                          color="secondary"
                          onClick={handleReplyTicket}
                          disabled={body.text === ''}>
                          Kirim
                        </LoadingButton>
                        <Button onClick={() => setBody({ text: '', file: [] })}>Batal</Button>
                      </Stack>
                    </Stack>
                  </Stack>
                )}
              </PerfectScrollbar>
            </div>

            <Card style={{ flex: 1, padding: '2em', height: '100%' }}>
              <Button
                ref={anchorRef}
                variant="contained"
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                style={{ backgroundColor: buttonColor.background, color: '#fff' }}
                onClick={handleToggle}
                aria-haspopup="true"
                endIcon={<KeyboardArrowDown />}>
                {ticketData?.data[0]?.status === 'new' && 'Baru'}
                {ticketData?.data[0]?.status === 'onprogress' && 'Dalam Proses'}
                {ticketData?.data[0]?.status === 'close' && 'Selesai'}
              </Button>
              <Popper open={open} anchorEl={anchorRef.current} placement="right-start" transition>
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{ transformOrigin: placement === 'right-start' ? 'left top' : 'left bottom' }}>
                    <Paper elevation={3}>
                      <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                          autoFocusItem={open}
                          id="composition-menu"
                          aria-labelledby="composition-button"
                          onKeyDown={handleListKeyDown}>
                          {showModal.type === 'Baru' && (
                            <MenuItem id="Dalam Proses" onClick={handleClose}>
                              Dalam Proses
                            </MenuItem>
                          )}
                          {showModal.type !== 'Selesai' && (
                            <MenuItem id="Selesai" onClick={handleClose}>
                              Selesai
                            </MenuItem>
                          )}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
              <Stack direction={'row'} spacing={2} mt={4}>
                <div style={{ flex: 2 }}>
                  <Typography variant="body2">Nomor Tiket</Typography>
                </div>
                <div style={{ flex: 3 }}>
                  <Typography variant="body2" color="#00000099" style={{ opacity: '0.6' }}>
                    {ticketData?.data[0]?.nomortiket}
                  </Typography>
                </div>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={2}>
                <div style={{ flex: 2 }}>
                  <Typography variant="body2">Sumber</Typography>
                </div>
                <div style={{ flex: 3 }}>
                  <Typography variant="body2" color="#00000099" style={{ opacity: '0.6' }}>
                    {ticketData?.data[0]?.sourceName || '-'}
                  </Typography>
                </div>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={2}>
                <div style={{ flex: 2 }}>
                  <Typography variant="body2">Pengirim</Typography>
                </div>
                <div style={{ flex: 3 }}>
                  <Typography variant="body2" color="#00000099" style={{ opacity: '0.6' }}>
                    {ticketData?.data[0]?.pengirim || '-'}
                  </Typography>
                </div>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={2}>
                <div style={{ flex: 2 }}>
                  <Typography variant="body2">Ditangani Oleh</Typography>
                </div>
                <div style={{ flex: 3 }}>
                  <Typography variant="body2" color="#00000099" style={{ opacity: '0.6' }}>
                    {ticketData?.data[0]?.penerima || '-'}
                  </Typography>
                </div>
              </Stack>
              {ticketData?.data[0]?.asignTo ? (
                <Stack direction={'row'} alignItems="center" spacing={2} mt={2}>
                  <div style={{ flex: 2 }}>
                    <Typography variant="body2">Penerima Tugas</Typography>
                  </div>
                  <div style={{ flex: 3 }}>
                    <Chip label={ticketData?.data[0]?.asignTo || '-'} size="small" style={{ color: '#666666' }} />
                  </div>
                </Stack>
              ) : (
                <>
                  <Stack direction={'row'} alignItems="center" spacing={2} mt={2}>
                    <div style={{ flex: 2 }}>
                      <Typography variant="body2">Divisi Pendukung</Typography>
                    </div>
                    <div style={{ flex: 3 }}>
                      <Select
                        size="small"
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        style={{ width: '100%', height: 35 }}
                        value={divisiID}
                        onChange={(e) => {
                          setDivisiID(e.target.value);
                          setUserAssign('');
                        }}>
                        <MenuItem value="">Pilih Divisi</MenuItem>
                        {listDivisi?.data?.map((item, key) => (
                          <MenuItem key={key} value={item?._id}>
                            {item?.nameDivision}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </Stack>
                  <Stack direction={'row'} alignItems="center" spacing={2} mt={2}>
                    <div style={{ flex: 2 }}>
                      <Typography variant="body2">Penerima Tugas</Typography>
                    </div>
                    <div style={{ flex: 3 }}>
                      <Select
                        value={userAssign}
                        size="small"
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        style={{ width: '100%', height: 35 }}
                        disabled={divisiID === ''}
                        onChange={(e) => setUserAssign(e.target.value)}>
                        {divisiID !== '' && userDivisi?.data?.length > 1 && (
                          <MenuItem value={''} disabled>
                            Pilih User
                          </MenuItem>
                        )}
                        {divisiID === '' ? (
                          <MenuItem value={''} disabled>
                            ---
                          </MenuItem>
                        ) : userDivisi?.data?.length > 1 ? (
                          userDivisi?.data?.map((item, key) => (
                            <MenuItem key={key} value={item?.user[0]?._id}>
                              {item?.user[0]?.fullName || '-'}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem value={''} disabled>
                            Tidak ada data
                          </MenuItem>
                        )}
                      </Select>
                    </div>
                  </Stack>
                </>
              )}
              <Stack direction={'row'} spacing={2} mt={2}>
                <div style={{ flex: 2 }}>
                  <Typography variant="body2">Waktu Masuk</Typography>
                </div>
                <div style={{ flex: 3 }}>
                  <Typography variant="body2" color="#00000099" style={{ opacity: '0.6' }}>
                    {moment(ticketData?.data[0]?.datetime).format('lll')}
                  </Typography>
                </div>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={2}>
                <div style={{ flex: 2 }}>
                  <Typography variant="body2">Sistem Operasi</Typography>
                </div>
                <div style={{ flex: 3 }}>
                  <Typography variant="body2" color="#00000099" style={{ opacity: '0.6' }}>
                    {ticketData?.data[0]?.OS || '-'}
                  </Typography>
                </div>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={2}>
                <div style={{ flex: 2 }}>
                  <Typography variant="body2">Versi Aplikasi</Typography>
                </div>
                <div style={{ flex: 3 }}>
                  <Typography variant="body2" color="#00000099" style={{ opacity: '0.6' }}>
                    {ticketData?.data[0]?.version || '-'}
                  </Typography>
                </div>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={2}>
                <div style={{ flex: 2 }}>
                  <Typography variant="body2">Kategori</Typography>
                </div>
                <div style={{ flex: 3 }}>
                  <Typography variant="body2" color="#00000099" style={{ opacity: '0.6' }}>
                    {ticketData?.data[0]?.nameCategory || '-'}
                  </Typography>
                </div>
              </Stack>
              <Stack direction={'row'} spacing={2} mt={2}>
                <div style={{ flex: 2 }}>
                  <Typography variant="body2">Level</Typography>
                </div>
                <div style={{ flex: 3 }}>
                  <Typography variant="body2" color="#00000099" style={{ opacity: '0.6' }}>
                    {ticketData?.data[0]?.nameLevel || '-'}
                  </Typography>
                </div>
              </Stack>
              <Stack mt={3}>
                <LoadingButton
                  loading={loading.update}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  disabled={userAssign === ''}
                  onClick={() => handleUpdateTicket()}>
                  Submit
                </LoadingButton>
              </Stack>
            </Card>
          </Stack>
          <ModalChangeStatus
            showModal={showModal.show}
            done={showModal.done}
            children1={showModal.children1}
            children2={showModal.children2}
            onClose={onCloseModal}
            onConfirm={handleUpdateStatus}
          />
        </PageContainer>
      )}
    </>
  );
};

export default DetailBantuanPengguna;
