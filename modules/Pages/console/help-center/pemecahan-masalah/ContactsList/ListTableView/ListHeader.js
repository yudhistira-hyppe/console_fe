import React, { useState } from 'react';
import moment from 'moment';
import { Box, TablePagination } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import useStyles from '../../index.style';

const ListHeader = () => {
  const classes = useStyles();
  const [pickedDate, setPickedDate] = useState(moment());
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <Box className={classes.headerBox}>
        <KeyboardDatePicker
          className={classes.datePicker}
          disableToolbar
          variant="inline"
          format="DD MMM yyyy"
          margin="normal"
          value={pickedDate}
          onChange={(date) => setPickedDate(date)}
          KeyboardButtonProps={{
            'aria-label': 'Change Date',
          }}
        />
        <TablePagination
          component="div"
          count={100}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelDisplayedRows={({ from, to, count }) => {
            return `Showing ${from} of ${count !== -1 ? count : `more than ${to}`}`;
          }}
          labelRowsPerPage=""
        />
      </Box>
    </React.Fragment>
  );
};

export default ListHeader;
