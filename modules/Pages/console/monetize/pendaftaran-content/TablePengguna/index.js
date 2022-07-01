import React, { useEffect } from 'react';
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

import { getListRegisteredUsers } from 'redux/actions/monetizeAction';

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

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
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
}));

export default function TablePengguna() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const userStore = useSelector((state) => state.monetizeReducers);

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
    dispatch(getListRegisteredUsers({ page: p, rowsPerPage: pp }));
  };

  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              {/* <TableCell /> */}
              <TableCell>Nama</TableCell>
              <TableCell align="center">Jenis Kelamin</TableCell>
              <TableCell align="center">Umur</TableCell>
              <TableCell align="center">Lokasi</TableCell>
              <TableCell align="center">Minat</TableCell>
              <TableCell align="center">Terakhir Aktif</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{userStore.users && userStore.users.map((row, index) => <Row key={index} row={row} />)}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={userStore.users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
