import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  CircularProgress,
  Stack,
  Chip,
  Pagination,
  Box,
} from '@mui/material';
import CmtAvatar from '@coremat/CmtAvatar';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { formatDateTimeString, formatGender, formatRoles } from 'helpers/stringHelper';
import useStyles from './index.style';

const columnsHeader = ['Nama', 'Jenis Akun', 'Jenis Kelamin ', 'Umur', 'Lokasi', 'Minat', 'Terakhir Aktif'];

const DatabaseTabAccountListTableComponent = (props) => {
  const classes = useStyles();
  const router = useRouter();
  const { userResults, isFetching, isFiltersChange, onPagePayloadChange } = props;
  const { authUser } = useAuth();
  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ count: 1, page: 1 });

  useEffect(() => {
    if (isFetching && isFiltersChange) {
      resetTable();
    }
  }, [isFetching, isFiltersChange]);

  useEffect(() => {
    if (userResults) {
      const { data, limit, totalallrow, totalfilter } = userResults;
      const newData = data.map((item) => ({
        id: item._id,
        user: {
          avatar: item.avatar,
          fullName: item.fullName || '-',
          email: item.email || '-',
        },
        role: formatRoles(item.roles) || '-',
        gender: item.gender ? formatGender(item.gender) : '-',
        age: item.age || '-',
        cities: item.cities || '-',
        interests: item.interest,
        lastActive: item.activity.payload.login_date ? formatDateTimeString(item.activity.payload.login_date) : '-',
      }));
      setRows(newData);
      if (data.length > 0 && !totalfilter) {
        setPagination({ ...pagination, count: Math.ceil(totalallrow / limit) });
      }
      if (data.length > 0 && totalfilter) {
        setPagination({ ...pagination, count: Math.ceil(totalfilter / limit) });
      }
    }
  }, [userResults]);

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
    if (mediaEndpoint) {
      return `${STREAM_URL}${mediaEndpoint}${authToken}`;
    }
    return '';
  };

  const resetTable = () => {
    setRows([]);
    setPagination({ count: 1, page: 1 });
  };

  const onPageChange = (_, page) => {
    setPagination({ ...pagination, page: page });
    onPagePayloadChange(page);
  };

  const onRowClick = (userEmail) => {
    router.push(`/database/account/${userEmail}`);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.tableRow}>
              {columnsHeader.map((item) => (
                <TableCell key={item}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan="100%" align="center" height={240}>
                  <CircularProgress color="secondary" />
                </TableCell>
              </TableRow>
            ) : rows.length > 0 ? (
              rows.map((row) => (
                <TableRow className={classes.tableRow} key={row.id} hover onClick={() => onRowClick(row.user.email)}>
                  <TableCell>
                    <Stack direction="row" spacing={1.5} maxWidth="212px" overflow="hidden">
                      <CmtAvatar
                        src={getMediaUri(row.user.avatar.mediaEndpoint)}
                        alt={row.user.fullName}
                        size={40}
                        color="random"
                      />
                      <Box overflow="hidden">
                        <div className={classes.textEllipsis}>{row.user.fullName}</div>
                        <div className={classes.textEllipsis}>{row.user.email}</div>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.gender}</TableCell>
                  <TableCell>{row.age}</TableCell>
                  <TableCell>{row.cities}</TableCell>
                  <TableCell>
                    <Stack gap={0.5} direction="row" flexWrap="wrap" maxWidth="212px">
                      {row.interests.slice(0, 3).map((interest) => (
                        <Chip className={classes.tableChip} key={interest._id} label={interest.interestName} size="small" />
                      ))}
                      {row.interests.length > 3 ? (
                        <Chip className={classes.tableChip} label={`+${row.interests.length - 3}`} size="small" />
                      ) : null}
                    </Stack>
                  </TableCell>
                  <TableCell>{row.lastActive}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="100%" align="center" height={240}>
                  Data Tidak Ditemukan
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {rows.length > 0 ? (
        <Pagination className={classes.pagination} count={pagination.count} page={pagination.page} onChange={onPageChange} />
      ) : null}
    </>
  );
};

DatabaseTabAccountListTableComponent.propTypes = {
  userResults: PropTypes.object,
  isFetching: PropTypes.bool,
  isFiltersChange: PropTypes.bool,
  onPagePayloadChange: PropTypes.func,
};

export default DatabaseTabAccountListTableComponent;
