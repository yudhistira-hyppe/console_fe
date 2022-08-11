import React from 'react';
import {
  Box,
  Dialog,
  DialogContent,
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
import { useGetGroupQuery, useDeleteGroupMutation } from 'api/console/group';

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
  createData('Customer Care / Head'),
  createData('Customer Care / Manager'),
  createData('Product Analyst / Head'),
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
  const [search, setSearch] = useState('');
  const [payload, setPayload] = useState({
    skip: 0,
    limit: 10,
    search: search,
  });
  const [id, setId] = useState('');
  console.log('payload:', payload);

  const [openDialog, setOpenDialog] = React.useState(false);
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  const TabelHeadLabel = ({ label }) => {
    return <Typography> {label}</Typography>;
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e, v, t) => {
    setAnchorEl(null);
  };
  const onEnterSearch = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setPayload((prev) => {
        return {
          ...prev,
          search: search,
        };
      });
    }
  };
  const handleSearchIcon = () => {
    setPayload((prev) => {
      return {
        ...prev,
        search: search,
      };
    });
  };
  const { data: dataPosition } = useGetGroupQuery(payload);
  const [deleteGroup, { isError, isSuccess }] = useDeleteGroupMutation();

  const handleDeleteGroup = () => {
    deleteGroup(id);
    setOpenDialog(false);
  };

  const handlePagination = (e, value) => {
    setPage(value);
    setPayload((prev) => {
      return {
        ...prev,
        skip: (value - 1) * 10,
      };
    });
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
            onChange={(e) => setSearch(e.target.value)}
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
        <Box
          mt={5}
          display="flex"
          wordWrap="nowrap"
          textAlign="center"
          className={classes.addUser}
          onClick={() => router.push('/console/anggota/add-position')}>
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
                <TabelHeadLabel
                  label={
                    <Typography component="div" variant="h4">
                      Jabatan
                    </Typography>
                  }
                />
              </TableCell>
              <TableCell align="right">
                <TabelHeadLabel />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataPosition?.data?.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {console.log('row:', row?._id)}
                  {row.nameGroup}
                </TableCell>
                <TableCell align="right">
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
                          setId(row?._id);
                          if (option.title === 'Hapus') {
                            setOpenDialog(true);
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
                  Hapus Jabatan
                </Typography>
              </center>
              <Box mt={3} textAlign="center">
                Kamu akan menghapus Jabatan untuk Hyppe Console
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
                  onClick={handleDeleteGroup}>
                  KONFIRMASI
                </Button>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
      )}
      {/* // this is only appear when openDialog true end */}

      <div className="mt-6 flex flex-row justify-content-center">
        <Pagination page={page} onChange={handlePagination} count={10} />
      </div>
    </>
  );
};

export default PenggunaComp;
