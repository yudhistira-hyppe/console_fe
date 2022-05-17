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
import CmtImage from '@coremat/CmtImage';
import { Box, Typography } from '@material-ui/core';
import { getMediaUri } from 'helpers/stringHelper';

const ProfilePicture = '/images/pp.png';
const iconWarningPurple = '/images/icons/warning_purple.png';

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

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell className={classes.nameCell} component="th" scope="row" onClick={() => router.push('/console/monetize/voucher/'+row.email)}>
          <CmtObjectSummary
            avatar={<CmtAvatar src={row.avatar ? getMediaUri(row.avatar) : ProfilePicture} alt={row.fullName} />}
            title={row.fullName}
            showItemBadge={false}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            align={'horizontal'}
          />
        </TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">{row.location?row.location:'-'}</TableCell>
        <TableCell align="center">
          <Box className={classes.infoJumlahVoucher}>
            <Typography component="div" variant="h5">
              {row.voucher?row.voucher:0}
            </Typography>
            <CmtImage src={iconWarningPurple} /> 
          </Box>
        </TableCell>
        <TableCell align="center">
          {/* {row.category.join(',')} */}
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

export default function TablePengguna({data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}) {
  const classes = useStyles();
  
  return (
    <>
      <TableContainer className={classes.root}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {/* <TableCell /> */}
            <TableCell>Nama</TableCell>
            <TableCell align="center">Email</TableCell>
            <TableCell align="center">Lokasi</TableCell>
            <TableCell align="center">Jumlah Voucher</TableCell>
            <TableCell align="center">Kategori</TableCell>
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
