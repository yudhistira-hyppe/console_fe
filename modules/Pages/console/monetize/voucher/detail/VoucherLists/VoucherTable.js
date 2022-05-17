import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { useRouter } from 'next/router'
import CmtObjectSummary from '@coremat/CmtObjectSummary';
import CmtAvatar from '@coremat/CmtAvatar';
import { fromatMoney,fromatDate } from 'helpers/stringHelper';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  nameCell: {
    cursor: 'pointer'
  },
  infoJumlahVoucher: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTypography-h5': {
      paddingRight: 8
    }
  }
});

function Row(props) {
  const { row } = props;
  const classes = useRowStyles();
  const router = useRouter();

  let dateParsedUsedAt = '-';
  if(row.used_at && row.used_at != '') {
    dateParsedUsedAt = fromatDate(row.used_at);
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="center">{row.code}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">Rp {fromatMoney(row.amount)}</TableCell>
        <TableCell align="center">{dateParsedUsedAt}</TableCell>
        <TableCell align="center">
            { row.used_for && 
                <CmtObjectSummary
                    avatar={<CmtAvatar color="grey" size="medium" variant="rounded" src="https://via.placeholder.com/150x150" alt={row.used_for.title} />          }
                    title={row.used_for.title}
                    showItemBadge={false}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    align={'horizontal'}
              />
            }
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },
}));

export default function VoucherTable({data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}) {
  const classes = useStyles();
  
  return (
    <>
      <TableContainer className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
            <TableCell>Kode Voucher</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Nominal</TableCell>
            <TableCell align="center">Tanggal Digunakan</TableCell>
            <TableCell align="center">Digunakan Pada</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row,index) => (
            <Row key={index} row={row} />
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
