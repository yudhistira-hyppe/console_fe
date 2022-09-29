import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { SearchSection, TableSection } from '../components';
import { useGetTransactionVouchersQuery } from 'api/console/monetize/voucher';
import moment from 'moment';

const MonetizeVoucherComponent = () => {
  const [filter, setFilter] = React.useState({
    order: 'desc',
    statusVoucher: '',
    startdate: '',
    enddate: '',
    expiredDay: '',
    status: [],
    page: 0,
    limit: 10,
  });

  const getParams = () => {
    let params = {};
    Object.assign(params, { page: filter.page, limit: filter.limit });
    filter.statusVoucher !== '' && Object.assign(params, { statusVoucher: filter.statusVoucher });
    filter.startdate !== '' && Object.assign(params, { startdate: filter.startdate });
    filter.enddate !== '' && Object.assign(params, { enddate: filter.enddate });
    filter.expiredDay !== '' && Object.assign(params, { expiredDay: filter.expiredDay });
    filter.status.length >= 1 && Object.assign(params, { status: filter.status });

    return params;
  };

  const { data: listVouchers, isLoading: loadingVoucher } = useGetTransactionVouchersQuery(getParams());

  const onOrderChange = (e) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        order: e.target.value,
      };
    });
  };

  const handleSearchChange = (kind, value) => {
    setFilter((prevVal) => {
      if (kind === 'transaction_date') {
        const dateFrom = moment().subtract(value, 'd').format('YYYY-MM-DD');
        const dateNow = moment().format('YYYY-MM-DD');
        return {
          ...prevVal,
          startdate: dateFrom,
          enddate: dateNow,
        };
      } else if (kind === 'transaction_range') {
        return { ...prevVal, startdate: value[0], enddate: value[1] };
      } else if (kind === 'status_payment') {
        return {
          ...prevVal,
          status: filter.status.find((item) => item === value)
            ? filter.status.filter((item) => item !== value)
            : [...filter.status, value],
        };
      }
    });
  };

  const handlePageChange = (e, value) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        page: value,
      };
    });
  };

  return (
    <>
      <PageContainer>
        <GridContainer>
          <Grid item xs={12} md={3} sm={3}>
            <SearchSection handleChange={handleSearchChange} />
          </Grid>
          <Grid item xs={12} md={9} sm={9}>
            {loadingVoucher ? (
              <Typography>loading...</Typography>
            ) : (
              <TableSection
                handleOrder={onOrderChange}
                handlePageChange={handlePageChange}
                listVouchers={listVouchers}
                order={filter.order}
              />
            )}
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default MonetizeVoucherComponent;
