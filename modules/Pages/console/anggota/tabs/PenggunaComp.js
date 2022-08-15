import React, { useEffect } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles,
  Modal,
  Slide,
  StylesProvider,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core';
import { Button, Pagination, Stack } from '@mui/material';
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
import { useGetAnggotaQuery, useDeleteAnggotaMutation } from 'api/console/getUserHyppe';
import SpinnerLoading from 'components/common/loading/spinner';
import TableDataSpinner from 'components/common/loading/tableDataSpinner';

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
    value: 'ubah',
  },
  {
    title: 'Hapus',
    icon: <img src="/images/icons/trash.svg" alt="icon edit" />,
    value: 'hapus',
  },
];

const ITEM_HEIGHT = 48;

const PenggunaComp = () => {
  const router = useRouter();
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState({
    skip: 0,
    limit: 10,
  });
  const [countPages, setCountPages] = useState(Number);
  const [search, setSearch] = useState('');
  const [searchByEmail, setSearchByEmail] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [userSelectedEmail, setUserSelectedEmail] = useState('');
  const [jabatan, setJabatan] = useState('');

  const open = Boolean(anchorEl);
  const { data: dataAnggota, isLoading } = useGetAnggotaQuery(payload);

  const handeOpenMenu = (event, row) => {
    setUserSelectedEmail(row.email);
    setJabatan(row.group);
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const count = dataAnggota?.totalRow / 10;

  useEffect(() => {
    setCountPages(Math.ceil(count));
  });

  const handlePagination = (e, value) => {
    setPage(value);
    setPayload((prev) => {
      return {
        ...prev,
        skip: (value - 1) * 10,
      };
    });
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
          searchemail: searchByEmail,
        };
      });
    }
  };

  const handleSearchIcon = () => {
    setPage(1);
    setPayload((prev) => {
      return {
        ...prev,
        skip: 0,
        limit: 10,
        search: search,
        searchemail: searchByEmail,
      };
    });
  };

  // dialog
  const [openDialog, setOpenDialog] = React.useState(false);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const TabelHeadLabel = ({ label }) => {
    return (
      <Typography component="div" variant="h4">
        {label}
      </Typography>
    );
  };

  const [deleteAnggota, {}] = useDeleteAnggotaMutation();

  const handleSelectedAction = (e, row) => {
    const { myValue } = e.currentTarget.dataset;
    if (myValue === 'hapus') setOpenDialog(true);
    if (myValue === 'ubah') router.push(`/console/profile-console?email=${userSelectedEmail}`);
    setAnchorEl(null);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box style={{ background: 'rgba(255, 255, 255, 1)', width: '400px' }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            label="Cari nama / email"
            onChange={(e) => {
              setSearchByEmail(e.target.value);
              setSearch(e.target.value);
            }}
            onKeyPress={onEnterSearch}
            InputProps={{
              endAdornment: (
                // <InputAdornment>
                <IconButton>
                  <SearchIcon onClick={handleSearchIcon} />
                </IconButton>
                // </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* {isLoading ? <TableDataSpinner /> : 'sudah selesai loading'} */}
      </Stack>
      <TableContainer component={Paper} style={{ marginTop: '10px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <TabelHeadLabel label="Nama" />
              </TableCell>
              <TableCell align="left">
                <TabelHeadLabel label="Email" />
              </TableCell>
              <TableCell align="left">
                <TabelHeadLabel label="Jabatan" />
              </TableCell>
              <TableCell align="right">
                <TabelHeadLabel label="Status" />
              </TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataAnggota?.data?.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.group ? row.group : 'kosong'}</TableCell>
                <TableCell align="right">
                  <Switch checked={row.status} />
                </TableCell>
                <TableCell align="left">
                  {/* why i selected email when open icon? */}
                  {/* i face problem when set the data payload (try it dude its weirdd) */}
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={(e) => handeOpenMenu(e, row)}>
                    {/* <MoreVertIcon /> */}
                    <img src="/images/icons/triple-dot.svg" />
                  </IconButton>
                  <Menu
                    id="long-menu"
                    MenuListProps={{
                      'aria-labelledby': 'long-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseMenu}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                        boxShadow: 'none',
                        border: '1px solid black',
                      },
                    }}>
                    {options.map((option) => (
                      <MenuItem key={option} onClick={(e) => handleSelectedAction(e, row)} data-my-value={option.value}>
                        <Box display="flex">
                          {option.icon}
                          <span style={{ marginLeft: '7px' }}>{option.title}</span>
                        </Box>
                      </MenuItem>
                    ))}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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
                  Hapus jabatan
                </Typography>
              </center>
              <Box mt={3} textAlign="center">
                Kamu akan menghapus jabatan untuk email <br />
                <span style={{ color: 'rgb(170, 34, 175)' }}>{userSelectedEmail}</span>
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
                  onClick={() => {
                    deleteAnggota(userSelectedEmail);
                    setOpenDialog(false);
                  }}>
                  KONFIRMASI
                </Button>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
      )}
      {/* // this is only appear when openDialog true end */}

      <div className="mt-6 flex flex-row justify-content-center">
        <Pagination page={page} onChange={handlePagination} count={countPages} />
      </div>
    </>
  );
};

export default PenggunaComp;
