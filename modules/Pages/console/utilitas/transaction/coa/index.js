import React, { useCallback, useState } from 'react';
import { Button, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import TableSection from './TableSection';
import { useGetListCOAQuery } from 'api/console/utilitas/transaction';

const TransactionCOA = () => {
  const [filter, setFilter] = useState({
    page: 0,
    limit: 5,
    descending: 'true',
  });

  const getParams = useCallback(() => {
    let params = [];
    params.push(`?pageNumber=${filter.page}`);
    params.push(`pageRow=${filter.limit}`);
    params.push(`order=${filter.descending === 'true' ? 'DESC' : 'ASC'}`);

    return params?.join('&');
  }, [filter]);

  const { data: listCOA, isFetching: loadingCOA } = useGetListCOAQuery(getParams());

  const handlePageChange = (value) => {
    setFilter((prevVal) => {
      return {
        ...prevVal,
        page: value,
      };
    });
  };
  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>COA</Typography>

        <Button variant="contained" color="secondary" startIcon={<Add fontSize="16px" />} style={{ padding: '8px 12px' }}>
          <Typography variant="subtitle2">Tambah</Typography>
        </Button>
      </Stack>

      <TableSection listCOA={listCOA} loading={loadingCOA} filter={filter} handlePageChange={handlePageChange} />
    </Stack>
  );
};

export default TransactionCOA;
