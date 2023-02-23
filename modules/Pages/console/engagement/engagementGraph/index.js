import react, { useState } from 'react';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import { MenuItem, Select, Stack, Tooltip, Typography } from '@mui/material';
import { Grid, makeStyles, Box, alpha } from '@material-ui/core';
import VisitorChart from './graph';
import CmtAvatar from '@coremat/CmtAvatar';
import { intranet } from './fakeData';
import moment from 'moment';
import { useGetActivityUserQuery } from 'api/console/engagement';

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    backgroundColor: 'rgba(0, 0, 0, 0.04);',
    transition: '0.7s',
    cursor: 'pointer',
  },
  avatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 10,
    width: 10,
    borderRadius: '50%',
    cursor: 'pointer',
    marginLeft: 10,
  },
  dateSelect: {
    '& .MuiSelect-select': {
      padding: '2px 10px',
      fontSize: 12,
    },
    '& .MuiSvgIcon-root': {
      width: 18,
      height: 18,
      top: 5,
    },
  },
}));

const EngagementGraph = () => {
  const classes = useStyles();
  const [payload, setPayload] = useState({
    startdate: moment().subtract(6, 'day').format('YYYY-MM-DD'),
    enddate: moment().format('YYYY-MM-DD'),
  });

  const handlePayload = (value) => {
    setPayload({ ...payload, startdate: moment().subtract(value, 'day').format('YYYY-MM-DD') });
  };

  const { data: activityUser, isFetching: loadingActivity } = useGetActivityUserQuery(payload);

  const [isActiveAction, setIsActiveAction] = useState('dilihat');
  console.log('isActiveAction:', isActiveAction);

  const engagementAction = [
    {
      label: 'Dilihat',
      icon: <img src="/images/icons/Eye_On.svg" width="24" alt="icon" />,
      color: '#D72934',
      value: activityUser?.data?.map((item) => item.views)?.reduce((a, b) => a + b, 0),
      key: 'dilihat',
    },
    {
      label: 'Disukai',
      icon: <img src="/images/icons/Likes.svg" width="24" alt="icon" />,
      color: '#3F51B5',
      value: activityUser?.data?.map((item) => item.likes)?.reduce((a, b) => a + b, 0),
      key: 'disukai',
    },
    {
      label: 'Komentar',
      icon: <img src="/images/icons/Message.svg" width="24" alt="icon" />,
      color: '#FFA005',
      value: activityUser?.data?.map((item) => item.comments)?.reduce((a, b) => a + b, 0),
      key: 'komentar',
    },
  ];

  const ActivityData = () => {
    let newData = [];

    activityUser?.data?.map((item) => {
      newData.push({
        date: moment(item.date).format('DD/MM/YY'),
        Dilihat: item.views,
        Disukai: item.likes,
        Komentar: item.comments,
      });
    });

    return newData;
  };

  return (
    <>
      <Select
        defaultValue={6}
        className={classes.dateSelect}
        color="secondary"
        onChange={(e) => handlePayload(e.target.value)}
        style={{ position: 'absolute', top: 16, right: 24 }}>
        <MenuItem value={6}>7 Hari</MenuItem>
        <MenuItem value={13}>14 Hari</MenuItem>
        <MenuItem value={29}>30 Hari</MenuItem>
        <MenuItem value={89}>90 Hari</MenuItem>
      </Select>
      <Grid container style={{ gap: 40, flexWrap: 'nowrap', height: 230 }}>
        <Grid item xs={12} sm={4} md={4}>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="space-between"
            style={{ height: '100%' }}
            spacing={1}>
            {engagementAction.map((action) => {
              return (
                <>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    // my={1}
                    // mx={2}
                    onClick={() => setIsActiveAction(action.key)}
                    style={{ padding: '5px 10px', borderRadius: '10px', cursor: 'pointer' }}
                    className={action.key === isActiveAction ? classes.actionBtn : null}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}>
                      {action.icon}
                      <span style={{ marginLeft: '7px' }}>{action.label}</span>
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}>
                      {action.value}
                      <span>
                        <Box bgcolor={action.color} color={action.color} className={classes.avatar} />
                      </span>
                    </div>
                  </Stack>
                </>
              );
            })}
          </Stack>
        </Grid>

        <Grid item xs={12} sm={8} md={8}>
          <VisitorChart
            data={ActivityData()}
            color={isActiveAction === 'dilihat' ? '#D7293499' : isActiveAction === 'disukai' ? '#3F51B599' : '#FFA00599'}
            kind={isActiveAction}
            chartGradientColor={
              isActiveAction === 'dilihat' ? '#D7293499' : isActiveAction === 'disukai' ? '#3F51B599' : '#FFA00599'
            }
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EngagementGraph;
