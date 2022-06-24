import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { Tooltip } from '@mui/material';
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

const TableAkunPengguna = (props) => {
  const { data, isLoading, page, onPageChange } = props;
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);

  useEffect(() => {
    if (data && data?.data.length > 0) {
      setRows(
        data?.data.map((item) => ({
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
        })),
      );
      setRowCount(data.totalrow);
    } else {
      setRows([]);
      setRowCount(0);
    }
  }, [data]);

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
        rows={!isLoading && rows}
        rowCount={rowCount}
        columns={formattedColumns}
        isRowSelectable={() => false}
        pageSize={15}
        paginationMode="server"
        onPageChange={(page) => onPageChange(page)}
        page={page}
        loading={isLoading}
      />
    </div>
  );
};

TableAkunPengguna.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  page: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default TableAkunPengguna;
