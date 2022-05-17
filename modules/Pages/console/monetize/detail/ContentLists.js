import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { useRouter } from 'next/router'
import CmtObjectSummary from '@coremat/CmtObjectSummary';
import CmtAvatar from '@coremat/CmtAvatar';
import { fakeDb } from 'modules/FakeDb/fake-db';
import {fromatMoney} from 'helpers/stringHelper';

import { getListRegisteredContent } from 'redux/actions/monetizeAction';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  noBorder: {
    borderBottom: 'none'
  },
  summary: {
    '& .MuiBox-root': {
      justifyContent: 'space-between'
    }
  }
});

const {konten} = fakeDb;

function Row(props) {
  const { row } = props;
  const classes = useRowStyles();
  const router = useRouter();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell component="th" scope="row">
          <CmtObjectSummary
            avatar={<CmtAvatar color="grey" size="medium" variant="rounded" src="https://via.placeholder.com/150x150" alt={row.title} />          }
            title={row.title}
            showItemBadge={false}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            align={'horizontal'}
          />
        </TableCell>
        <TableCell align="center">{row.created}</TableCell>
        <TableCell align="center">{row.insight.views}</TableCell>
        <TableCell align="center">{row.insight.likes}</TableCell>
        <TableCell align="center">{row.insight.comments}</TableCell>
        <TableCell align="center">{row.insight.share}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">{row.id}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },
}));

export default function ContentLists() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const {contents,meta} = useSelector((state) => state.monetizeReducers)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    console.log("masuk fungsi ini")
    dispatch(getListRegisteredContent({
      search:id,
      page,
      rowsPerPage
    }))
  }, []);

  return (
    <>
      { meta &&
        <Box display="flex" justifyContent="space-between" marginBottom={4}>
            <Typography component="div" variant="colorPrimary">
              Total penerimaan biaya pendaftaran konten: Rp {fromatMoney(meta.income)}
            </Typography>
            <Typography component="div" variant="h4">
              Total pedaftaran konten: {meta.total}
            </Typography>
        </Box>
      }
      <TableContainer component={Paper} className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
            <TableCell>Konten</TableCell>
            <TableCell align="center">Waktu</TableCell>
            <TableCell align="center">Dilihat</TableCell>
            <TableCell align="center">Disukai</TableCell>
            <TableCell align="center">Komentar</TableCell>
            <TableCell align="center">Dibagikan</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contents && contents.map(row => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={contents.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </>
  );
}
