import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Tooltip, Pagination, PaginationItem } from '@mui/material';
import { Box, Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { formatDateTimeString, formatGender } from 'helpers/stringHelper';

const columns = [
  {
    field: 'fullName',
    headerName: 'Nama',
  },
  {
    field: 'gender',
    headerName: 'Jenis Kelamin',
  },
  {
    field: 'age',
    headerName: 'Umur',
    type: 'number',
  },
  {
    field: 'cities',
    headerName: 'Lokasi',
    valueFormatter: ({ value }) =>
      value
        .trim()
        .toLowerCase()
        .replace(/\w\S*/g, (word) => word.replace(/^\w/, (char) => char.toUpperCase())),
  },
  {
    field: 'interest',
    headerName: 'Minat',
  },
  {
    field: 'lastActive',
    headerName: 'Terakhir Aktif',
  },
];

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props) => <PaginationItem {...props} disableRipple />}
      onChange={(_, page) => apiRef.current.setPage(page - 1)}
    />
  );
};

const TableAkunPengguna = (props) => {
  const router = useRouter();
  const { data, isFetching, isFiltersChange, tablePage, onPageChange } = props;
  const pageSize = 15;
  const [queryData, setQueryData] = useState({});
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [selectionModel, setSelectionModel] = useState([]);

  useEffect(() => {
    if (router.query.data) {
      setQueryData(JSON.parse(router.query.data));
    }
  }, [router.query]);

  useEffect(() => {
    if (queryData.Detail) {
      setSelectionModel(queryData.Detail.map((item) => item.iduser));
    }
  }, [queryData]);

  useEffect(() => {
    if (isFiltersChange) {
      setRows([]);
      setRowCount(0);
    }
  }, [isFiltersChange]);

  useEffect(() => {
    if (data) {
      const newData = data?.data.map((item) => ({
        id: item._id,
        fullName: item.fullName || 'Data Tidak Tersedia',
        gender: item.gender ? formatGender(item.gender) : 'Data Tidak Tersedia',
        age: item.age || 'Data Tidak Tersedia',
        cities: item.cities || 'Data Tidak Tersedia',
        interest: item.interest.map((item) => item.interestName).join(', ') || 'Data Tidak Tersedia',
        lastActive: item.activity.payload.login_date
          ? formatDateTimeString(item.activity.payload.login_date)
          : 'Data Tidak Tersedia',
      }));
      setRows(newData);
    } else {
      setRows([]);
    }
  }, [data]);

  useEffect(() => {
    if (rows.length === 0) {
      setRowCount(0);
    }
    if (data && rows.length === 15 && rowCount < data.page + rows.length + 15) {
      setRowCount(data.page + rows.length + 15);
    }
  }, [rows]);

  const formattedColumns = columns.map((column) => ({
    ...column,
    headerAlign: 'left',
    cellClassName: 'text-ellipsis',
    align: 'left',
    flex: 1,
    renderCell: ({ formattedValue }) => (
      <Tooltip title={formattedValue}>
        <p>{formattedValue}</p>
      </Tooltip>
    ),
  }));

  const onClickCancelSelectUsers = () => {
    router.push(
      {
        pathname: `/console/help-center/pengumuman/${router.query.actionType}`,
        query: router.query,
      },
      `/console/help-center/pengumuman/${router.query.actionType}`,
    );
  };

  const onClickDoneSelectUsers = () => {
    const newData = {
      ...queryData,
      Detail: selectionModel.map((item) => ({ iduser: item })),
    };
    router.push(
      {
        pathname: `/console/help-center/pengumuman/${router.query.actionType}`,
        query: { data: JSON.stringify(newData) },
      },
      `/console/help-center/pengumuman/${router.query.actionType}`,
    );
  };

  return (
    <div style={{ width: '100%' }}>
      <DataGrid
        sx={{
          '& .text-ellipsis p': {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          },
          '& .MuiDataGrid-columnHeader:focus-within, .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            color: '#000000DE',
          },
          '& .MuiDataGrid-virtualScrollerRenderZone': {
            backgroundColor: '#f8f8fa',
          },
        }}
        components={{
          Pagination: CustomPagination,
        }}
        autoHeight
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        keepNonExistentRowsSelected
        rows={isFetching ? [] : rows}
        rowCount={rowCount}
        columns={formattedColumns}
        isRowSelectable={() => true}
        page={tablePage}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={(toPage) => onPageChange(toPage)}
        loading={isFetching}
      />
      <Box display="flex" justifyContent="end" gridGap={8} marginTop={8}>
        <Button variant="outlined" color="primary" onClick={onClickCancelSelectUsers}>
          Batal
        </Button>
        <Button variant="contained" color="primary" disabled={selectionModel.length === 0} onClick={onClickDoneSelectUsers}>
          Selesai
        </Button>
      </Box>
    </div>
  );
};

TableAkunPengguna.propTypes = {
  data: PropTypes.object,
  isFetching: PropTypes.bool,
  isFiltersChange: PropTypes.bool,
  tablePage: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default TableAkunPengguna;
