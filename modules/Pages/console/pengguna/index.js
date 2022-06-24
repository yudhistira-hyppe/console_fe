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
  const [usersBodyData, setUserBodyData] = useState({});
  const [isSearchUsers, setIsSearchUsers] = useState(false);
  const { data: users, isFetching } = useGetAllUserQuery(usersBodyData, { skip: !isSearchUsers });

  const handleSearchUsers = ({ fullName, gender, roles, age }) => {
    const bodyData = {
      ...(fullName && { fullName }),
      ...(gender && { gender }),
      ...(roles && { roles }),
      ...(age && { age }),
      page: 0,
    };
    setUserBodyData(bodyData);
    setTablePage(0);
    setIsSearchUsers(true);
  };

  const onPageChange = (page) => {
    setUserBodyData({
      ...usersBodyData,
      page,
    });
    setTablePage(page);
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
            <TableAkunPengguna data={users} isLoading={isFetching} page={tablePage} onPageChange={onPageChange} />
          </Grid>
        </GridContainer>
      </PageContainer>
    </>
  );
};

export default ConsolePenggunaComponent;
