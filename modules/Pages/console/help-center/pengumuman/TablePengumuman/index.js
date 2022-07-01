import React from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import { IconButton, Typography } from '@material-ui/core';
import CmtDropdownMenu from '@coremat/CmtDropdownMenu';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const actionLists = [
  {
    label: 'Ubah',
    value: 'change',
  },
  {
    label: 'Hapus',
    value: 'delete',
  },
];

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
    '& .MuiTypography-h5': {
      fontWeight: 'bold',
    },
  },
  nameCell: {
    cursor: 'pointer',
  },
  infoJumlahVoucher: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiTypography-h5': {
      paddingRight: 8,
    },
  },
  chipsRoot: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});

const useChipStyles = makeStyles({
  root: {
    backgroundColor: '#21212114',
    padding: '6px 16px',
    borderRadius: 16,
    marginBottom: 8,
    marginRight: 8,
    color: 'rgba(0, 0, 0, 0.7)',
  },
});

function StatusText(props) {
  const { title } = props;
  let statusText = '';
  let statusColor = '#000000';
  console.log(title);
  switch (title) {
    case 0:
      statusText = 'Draf';
      statusColor = '#B70505';
      break;
    case 1:
      statusText = 'Tayang';
      statusColor = '#00A825';
      break;
    case 2:
      statusText = 'Dijadwalkan';
      statusColor = '#0096EB';
      break;
  }
  return (
    <React.Fragment>
      <Typography component="div" variant="h5" style={{ color: statusColor }}>
        {statusText}
      </Typography>
    </React.Fragment>
  );
}

function Chip(props) {
  const classes = useChipStyles();
  const { title } = props;
  return (
    <React.Fragment>
      <Typography component="div" variant="h5" className={classes.root}>
        {title}
      </Typography>
    </React.Fragment>
  );
}

function Row(props) {
  const { row } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <Typography component="div" variant="h5">
            {row.title}
          </Typography>
        </TableCell>
        <TableCell align="center">{row.jadwal}</TableCell>
        <TableCell align="center" className={classes.chipsRoot}>
          {row.context.map((ctx, index) => (
            <Chip key={index} title={ctx} />
          ))}
        </TableCell>
        <TableCell align="center">
          <StatusText title={row.status} />
        </TableCell>
        <TableCell align="center">
          <ActionsMenu actions={actionLists} />
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: lighten(theme.palette.background.paper, 0.1),
  },
}));

const ActionsMenu = ({ actions, actionHandler, icon }) => {
  return (
    <CmtDropdownMenu
      TriggerComponent={<IconButton size="small">{icon || <MoreVertIcon />}</IconButton>}
      items={actions}
      onItemClick={actionHandler}
    />
  );
};

export default function TablePengumuman({ data, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage }) {
  const classes = useStyles();

  return (
    <>
      <TableContainer className={classes.root}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>Judul</TableCell>
              <TableCell align="center">Jadwal</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{data && data.map((row, index) => <Row key={index} row={row} />)}</TableBody>
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
