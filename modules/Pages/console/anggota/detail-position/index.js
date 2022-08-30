import { useGetDetailAnggotaQuery } from 'api/console/getUserHyppe';
import { useRouter } from 'next/router';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import TableDataSpinner from 'components/common/loading/tableDataSpinner';

const DetailJabatan = () => {
  const router = useRouter();
  const payload = {
    skip: 0,
    limit: 10,
    groupId: router.query.id,
  };
  const { data: getUserDetailJabatan, isFetching } = useGetDetailAnggotaQuery(payload);
  console.log('getUserDetailJabatan:', getUserDetailJabatan);

  const breadcrumbs = [
    { label: 'Anggota', link: '/console/anggota' },
    { label: 'Detail Jabatan', isActive: true },
  ];
  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" style={{ cursor: 'pointer' }} onClick={() => router.push(`/console/anggota?tab=jabatan`)}>
          <img src="/images/icons/arrow-left.svg" />
          <Typography variant="h4" component="div">
            Kembali
          </Typography>
        </Box>
        <Box>
          <PageContainer breadcrumbs={breadcrumbs} />
        </Box>
      </Stack>
      <TableContainer component={Paper} style={{ minHeight: '500px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <Typography component="div" variant="h4">
                  Full Name
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography component="div" variant="h4">
                  Email
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          {isFetching ? (
            <TableDataSpinner center />
          ) : (
            <TableBody>
              {getUserDetailJabatan?.data?.map((row) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="left">{row.fullName}</TableCell>
                  <TableCell align="left">{row.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {getUserDetailJabatan?.data?.length === 0 && (
          <div
            style={{
              position: 'absolute',
              top: 'calc(50% - 24px / 2)',
              left: 'calc(50% - 100px / 2)',
            }}>
            Data kosong
          </div>
        )}
      </TableContainer>
    </>
  );
};

export default DetailJabatan;
