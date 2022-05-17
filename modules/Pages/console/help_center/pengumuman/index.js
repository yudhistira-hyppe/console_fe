import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import TablePengumuman from './TablePengumuman';
import { Box, Button, Paper, Typography } from '@material-ui/core';

import AddIcon from '@material-ui/icons/Add';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help_center' },
  { label: 'Pengumuman', isActive: true },
];

const pengumumanLists = [
  {
    title: "Pengumuman Pemenang Hyppe Challenge Week 5 Desember 2021",
    jadwal: "2021/12/29",
    context: [
      "Halaman Pemberitauan",
      "Pemberitauan Dalam-App",
      "Pemberitauan Dorong"
    ],
    status: 0, // draft, dijadwalkan, tayang
  }
]

const useRowStyles = makeStyles({
  judulPengumuman: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 16
  }
});

const ConsolePengumumanComponent = () => {
  const classes = useRowStyles();
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Pengumuman</title>
      </Head>
      <PageContainer heading="Pengumuman" breadcrumbs={breadcrumbs}>
        <Paper>
            <Box className={classes.judulPengumuman}>
                <Typography component="div" variant="h4">
                    Pengumuman
                </Typography>
                <Button startIcon={<AddIcon />} color="primary" onClick={() => router.push('/console/help_center/pengumuman/create')}>Buat Baru</Button>
            </Box>
            <TablePengumuman 
                data={pengumumanLists} 
                page={0} 
                rowsPerPage={10} 
                handleChangePage={() => null} 
                handleChangeRowsPerPag={() => null} 
            />
        </Paper>
      </PageContainer>
    </>
  )
}

export default ConsolePengumumanComponent;