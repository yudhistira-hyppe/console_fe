import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import SpinnerLoading from 'components/common/loading/spinner';
import useStyles from '../index.style';
import ListTableView from './ListTableView';
import EmptyContactResult from './EmptyContactResult';

const ContactsList = ({ data, isFetching, filters, onPageChange, onPageSizeChange, onClickTicket, onClickDeleteTicket }) => {
  const classes = useStyles();

  return (
    <>
      {isFetching ? (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center">
          <SpinnerLoading />
        </Box>
      ) : data?.data?.length > 0 ? (
        <Box className={classes.inBuildAppMainContent}>
          <PerfectScrollbar className={classes.perfectScrollbarContactCon}>
            <ListTableView
              data={data}
              filters={filters}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
              onClickTicket={onClickTicket}
              onClickDeleteTicket={onClickDeleteTicket}
            />
          </PerfectScrollbar>
        </Box>
      ) : (
        <Box className={classes.inBuildAppMainContent}>
          <EmptyContactResult />
        </Box>
      )}
    </>
  );
};

ContactsList.propTypes = {
  data: PropTypes.object,
  isFetching: PropTypes.bool,
  filters: PropTypes.object,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
  onClickTicket: PropTypes.func,
  onClickDeleteTicket: PropTypes.func,
};

export default ContactsList;
