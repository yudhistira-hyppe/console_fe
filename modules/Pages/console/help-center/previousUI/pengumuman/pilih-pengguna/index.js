import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Grid } from '@material-ui/core';
import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import TablePilihPengguna from './TablePilihPengguna';
import FilterTableAkunPengguna from '../../../users/FilterTableAkunPengguna';
import { useGetAllUserQuery } from 'api/user/user';
import { useRouter } from 'next/router';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Pengumuman', link: '/console/help-center/pengumuman' },
  { label: 'Pilih Pengguna', isActive: true },
];

const ConsolePengumumanPenggunaComponent = () => {
  const router = useRouter();
  const [isValidQuery, setIsValidQuery] = useState(false);
  const [tablePage, setTablePage] = useState(0);
  const [filters, setFilters] = useState({});
  const [isFiltersChange, setIsFiltersChanges] = useState(false);
  const [isSearchUsers, setIsSearchUsers] = useState(false);
  const { data: users, isFetching } = useGetAllUserQuery(filters, { skip: !isSearchUsers });

  useEffect(() => {
    if (Object.keys(router.query).length < 1) {
      router.push('/console/help-center/pengumuman');
    } else {
      setIsValidQuery(true);
    }
  }, [router.query]);

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
        <title key="title">Hyppe-Console :: Pilih Pengguna</title>
      </Head>
      {isValidQuery ? (
        <PageContainer heading="Pilih Pengguna" breadcrumbs={breadcrumbs}>
          <GridContainer>
            <Grid item xs={12} md={12} xl={12}>
              <FilterTableAkunPengguna handleSearchUsers={handleSearchUsers} />
            </Grid>
            <Grid item xs={12} md={12} xl={12}>
              <TablePilihPengguna
                data={users}
                isFetching={isFetching}
                isFiltersChange={isFiltersChange}
                tablePage={tablePage}
                onPageChange={onPageChange}
              />
            </Grid>
          </GridContainer>
        </PageContainer>
      ) : null}
    </>
  );
};

export default ConsolePengumumanPenggunaComponent;
