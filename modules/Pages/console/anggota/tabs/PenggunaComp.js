import React from 'react';
import { Box, makeStyles, Modal, StylesProvider, Switch, TextField, Typography } from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
  addUser: {
    color: '#AB22AF',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

// data still static
function createData(name, calories, fat, carbs) {
  return { name, calories, fat, carbs };
}

// data still static
const rows = [
  createData('Paramita', 'paramita@hyppe.id', 'Customer / Staff', false, ''),
  createData('Abraham', 'Abraham@hyppe.id', 'Customer / Manager', true, ''),
  createData('mangUcupSans', 'mangUcupSans@hyppe.id', 'Programmer', true, ''),
];

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

const PenggunaComp = () => {
  const router = useRouter();
  const classes = useStyles();
  const [page, setPage] = useState(1);

  const [openModal, setOpenModal] = React.useState(false);
  const handleCloseModal = () => setOpenModal(false);

  const TabelHeadLabel = ({ label }) => {
    return (
      <Typography component="div" variant="h4">
        {label}
      </Typography>
    );
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e, v, t) => {
    setAnchorEl(null);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    // boxShadow: 24,
    borderRadius: '7px',
    p: 7,
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
            InputProps={{
              endAdornment: (
                // <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
                // </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          mt={5}
          display="flex"
          wordWrap="nowrap"
          textAlign="center"
          className={classes.addUser}
          onClick={() => router.push('/console/anggota/add-user')}>
          <img src="/images/icons/plus-icon.svg" alt="icon" />
          <Typography component="div" variant="h6">
            TAMBAH
          </Typography>
        </Box>
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
            {rows.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="left">{row.calories}</TableCell>
                <TableCell align="left">{row.fat}</TableCell>
                <TableCell align="right">
                  <Switch checked={row.carbs} />
                </TableCell>
                <TableCell align="left">
                  {/* // here */}
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls={open ? 'long-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}>
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
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                      },
                    }}>
                    {options.map((option) => (
                      <MenuItem
                        key={option}
                        onClick={() => {
                          if (option.title === 'Hapus') {
                            setOpenModal(true);
                          } else {
                            router.push('console/anggota/edit');
                          }
                        }}>
                        <Box display="flex">
                          {option.icon}
                          <span style={{ marginLeft: '7px' }}>{option.title}</span>
                        </Box>
                      </MenuItem>
                    ))}
                    {/* modal start */}
                    <Modal
                      open={openModal}
                      onClose={handleCloseModal}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description">
                      <Box sx={style}>
                        <center>
                          <Typography id="modal-modal-title" variant="h3" component="div">
                            Hapus Anggota
                          </Typography>
                        </center>
                        <Box mt={3} textAlign="center">
                          Kamu akan menghapus anggota untuk Hyppe Console
                        </Box>
                        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
                          <Button
                            style={{
                              // background: 'rgb(170, 34, 175)',
                              color: 'rgba(0, 0, 0, 0.6)',
                              border: 'none',
                              padding: '5px 10px',
                              marginTop: '10px',
                              fontWeight: 'bold',
                            }}
                            onClick={() => setOpenModal(false)}>
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
                            }}>
                            KONFIRMASI
                          </Button>
                        </Stack>
                      </Box>
                    </Modal>
                    {/* modal end */}
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="mt-6 flex flex-row justify-content-center">
        <Pagination page={page} onChange={(e, value) => setPage(value)} count={10} />
      </div>
    </>
  );
};

export default PenggunaComp;
