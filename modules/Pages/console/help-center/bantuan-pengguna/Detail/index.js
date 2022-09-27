import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Avatar, Button, Card, Chip, Divider, Grow, Link, Paper, Popper, Typography } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import React, { useRef, useState, useEffect } from 'react';
import { Stack } from '@mui/material';
import Ckeditor from 'react-ckeditor-component/lib/ckeditor';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Breadcrumbs from '../BreadCrumb/index';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuList from '@material-ui/core/MenuList';
import ModalChangeStatus from '../Modal';
import GetChipColor from 'helpers/getChipColor';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { FolderShared } from '@material-ui/icons';
import DownloadIcon from '@material-ui/icons/CloudDownload'

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Bantuan Pengguna', link: '/console/help-center/bantuan-pengguna' },
  { label: 'Detil Masalah', isActive: true },
];

const useStyles = makeStyles((theme) => ({
  scrollbarRoot: {
    height: 500,
    marginRight: -24,
    paddingRight: 24,
    marginLeft: -24,
    paddingLeft: 24,
    marginTop: 13,
    paddingTop: 5,
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
  },
}));

const DetailBantuanPengguna = () => {
  const [dummyData, setDummyData] = useState([
    { 'Nomor Tiket': '004/22/08/22', type: 'text' },
    { Sumber: 'Formulir', type: 'text' },
    { Pengirim: 'stephanie@example.com', type: 'text' },
    { 'Ditangani Oleh': 'Paramita S', type: 'chip' },
    { 'Divisi Pendukung': 'Paramita S', type: 'select' },
    { 'Penerima Tugas': 'Paramita S', type: 'select' },
    { 'Waktu Masuk': '-', type: 'text' },
    { 'Percakapan Terakhir': 'Paramita S', type: 'text' },
    { 'Sistem Operasi': 'IOS', type: 'text' },
    { 'Versi Aplikasi': 'Paramita S', type: 'text' },
    { Kategori: 'Akun & Verifikasi', type: 'text' },
    { Level: '4', type: 'text' },
  ]);
  const router = useRouter();
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);
  const [status, setStatus] = useState('BARU');
  const [buttonColor, setButtonColor] = useState('#E92A63');
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(1);
  const [showModal, setShowModal] = useState({
    show: false,
    type: 'Baru',
    children1: null,
    children2: null,
  });
  const classes = useStyles();

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
    if (event.target.id.toLowerCase() === 'baru') {
      console.log(showModal.type);
      const child1 = showModal?.type?.repeat(1);
      setShowModal({
        show: true,
        type: 'Baru',
        children1: <Chip label={child1} style={GetChipColor(child1)} />,
        children2: <Chip label={event.target.id} style={GetChipColor(event.target.id)} />,
      });
    } else if (event.target.id.toLowerCase() === 'dalam proses') {
      const child1 = showModal.type.repeat(1);
      setShowModal({
        show: true,
        type: 'Dalam Proses',
        children1: <Chip label={child1} style={GetChipColor(child1)} />,
        children2: <Chip label={event.target.id} style={GetChipColor(event.target.id)} />,
      });
    } else if (event.target.id.toLowerCase() === 'selesai') {
      setShowModal({ show: true, type: 'Selesai' });
    } else {
      setShowModal({ show: true, type: 'Tidak Selesai' });
    }
    setOpen(false);
  };

  const onConfirmModal = () => {
    switch (showModal.type) {
      case 'Baru':
        setButtonColor('#E92A63');
        setStatus(showModal.type);
        break;
      case 'Dalam Proses':
        setButtonColor('#FF8C00');
        setStatus(showModal.type);
        break;
      case 'Selesai':
        setButtonColor('#8DCD03');
        setStatus(showModal.type);
        break;
      case 'Tidak Selesai':
        setButtonColor('#7C7C7C');
        setStatus(showModal.type);
        break;
      default:
        break;
    }
    onCloseModal();
  };

  const onBackHandler = () => {
    router.push('/console/help-center/bantuan-pengguna');
  };

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

  return (
    <>
      <PageContainer>
        <Stack direction={'column'} spacing={2} mb={3}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Link href="/" onClick={onBackHandler} style={{ cursore: 'pointer' }}>
            <Stack direction={'row'}>
              <Stack direction={'column'} justifyContent={'center'}>
                <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '15px', fontWeight: 'bold' }} />
              </Stack>
              <Stack>
                <Typography variant="h1" style={{ color: 'black' }}>
                  Kembali
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <div style={{ flex: 2 }}>
            <Stack direction={'column'} spacing={2}>
              <Typography variant="h1">Tidak Bisa Login dengan Gmail</Typography>
              <Typography variant="subtitle2">
                Icon Gmail pada halaman login tidak bisa saya klik saat ingin login menggunakan akun Gmail saya
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Chip
                  label="Filename.zip"
                  deleteIcon={<MoreIcon />}
                  onDelete
                  avatar={<Avatar>I</Avatar>}
                  style={{ marginRight: '1em' }}
                />
                <Chip
                  label="Filename.zip"
                  deleteIcon={<MoreIcon />}
                  onDelete
                  avatar={<Avatar>I</Avatar>}
                  style={{ marginRight: '1em' }}
                />
                <Stack direction={'column'} justifyContent={'center'}>
                  <Typography variant="subtitle2" style={{ color: 'rgba(0, 0, 0, 0.38)' }}>
                    +1 Lagi
                  </Typography>
                </Stack>
              </div>
            </Stack>
            <Divider style={{ margin: '1.3em 0px 1.3em 0px' }} />

            <div>
              <Typography variant="h3">Aktifitas</Typography>
              <Stack my={1} direction={'row'}>
                <Button
                  variant={tab === 1 ? 'contained' : 'text'}
                  size="small"
                  onClick={() => setTab(1)}
                  style={{ elevation: 0, boxShadow: 'none', marginRight: '10px' }}>
                  Pesan
                </Button>
                <Button
                  variant={tab === 2 ? 'contained' : 'text'}
                  size="small"
                  onClick={() => setTab(2)}
                  style={{ elevation: 0, boxShadow: 'none', marginRight: '10px' }}>
                  Komentar
                </Button>
                <Button
                  variant={tab === 3 ? 'contained' : 'text'}
                  size="small"
                  onClick={() => setTab(3)}
                  style={{ elevation: 0, boxShadow: 'none', marginRight: '10px' }}>
                  Riwayat
                </Button>
              </Stack>

              <PerfectScrollbar className={classes.scrollbarRoot}>
                {/* <div> */}
                <div>
                  <Stack direction={'row'} justifyContent={'center'}>
                    <Card style={{ padding: '5px', position: 'relative', bottom: -15 }}>
                      <center>
                        <Typography variant="body2">23/08/22</Typography>
                      </center>
                    </Card>
                  </Stack>

                  <Card style={{ padding: '3em 1.5em', backgroundColor: 'transparent', boxShadow: 'none' }}>
                    <Stack spacing={3}>
                      <Typography variant="body2">Hi Stephanie!</Typography>
                      <Typography variant="body2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat.{' '}
                      </Typography>
                    </Stack>
                    <Stack mt={3}>
                      <Divider variant="fullWidth" light />
                      <Stack direction={'row'} mt={1}>
                        <div>
                          <Chip
                            label="Filename.zip"
                            deleteIcon={<DownloadIcon />}
                            onDelete
                            avatar={<FolderShared />}
                            style={{ marginRight: '1em' }}
                          />
                        </div>

                        <div>
                          <Chip
                            label="Filename.zip"
                            deleteIcon={<DownloadIcon />}
                            onDelete
                            avatar={<FolderShared />}
                            style={{ marginRight: '1em' }}
                          />
                        </div>
                      </Stack>
                    </Stack>
                  </Card>
                </div>
                <div>
                  <Stack direction={'row'} justifyContent={'center'}>
                    <Card style={{ padding: '5px', position: 'relative', bottom: -15 }}>
                      <center>
                        <Typography variant="body2">Hari Ini</Typography>
                      </center>
                    </Card>
                  </Stack>

                  <Card style={{ padding: '3em 1.5em' }}>
                    <Stack spacing={3}>
                      <Typography variant="body2">Hi there!</Typography>
                      <Typography variant="body2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                        et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
                        qui officia deserunt mollit anim id est laborum."
                      </Typography>
                    </Stack>
                    <Stack mt={3}>
                      <Divider variant="fullWidth" light />
                    </Stack>
                  </Card>
                </div>
                <Stack mt={3}>
                  <Ckeditor
                    config={{
                      toolbarLocation: 'bottom',
                      toolbarGroups: [
                        { name: 'document', groups: ['mode', 'document', 'doctools'] },
                        { name: 'clipboard', groups: ['clipboard', 'undo'] },
                        { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                        { name: 'forms', groups: ['forms'] },
                        { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                        { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                        { name: 'links', groups: ['links'] },
                        { name: 'insert', groups: ['Image', 'Table'] },
                        { name: 'styles', groups: ['styles'] },
                        { name: 'colors', groups: ['colors'] },
                        { name: 'tools', groups: ['tools'] },
                        { name: 'others', groups: ['others'] },
                        { name: 'about', groups: ['about'] },
                      ],
                      removeButtons:
                        'Subscript,Superscript,Strike,Save,Templates,NewPage,ExportPdf,Preview,Print,PasteFromWord,PasteText,Paste,Copy,Cut,Redo,Undo,Find,Replace,SelectAll,Form,Scayt,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,BulletedList,NumberedList,Outdent,CreateDiv,Indent,Blockquote,BidiLtr,BidiRtl,Language,HorizontalRule,Table,Anchor,Smiley,SpecialChar,PageBreak,Iframe,Format,Styles,Font,FontSize,Maximize,TextColor,About,ShowBlocks,BGColor,Unlink,Italic,Bold,Underline,',
                    }}
                    // activeClass={classes.replyDialogEditor}
                    // content={content}
                    // events={{
                    //   change: onChangeBody,
                    // }}
                  />
                </Stack>
              </PerfectScrollbar>
              {/* </div> */}
            </div>
          </div>

          <Card style={{ flex: 1, padding: '2em' }}>
            <Button
              ref={anchorRef}
              variant="contained"
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              onClick={handleToggle}
              style={{ backgroundColor: buttonColor, color: '#FFFFFF' }}
              aria-haspopup="true">
              {status}
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal>
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{ transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom' }}>
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}>
                        <MenuItem id="Baru" onClick={handleClose}>
                          Baru
                        </MenuItem>
                        <MenuItem id="Dalam Proses" onClick={handleClose}>
                          Dalam Proses
                        </MenuItem>
                        <MenuItem id="Selesai" onClick={handleClose}>
                          Selesai
                        </MenuItem>
                        <MenuItem id="Tidak Selesai" onClick={handleClose}>
                          Tidak Selesai
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
            {dummyData?.map((el, i) => {
              if (el.type === 'text') {
                return (
                  <Stack direction={'row'} spacing={1} mt={2} key={i}>
                    <div style={{ flex: 1 }}>
                      <Typography variant="body2">{Object.keys(el)[0]}</Typography>
                    </div>
                    <div style={{ flex: 2 }}>
                      <Typography variant="body2" color="#00000099" style={{ opacity: '0.6' }}>
                        {el[`${Object.keys(el)[0]}`]}
                      </Typography>
                    </div>
                  </Stack>
                );
              } else if (el.type === 'chip') {
                return (
                  <Stack direction={'row'} spacing={1} mt={2} key={i}>
                    <Stack direction={'column'} justifyContent={'center'} flex={1}>
                      <Typography variant="body2">{Object.keys(el)[0]}</Typography>
                    </Stack>
                    <div style={{ flex: 2 }}>
                      <Chip label={el[`${Object.keys(el)[0]}`]} Filled />
                    </div>
                  </Stack>
                );
              } else if (el.type === 'select') {
                return (
                  <Stack direction={'row'} spacing={1} mt={2} key={i}>
                    <Stack direction={'column'} justifyContent={'center'} flex={1}>
                      <Typography variant="body2">{Object.keys(el)[0]}</Typography>
                    </Stack>
                    <div style={{ flex: 2 }}>
                      <FormControl sx={{ m: 1, minWidth: '50%' }} size="small">
                        <Select displayEmpty inputProps={{ 'aria-label': 'Without label' }}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Stack>
                );
              }
            })}
            <Stack mt={3}>
              <Button variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Stack>
          </Card>
        </Stack>
        <ModalChangeStatus
          showModal={showModal.show}
          type={showModal.type}
          children1={showModal.children1}
          children2={showModal.children2}
          onClose={onCloseModal}
          onConfirm={onConfirmModal}
        />
      </PageContainer>
    </>
  );
};

export default DetailBantuanPengguna;
