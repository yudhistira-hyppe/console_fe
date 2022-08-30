import CmtCard from '@coremat/CmtCard';
import CmtImage from '@coremat/CmtImage';
import { alpha, Avatar, Box, Button, Divider, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Pagination } from '@mui/material';
import Stack from '@mui/material/Stack';
import { DataGrid } from '@mui/x-data-grid';
import { useLatestNotificationQuery } from 'api/user/notification';
import { useAuth } from 'authentication';
import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  headerText: {
    margin: '2% 0 0 5%',
    color: '#202020',
  },
  btnRoot: {
    backgroundColor: theme.palette.lightBtn.bgColor,
    color: theme.palette.lightBtn.textColor,
    fontWeight: theme.typography.fontWeightBold,
    letterSpacing: 1.25,
    padding: '3px 10px',
    '&:hover, &:focus': {
      backgroundColor: alpha(theme.palette.lightBtn.bgColor, 0.8),
      color: theme.palette.lightBtn.textColor,
    },
  },
}));

const Notification = () => {
  const { authUser } = useAuth();
  const classes = useStyles();
  const [skip, setSkip] = useState(0);
  const [page, setPage] = useState(1);
  const [payload, setPayload] = useState({
    email: authUser?.user?.email,
    skip: skip,
    limit: 10,
  });

  // console.log('authUser.email:', authUser?.user?.email);
  const { data: Notification } = useLatestNotificationQuery(payload);

  useEffect(() => {
    setPayload({
      email: authUser?.user?.email,
      skip: skip,
      limit: 10,
    });
  }, [skip, page]);

  const handlePageChange = (e, val) => {
    setSkip(val * 10 - 10);
    setPage(val);
  };

  const getDate = (prevDate) => {
    const diffDate = moment(prevDate).fromNow();
    return diffDate === 'a month ago' ? '1 month ago' : diffDate;
  };

  return (
    <>
      <CmtCard>
        <Typography variant="h1" component="div" className={classes.headerText}>
          Notifikasi
        </Typography>
        <hr style={{ backgroundColor: 'rgba(0, 0, 0, 0.16)', width: '100%', height: '3px', marginTop: '30px' }} />

        <PerfectScrollbar>
          <Stack direction="column" spacing={1} style={{ marginTop: '10px' }}>
            {Notification?.data.map((row, i) => {
              return (
                <>
                  {i === 0 ? '' : <hr style={{ width: '100%' }} />}
                  <Stack
                    sx={{
                      minHeight: '4rem',
                      '&:hover': {
                        cursor: 'pointer',
                        // backgroundColor: 'yellow',
                        boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.161741)',
                        padding: '1px 2px',
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    // spacing={1}
                    // style={{ border: '1px solid red' }}
                  >
                    <Box
                      display="flex"
                      style={{
                        width: '80%',
                        // border: '1px solid black',
                      }}>
                      <Box style={{ backgroundColor: 'rgb(171, 34, 175)', borderRadius: '50%', padding: '5px' }}>
                        <Avatar alt="Remy Sharp" src="/images/dashboard/notif-icon.svg" />
                      </Box>

                      {/* <CmtImage src="/images/dashboard/notif-icon.svg" /> */}
                      <Box style={{ marginLeft: '1rem', wordWrap: 'break-word' }}>
                        <Typography component="p" variant="h4">
                          <div>{row?.postType}</div>
                        </Typography>
                        <div>
                          <span style={{ color: 'blue' }}>{row?.title}</span> {row?.bodyId}
                        </div>
                      </Box>
                    </Box>
                    <Typography component="p" variant="h7">
                      {getDate(row?.createdAt)}
                    </Typography>
                  </Stack>
                </>
              );
            })}
          </Stack>
        </PerfectScrollbar>
      </CmtCard>
      <div className="mt-6 flex flex-row justify-content-center">
        <Pagination
          page={page}
          onChange={(e, value) => handlePageChange(e, value)}
          count={Math.ceil(Notification?.totalAllrows / 10)}
        />
      </div>
    </>
  );
};

export default Notification;
