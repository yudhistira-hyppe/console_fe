import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import TablePengumuman from './TablePengumuman';
import { Box, Button, Paper, Tabs, Tab, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useGetListAnnouncementByStatusQuery } from 'api/console/helpCenter/announcement';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Pengumuman', isActive: true },
];

const tabs = [
  { id: 'draft', name: 'Draf' },
  { id: 'sent', name: 'Terkirim' },
];

const useRowStyles = makeStyles({
  judulPengumuman: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 16,
  },
  tablePengumuman: {
    marginTop: 16,
  },
});

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const ConsolePengumumanComponent = () => {
  const classes = useRowStyles();
  const router = useRouter();
  const [filters, setFilters] = useState({
    status: 'draft',
    page: 0,
    limit: 5,
  });
  const { data, isFetching } = useGetListAnnouncementByStatusQuery(filters);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    switch (tabValue) {
      case 0:
        setFilters({
          status: 'draft',
          page: 0,
          limit: 5,
        });
        break;
      case 1:
        setFilters({
          status: 'send',
          page: 0,
          limit: 5,
        });
        break;
    }
  }, [tabValue]);

  const onTabChange = (_e, newValue) => {
    setTabValue(newValue);
  };

  const onPageChange = (page) => {
    setFilters({
      ...filters,
      page: page * filters.limit,
    });
  };

  const onPageSizeChange = (pageSize) => {
    setFilters({
      ...filters,
      page: 0,
      limit: pageSize,
    });
  };

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
            <Button
              startIcon={<AddIcon />}
              color="primary"
              onClick={() => router.push('/console/help-center/pengumuman/create')}>
              Buat Baru
            </Button>
          </Box>
          <Tabs
            value={tabValue}
            onChange={onTabChange}
            indicatorColor="primary"
            textColor="primary"
            className={classes.tabsRoot}>
            {tabs.map((tab, index) => {
              return <Tab key={tab.id} label={tab.name} {...a11yProps(index)} />;
            })}
          </Tabs>
          <Box className={classes.tablePengumuman}>
            <TablePengumuman
              data={data}
              isFetching={isFetching}
              filters={filters}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          </Box>
        </Paper>
      </PageContainer>
    </>
  );
};

export default ConsolePengumumanComponent;
