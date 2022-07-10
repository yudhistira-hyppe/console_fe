import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import moment from 'moment';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  gridPageSizeSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { Pagination, PaginationItem, Box, Select, MenuItem } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import CmtDropdownMenu from '@coremat/CmtDropdownMenu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDeleteAnnouncementMutation } from 'api/console/helpCenter/announcement';

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

const useChipStyles = makeStyles({
  wrapper: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#21212114',
    padding: '6px 16px',
    borderRadius: 16,
  },
});

const useStatusStyles = makeStyles({
  draft: {
    color: '#B70505',
    fontWeight: 'bold',
  },
  send: {
    color: '#00A825',
    fontWeight: 'bold',
  },
});

const columns = [
  {
    field: 'title',
    headerName: 'Judul',
    renderCell: (params) => <b>{params.value}</b>,
    flex: 1,
  },
  {
    field: 'created',
    headerName: 'Dibuat',
    flex: 1,
  },
  {
    field: 'sendSchedule',
    headerName: 'Jadwal Dikirim',
    flex: 1,
  },
  {
    field: 'type',
    headerName: 'Tipe',
    renderCell: (params) => (
      <div className={useChipStyles().wrapper}>
        {params.value.map((item, index) => (
          <div key={index} className={useChipStyles().item}>
            {item}
          </div>
        ))}
      </div>
    ),
    flex: 3,
  },
  {
    field: 'status',
    headerName: 'Status',
    renderCell: (params) => {
      let formattedText = '';
      if (params.value === 'draft') formattedText = 'Draf';
      if (params.value === 'send') formattedText = 'Tayang';
      return <div className={useStatusStyles()[params.value]}>{formattedText}</div>;
    },
    flex: 1,
  },
  {
    field: 'action',
    headerName: 'Aksi',
    renderCell: (params) => {
      const router = useRouter();
      const [deleteAnnouncement] = useDeleteAnnouncementMutation();
      let filteredActionLists = actionLists;
      if (params.row.status === 'send') {
        filteredActionLists = filteredActionLists.filter((item) => item.value !== 'change');
      }
      const onItemClick = (action, data) => {
        if (action.value === 'change') {
          const formattedDate = moment(data.datetimeSend).utc().format('YYYY-MM-DD');
          const formattedTime = moment(data.datetimeSend).utc().format('HH:mm:ss');
          delete data.datetimeCreate;
          delete data.datetimeSend;
          router.push(
            {
              pathname: '/console/help-center/pengumuman/edit',
              query: { data: JSON.stringify({ ...data, datesend: `${formattedDate} ${formattedTime}` }) },
            },
            '/console/help-center/pengumuman/edit',
          );
        }
        if (action.value === 'delete') {
          deleteAnnouncement(data._id);
        }
      };
      return (
        <CmtDropdownMenu
          TriggerComponent={<IconButton size="small">{<MoreVertIcon />}</IconButton>}
          items={filteredActionLists}
          onItemClick={(action) => onItemClick(action, params.row.originalData)}
        />
      );
    },
    flex: 1,
  },
];

const CustomPagination = () => {
  const apiRef = useGridApiContext();
  const pageSize = useGridSelector(apiRef, gridPageSizeSelector);
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center">
        <div>Jumlah Data Tiap Halaman:</div>
        <Select
          sx={{
            fontSize: 14,
            height: 32,
            fieldset: {
              border: 'none',
            },
          }}
          value={pageSize}
          onChange={(event) => apiRef.current.setPageSize(event.target.value)}>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </Box>
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        page={page + 1}
        count={pageCount}
        renderItem={(props) => <PaginationItem {...props} disableRipple />}
        onChange={(_, page) => apiRef.current.setPage(page - 1)}
      />
    </>
  );
};

const formatType = (isAppInfo, isAppMessage, isPushMessage, email) => {
  let result = [];
  if (isAppInfo) result.push('Halaman Pemberitauan');
  if (isAppMessage) result.push('Pemberitauan Dalam App');
  if (isPushMessage) result.push('Pemberitauan Dorong');
  if (email) result.push('Pemberitauan Email');
  return result;
};

export default function TablePengumuman({ data, isFetching, filters, onPageChange, onPageSizeChange }) {
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [announcementStatus, setAnnouncementStatus] = useState();

  useEffect(() => {
    if (filters.status) {
      setAnnouncementStatus(filters.status);
      setRows([]);
      setRowCount(0);
    }
  }, [filters.status]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setRows(
        data?.data.map((item) => ({
          id: item._id,
          title: item.title,
          created: moment(item.datetimeCreate).utc().format('DD/MM/YYYY, HH:mm:ss'),
          sendSchedule: moment(item.datetimeSend).utc().format('DD/MM/YYYY, HH:mm:ss'),
          type: formatType(item.appInfo, item.appMessage, item.pushMessage, item.email),
          status: item.status,
          originalData: {
            ...item,
            Detail: item.Detail.map((detail) => ({ iduser: detail._id })),
          },
        })),
      );
    } else {
      setRows([]);
    }
  }, [data]);

  useEffect(() => {
    if (rows.length === 0) {
      setRowCount(0);
    }
    if (data && rows.length === data.limit && rowCount < data.page + rows.length + data.limit) {
      setRowCount(data.page + rows.length + data.limit);
    }
  }, [rows]);

  const filteredColumns = columns
    .map((column) => ({
      ...column,
      align: 'center',
      headerAlign: 'center',
    }))
    .filter((item) => {
      if (announcementStatus === 'send') {
        return item.field !== 'action';
      }
      return item;
    });

  return (
    <>
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
          '& .MuiDataGrid-cell': {
            padding: '8px',
          },
          '& .MuiDataGrid-cell--textCenter': {
            textAlign: 'center',
          },
          '& .MuiDataGrid-footerContainer': {
            gap: '16px',
            justifyContent: 'flex-end',
          },
        }}
        components={{
          Pagination: CustomPagination,
        }}
        autoHeight
        getRowHeight={() => 'auto'}
        rows={isFetching ? [] : rows}
        rowCount={rowCount}
        columns={filteredColumns}
        isRowSelectable={() => false}
        paginationMode="server"
        page={filters.page / filters.limit}
        pageSize={filters.limit}
        onPageChange={(toPage) => onPageChange(toPage)}
        onPageSizeChange={(newPageSize) => onPageSizeChange(newPageSize)}
        loading={isFetching}
      />
    </>
  );
}

TablePengumuman.propTypes = {
  data: PropTypes.object,
  isFetching: PropTypes.bool,
  filters: PropTypes.object,
  onPageChange: PropTypes.func,
  onPageSizeChange: PropTypes.func,
};
