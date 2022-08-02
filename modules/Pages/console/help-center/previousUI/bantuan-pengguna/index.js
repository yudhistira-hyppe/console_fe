import React, { useState } from 'react';
import { Box } from '@material-ui/core';
import Head from 'next/head';
import useStyles from './index.style';
import clsx from 'clsx';
import Sidebar from './Sidebar';
import ContactsList from './ContactsList';
import Detail from './Detail';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useDeleteTicketMutation, useGetListTicketByFiltersQuery } from 'api/console/helpCenter/ticket';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Bantuan Pengguna', isActive: true },
];

const ConsoleBantuanPenggunaComponent = () => {
  const classes = useStyles();
  const [detailTicketId, setDetailTicketId] = useState({});
  const [showDetail, setShowDetail] = useState(false);
  const [filters, setFilters] = useState({
    tipe: 'helping',
    page: 0,
    limit: 5,
  });
  const { data, isFetching } = useGetListTicketByFiltersQuery(filters);
  const [deleteTicket] = useDeleteTicketMutation();

  const onFolderOrLabelChange = (type, value) => {
    setShowDetail(false);
    switch (type) {
      case 'folder':
        setFilters((current) => {
          const filtered = { ...current };
          delete filtered['status'];
          return filtered;
        });
        break;
      case 'label':
        setFilters({ ...filters, status: value });
        break;
      default:
        break;
    }
  };

  const onPageChange = (page) => {
    setFilters({ ...filters, page: page * filters.limit });
  };

  const onPageSizeChange = (pageSize) => {
    setFilters({ ...filters, page: 0, limit: pageSize });
  };

  const onClickTicket = (ticketId) => {
    setShowDetail(true);
    setDetailTicketId(ticketId);
  };

  const onCloseDetail = () => {
    setShowDetail(false);
  };

  const onClickDeleteTicket = (ticketId) => {
    deleteTicket(ticketId);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Bantuan Pengguna</title>
      </Head>
      <PageContainer heading="Bantuan Pengguna" breadcrumbs={breadcrumbs}>
        <Box className={classes.inBuildAppCard}>
          <Box className={clsx(classes.inBuildAppContainer, '')}>
            <Sidebar filters={filters} onFolderOrLabelChange={onFolderOrLabelChange} />
            {!showDetail ? (
              <ContactsList
                data={data}
                isFetching={isFetching}
                filters={filters}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                onClickTicket={onClickTicket}
                onClickDeleteTicket={onClickDeleteTicket}
              />
            ) : (
              <Detail ticketId={detailTicketId} onCloseDetail={onCloseDetail} />
            )}
          </Box>
        </Box>
      </PageContainer>
    </>
  );
};

export default ConsoleBantuanPenggunaComponent;
