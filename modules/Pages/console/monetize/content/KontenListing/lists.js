import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
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
import { fromatMoney } from 'helpers/stringHelper';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  noBorder: {
    borderBottom: 'none'
  }
});

function Row(props) {
  const { row } = props;
  const classes = useRowStyles();
  const router = useRouter();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        {/* <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> */}
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
        <TableCell align="center">{"Rp " + fromatMoney(row.price)}</TableCell>
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

export default function KontenListingTable({data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}) {
  const classes = useStyles();

  return (
    <>
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
            <TableCell align="center">Harga</TableCell>
            <TableCell align="center">ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map(row => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[10, 25, 100]}
      component="div"
      count={data.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
    </>
  );
}
