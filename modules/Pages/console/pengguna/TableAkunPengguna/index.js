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
import Switch from '@material-ui/core/Switch';
import { useRouter } from 'next/router'
import CmtObjectSummary from '@coremat/CmtObjectSummary';
import CmtAvatar from '@coremat/CmtAvatar';
import { getMediaUri } from 'helpers/stringHelper';
import { getListUsers } from 'redux/actions/userActions';

const ProfilePicture = '/images/pp.png';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  nameCell: {
    cursor: 'pointer'
  },
  noBorder: {
    borderBottom: 'none'
  }
});

function Row(props) {
  const { row } = props;
  //const [open, setOpen] = React.useState(false);
  const [status, changeStatus] = React.useState(row.isComplete == "true");
  const classes = useRowStyles();
  const router = useRouter();

  const calculatedAge = () => {
    if(row.dob) {
    var dob = new Date(row.dob);  
    var month_diff = Date.now() - dob.getTime();  
    var age_dt = new Date(month_diff);   
    var year = age_dt.getUTCFullYear();  
    var age = Math.abs(year - 1970);  
    return age;
    } else {
      return "";
    }
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {/* <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
        <TableCell className={classes.nameCell} component="th" scope="row" onClick={() => router.push('/console/pengguna/'+row.email)}>
          <CmtObjectSummary
            avatar={<CmtAvatar src={row.avatar ? getMediaUri(row.avatar) : ProfilePicture} alt={row.fullName} />}
            title={row.fullName}
            subTitle={row.email}
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
        <TableCell align="center">{row.country}</TableCell>
        <TableCell align="center">{row.roles.join(',')}</TableCell>
        <TableCell align="center">{row.latest_active}</TableCell>
        <TableCell align="center">
          <Switch
          checked={status}
          onChange={() => changeStatus(!status)}
          name="status"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
        </TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row" className={classes.noBorder}>
                        Email
                      </TableCell>
                      <TableCell className={classes.noBorder}>: {row.detail.email}</TableCell>
                      <TableCell component="th" scope="row" className={classes.noBorder}>
                        Status
                      </TableCell>
                      <TableCell className={classes.noBorder}>: {row.detail.status}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row" className={classes.noBorder}>
                        Tanggal Lahir
                      </TableCell>
                      <TableCell className={classes.noBorder}>: {row.detail.dob}</TableCell>
                      <TableCell component="th" scope="row" className={classes.noBorder}>
                      </TableCell>
                      <TableCell className={classes.noBorder}>
                        <Button variant="contained" color="primary" onClick={() => router.push('/console/pengguna/'+row.id)}>Lebih Detail</Button>
                      </TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },
}));

export default function TableAkunPengguna() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const userStore = useSelector((state) => state.userReducers)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    loadListUsers(newPage,rowsPerPage);
  };

  const handleChangeRowsPerPage = event => {
    const perPage = +event.target.value;
    setRowsPerPage(perPage);
    setPage(0);
    loadListUsers(0,perPage);
  };

  useEffect(() => {
    loadListUsers(0,10);
  }, []);

  const loadListUsers = (p,pp) => {
    console.log("masuk fungsi ini");
    dispatch(getListUsers({page:p,rowsPerPage:pp}));
  }

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
            <TableCell align="center">Jenis Akun</TableCell>
            <TableCell align="center">Terakhir Aktif</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userStore.users && userStore.users.map((row,index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
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
