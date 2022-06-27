import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { Tooltip, Pagination, PaginationItem } from '@mui/material';
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
    field: 'role',
    headerName: 'Jenis Akun',
    valueFormatter: ({ value }) =>
      value
        .trim()
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\w\S*/g, (word) => word.replace(/^\w/, (char) => char.toUpperCase())),
  },
  {
    field: 'lastActive',
    headerName: 'Terakhir Aktif',
  },
  {
    field: 'status',
    headerName: 'Status',
    valueFormatter: ({ value }) =>
      value
        .trim()
        .toLowerCase()
        .replace(/_/g, ' ')
        .replace(/\w\S*/g, (word) => word.replace(/^\w/, (char) => char.toUpperCase())),
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
  const { data, isFetching, isFiltersChange, tablePage, onPageChange } = props;
  const pageSize = 15;
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);

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
        fullName: item.fullName || 'Data tidak tersedia',
        gender: item.gender ? formatGender(item.gender) : 'Data tidak tersedia',
        age: item.age || 'Data tidak tersedia',
        cities: item.cities || 'Data tidak tersedia',
        role: item.roles.join(', ') || 'Data tidak tersedia',
        lastActive: item.activity.payload.login_date
          ? formatDateTimeString(item.activity.payload.login_date)
          : 'Data tidak tersedia',
        status: item.status || 'Data tidak tersedia',
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
        rows={isFetching ? [] : rows}
        rowCount={rowCount}
        columns={formattedColumns}
        isRowSelectable={() => false}
        page={tablePage}
        pageSize={pageSize}
        paginationMode="server"
        onPageChange={(toPage) => onPageChange(toPage)}
        loading={isFetching}
      />
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
