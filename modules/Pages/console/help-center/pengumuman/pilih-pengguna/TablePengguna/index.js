import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router';
import CmtObjectSummary from '@coremat/CmtObjectSummary';
import CmtAvatar from '@coremat/CmtAvatar';

import { getListUserPengumuman, changeCheckedPengguna } from 'redux/actions/helpCenterAction';
import { Box, Button, Checkbox } from '@material-ui/core';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  nameCell: {
    cursor: 'pointer',
  },
  noBorder: {
    borderBottom: 'none',
  },
});

function Row(props) {
  const dispatch = useDispatch();
  const { row } = props;
  const classes = useRowStyles();
  const router = useRouter();

  const calculatedAge = () => {
    if (row.dob) {
      var dob = new Date(row.dob);
      var month_diff = Date.now() - dob.getTime();
      var age_dt = new Date(month_diff);
      var year = age_dt.getUTCFullYear();
      var age = Math.abs(year - 1970);
      return age;
    } else {
      return '';
    }
  };

  const changeCheckedState = (checked) => {
    dispatch(changeCheckedPengguna({ data: row, status: checked }));
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="center">
          <Checkbox
            checked={row.check}
            onChange={(e) => changeCheckedState(e.target.checked)}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </TableCell>
        <TableCell
          className={classes.nameCell}
          component="th"
          scope="row"
          onClick={() => router.push('/console/monetize/pendaftaran_konten/' + row.email)}>
          <CmtObjectSummary
            avatar={<CmtAvatar src="https://via.placeholder.com/40x40" alt={row.name} />}
            title={row.name}
            showItemBadge={false}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            align={'horizontal'}
          />
        </TableCell>
        <TableCell align="center">{row.gender}</TableCell>
        <TableCell align="center">{calculatedAge()}</TableCell>
        <TableCell align="center">{row.location}</TableCell>
        <TableCell align="center">{row.interest.join(',')}</TableCell>
        <TableCell align="center">{row.latest_active}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },
  btnSecondary: {
    marginLeft: 8,
  },
  boxAction: {
    justifyContent: 'end',
  },
  btnSelectAll: {
    marginTop: 8,
  },
}));

export default function TablePengguna() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { usersPengumuman } = useSelector((state) => state.helpCenterReducers);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadListUsers(newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const perPage = +event.target.value;
    setRowsPerPage(perPage);
    setPage(0);
    loadListUsers(0, perPage);
  };

  useEffect(() => {
    loadListUsers(0, 10);
  }, []);

  const loadListUsers = (p, pp) => {
    console.log('masuk fungsi ini');
    dispatch(getListUserPengumuman({ page: p, rowsPerPage: pp }));
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Nama</TableCell>
              <TableCell align="center">Jenis Kelamin</TableCell>
              <TableCell align="center">Umur</TableCell>
              <TableCell align="center">Lokasi</TableCell>
              <TableCell align="center">Minat</TableCell>
              <TableCell align="center">Terakhir Aktif</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{usersPengumuman && usersPengumuman.map((row, index) => <Row key={index} row={row} />)}</TableBody>
        </Table>
      </TableContainer>
      <Button className={classes.btnSelectAll} variant="contained" color="primary" onClick={() => null}>
        Pilih Semua
      </Button>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={usersPengumuman.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Box className={classes.boxAction} display="flex">
        <Button variant="outlined" color="primary" onClick={() => router.push('/console/help-center/pengumuman/create')}>
          Batal
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.btnSecondary}
          onClick={() => router.push('/console/help-center/pengumuman/create')}>
          Selesai
        </Button>
      </Box>
    </>
  );
}
