import React from 'react';
import PropTypes from 'prop-types';
import { Box, TablePagination } from '@material-ui/core';
import useStyles from '../../index.style';

const ListHeader = ({ rowInfo, filters, onPageChange, onPageSizeChange }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box className={classes.headerBox}>
        <TablePagination
          component="div"
          count={rowInfo.totalAllRow}
          page={filters.page / filters.limit}
          onPageChange={(_, page) => onPageChange(page)}
          rowsPerPage={filters.limit}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          onRowsPerPageChange={(event) => onPageSizeChange(event.target.value)}
          labelDisplayedRows={({ from, to, count }) => `Menampilkan ${from} - ${to} dari ${count}`}
          labelRowsPerPage="Jumlah Data Tiap Halaman:"
        />
      </Box>
    </React.Fragment>
  );
};

ListHeader.propTypes = {
  rowInfo: PropTypes.object,
  filters: PropTypes.object,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};

export default ListHeader;
