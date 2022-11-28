// react
import React from 'react';

// material ui
import { alpha, makeStyles } from '@material-ui/core/styles';
// import Chip from '@material-ui/core/Chip';

// template components
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import CmtCard from '@coremat/CmtCard';
import CmtList from '@coremat/CmtList';

// partials components
import ContentReportItem from './ContentReportItem';

// request
import { Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { Stack } from '@mui/system';
import { useGetListTicketsQuery } from 'api/console/helpCenter/konten';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    position: 'relative',
    '& .Cmt-card-content': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  chipRoot: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    letterSpacing: 0.25,
    fontSize: 14,
  },
}));

const dummySkeleton = [1, 2, 3];

const ContentReport = () => {
  const classes = useStyles();

  const { data: listTickets, isFetching } = useGetListTicketsQuery({ page: 0, limit: 5, type: 'content', jenis: 'report' });

  return (
    <CmtCard className={classes.cardRoot}>
      <Typography style={{ padding: 24, fontWeight: 'bold', borderBottom: '1px solid #0000001F' }}>
        Pelaporan Konten Terakhir
      </Typography>
      <CmtCardContent style={{ padding: '15px 0' }}>
        {isFetching ? (
          <div>
            {dummySkeleton.map((el, i) => (
              <Stack key={i} px={3} direction={'row'} width={'100%'} spacing={2}>
                <Skeleton height={'9em'} width={'7em'} style={{ marginTop: '0px' }} />
                <Stack direction={'column'} justifyContent={'center'}>
                  <Skeleton width={'12em'} />
                  <Skeleton width={'12em'} />
                  <Skeleton width={'12em'} />
                  <Skeleton width={'12em'} />
                </Stack>
              </Stack>
            ))}
          </div>
        ) : listTickets?.arrdata?.length > 0 ? (
          <CmtList data={listTickets?.arrdata} renderRow={(item, index) => <ContentReportItem key={index} item={item} />} />
        ) : (
          <center>you have no report</center>
        )}
      </CmtCardContent>
    </CmtCard>
  );
};

export default ContentReport;
