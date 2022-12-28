import React, { useEffect } from 'react';
import { Box, Dialog, DialogContent, makeStyles, Slide, Snackbar, TextField, Typography } from '@material-ui/core';
import { Alert, Button, CircularProgress, Pagination, Stack } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/router';

// -----
import Menu from '@mui/material/Menu';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { useGetGroupQuery, useDeleteGroupMutation } from 'api/console/group';
import Link from 'next/link';
import TableDataSpinner from 'components/common/loading/tableDataSpinner';
import { useGetDivisiQuery, useDeleteDivisiMutation } from 'api/console/divisi';
import { Add } from '@material-ui/icons';
import { toast, Toaster } from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
  addUser: {
    color: '#AB22AF',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const options = [
  {
    title: 'Ubah',
    icon: <img src="/images/icons/edit.svg" alt="icon edit" />,
  },
  {
    title: 'Hapus',
    icon: <img src="/images/icons/trash.svg" alt="icon edit" />,
  },
];

const ITEM_HEIGHT = 48;

const Position = () => {
  const router = useRouter();

  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [countPages, setCountPages] = useState(Number);
  const [payload, setPayload] = useState({
    skip: 0,
    limit: 10,
    search: search,
  });
  const [id, setId] = useState('');
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  /////// notif
  const [state, setState] = React.useState({
    openNotif: false,
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal, openNotif } = state;

  const handleClick = (newState) => () => {
    setState({ openNotif: true, ...newState });
  };

  const handleCloseNotif = () => {
    setState({ ...state, openNotif: false });
  };
  /////// notif

  const [openDialog, setOpenDialog] = React.useState(false);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickThreeDotMenu = (event, row) => {
    setId(row._id);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e, v, t) => {
    setAnchorEl(null);
  };

  const onEnterSearch = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setPage(1);
      setPayload((prev) => {
        return {
          ...prev,
          skip: 0,
          limit: 10,
          search: search,
        };
      });
    }
  };
  const handleSearchIcon = () => {
    setPayload((prev) => {
      return {
        ...prev,
        skip: 0,
        limit: 10,
        search: search,
      };
    });
  };

  const { data: dataDivision, isFetching } = useGetDivisiQuery(payload);
  console.log('dataDivision:', dataDivision);

  const count = dataDivision?.totalRow / 10;

  useEffect(() => {
    setCountPages(Math.ceil(count));
  });

  const [deleteDivisi] = useDeleteDivisiMutation();

  const handlePagination = (e, value) => {
    setPage(value);
    setPayload((prev) => {
      return {
        ...prev,
        skip: (value - 1) * 10,
      };
    });
  };

  const handleDeleteDivisi = () => {
    deleteDivisi(id).then((res) => {
      console.log(res);
      if (res?.error) {
        toast.error('Gagal menghapus divisi yang sedang digunakan', { duration: 3000 });
      } else {
        toast.success('Berhasil menghapus divisi', { duration: 3000 });
      }
    });
    setOpenDialog(false);
  };

  const handleMenuTable = (option) => {
    setAnchorEl(null);
    if (option.title === 'Hapus') {
      setOpenDialog(true);
    }
    if (option.title === 'Ubah') {
      router.push(`${router.pathname}/edit-divisi/${id}`);
    }
  };

  const TabelHeadLabel = ({ label }) => {
    return (
      <Typography component="div" variant="h4">
        {label}
      </Typography>
    );
  };

  useEffect(() => {
    if (router.query.created || router.query.edited) {
      setState({ openNotif: true, vertical: 'top', horizontal: 'center' });
    }
  }, [router.query.created, router.query.edited]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center" margin="20px 0 24px">
        <Box style={{ background: 'rgba(255, 255, 255, 1)', width: '400px' }}>
          <TextField
            fullWidth
            variant="outlined"
            label="Cari divisi"
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={onEnterSearch}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon onClick={handleSearchIcon} />
                </IconButton>
              ),
            }}
            style={{ backgroundColor: 'transparent' }}
          />
        </Box>
        <Button
          variant="text"
          color="secondary"
          sx={{ '&:hover': { background: 'transparent' } }}
          style={{ fontWeight: 'bold', fontFamily: 'Lato', height: 56, width: 100 }}
          onClick={() => router.push('/anggota/add-divisi')}
          disabled={!access.find((item) => item?.nameModule === 'member_divistion')?.acces?.createAcces}>
          <Add style={{ fontSize: 16, marginRight: 5 }} /> Tambah
        </Button>
      </Stack>
      <TableContainer component={Paper} style={{ marginTop: '10px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow style={{ height: 65 }}>
              <TableCell align="left" style={{ paddingLeft: 30, width: 350 }}>
                <TabelHeadLabel label="Divisi" />
              </TableCell>
              <TableCell align="left">
                <TabelHeadLabel label="Description" />
              </TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <TableCell colSpan={8}>
                <Stack direction="column" alignItems="center" justifyContent="center" height={468} spacing={2}>
                  <CircularProgress color="secondary" />
                  <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                </Stack>
              </TableCell>
            ) : dataDivision?.data?.length >= 1 ? (
              dataDivision?.data?.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left" style={{ paddingLeft: 30, width: 350 }}>
                    {row.nameDivision}
                  </TableCell>
                  <TableCell align="left">{row.desc || '-'}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      id="long-button"
                      aria-controls={open ? 'long-menu' : undefined}
                      aria-expanded={open ? 'true' : undefined}
                      aria-haspopup="true"
                      onClick={(e) => handleClickThreeDotMenu(e, row)}
                      disabled={!access.find((item) => item?.nameModule === 'member_divistion')?.acces?.updateAcces}>
                      {/* <MoreVertIcon /> */}
                      <img src="/images/icons/triple-dot.svg" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Divisi tidak ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
            boxShadow: 'none',
            border: '1px solid rgba(224, 224, 224, 1)',
          },
        }}>
        {options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleMenuTable(option)}
            disabled={
              option.title === 'Ubah'
                ? !access.find((item) => item?.nameModule === 'member_divistion')?.acces?.updateAcces
                : !access.find((item) => item?.nameModule === 'member_divistion')?.acces?.deleteAcces
            }>
            <Box display="flex">
              {option.icon}
              <span style={{ marginLeft: '7px' }}>{option.title}</span>
            </Box>
          </MenuItem>
        ))}
      </Menu>
      {/* // this is only appear when openDialog true. start */}
      {openDialog && (
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenDialog(false)}
          aria-describedby="alert-dialog-slide-description">
          <DialogContent>
            <Box p={4}>
              <center>
                <Typography id="modal-modal-title" variant="h3" component="div">
                  Hapus Jabatan
                </Typography>
              </center>
              <Box mt={3} textAlign="center">
                Kamu akan menghapus Divisi untuk Hyppe Console
              </Box>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} style={{ marginTop: '15px' }}>
                <Button
                  style={{
                    // background: 'rgb(170, 34, 175)',
                    color: 'rgba(0, 0, 0, 0.6)',
                    border: 'none',
                    padding: '5px 10px',
                    marginTop: '10px',
                    fontWeight: 'bold',
                  }}
                  onClick={() => setOpenDialog(false)}>
                  BATAL
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    background: 'rgb(170, 34, 175)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    marginTop: '10px',
                  }}
                  onClick={handleDeleteDivisi}>
                  KONFIRMASI
                </Button>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
      )}

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={openNotif}
        onClose={handleCloseNotif}
        key={vertical + horizontal}>
        <Alert severity="success">
          {router.query.created && 'Berhasil membuat data'}
          {router.query.edited && 'Berhasil edit data'}
        </Alert>
      </Snackbar>

      {dataDivision?.data?.length >= 1 && !isFetching && (
        <div className="mt-6 flex flex-row justify-content-center">
          <Pagination page={page} onChange={handlePagination} count={countPages} />
        </div>
      )}
      <Toaster />
    </>
  );
};

export default Position;
