import React, { useState } from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import TableAkunPengguna from './TableAkunPengguna';
import FilterTableAkunPengguna from './FilterTableAkunPengguna';
import { useGetAllUserQuery } from 'api/user/user';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Database Akun Pengguna', isActive: true },
];

const ConsolePenggunaComponent = () => {
  const [tablePage, setTablePage] = useState(0);
  const [filters, setFilters] = useState({});
  const [isFiltersChange, setIsFiltersChanges] = useState(false);
  const [isSearchUsers, setIsSearchUsers] = useState(false);
  const { data: users, isFetching } = useGetAllUserQuery(filters, { skip: !isSearchUsers });

  const handleSearchUsers = ({ fullName, gender, roles, age }) => {
    const bodyData = {
      ...(fullName && { fullName }),
      ...(gender && { gender }),
      ...(roles && { roles }),
      ...(age && { age }),
      page: 0,
    };
    setFilters(bodyData);
    setTablePage(0);
    setIsFiltersChanges(true);
    setIsSearchUsers(true);
  };

  const onPageChange = (page) => {
    setFilters({
      ...filters,
      page: page * 15,
    });
    setTablePage(page);
    setIsFiltersChanges(false);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Database Akun Pengguna</title>
      </Head>
      <PageContainer heading="Database Akun Pengguna" breadcrumbs={breadcrumbs}>
        <GridContainer>
          <Grid item xs={12} md={12} xl={12}>
            <FilterTableAkunPengguna handleSearchUsers={handleSearchUsers} />
          </Grid>
          <Grid item xs={12} md={12} xl={12}>
            <TableAkunPengguna
              data={users}
              isFetching={isFetching}
              isFiltersChange={isFiltersChange}
              tablePage={tablePage}
              onPageChange={onPageChange}
            />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsolePenggunaComponent;
