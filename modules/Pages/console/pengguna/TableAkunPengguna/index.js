import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
import { formatGender } from 'helpers/stringHelper';

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

const TableAkunPengguna = (props) => {
  const { data, isLoading } = props;
  const pageSizeOptions = [25, 50, 100];
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);

  const rows = data.map((item) => ({
    id: item._id,
    fullName: item.fullName || 'Data tidak tersedia',
    gender: item.gender ? formatGender(item.gender) : 'Data tidak tersedia',
    age: item.age ? `${item.age} Tahun` : 'Data tidak tersedia',
    cities: item.cities || 'Data tidak tersedia',
    role: item.roles.join(', ') || 'Data tidak tersedia',
    lastActive: '' || 'Data tidak tersedia',
    status: item.status || 'Data tidak tersedia',
  }));

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
        autoHeight
        rows={rows}
        columns={formattedColumns}
        isRowSelectable={() => false}
        pageSize={pageSize}
        rowsPerPageOptions={pageSizeOptions}
        loading={isLoading}
        onPageSizeChange={(value) => setPageSize(value)}
      />
    </div>
  );
};

TableAkunPengguna.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};

export default TableAkunPengguna;
