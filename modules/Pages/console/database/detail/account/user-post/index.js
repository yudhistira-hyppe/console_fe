import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Typography } from '@material-ui/core';
import { TabContext, TabList } from '@mui/lab';
import { Box, Card, CircularProgress, Divider, Stack, Tab, Button, Avatar, Pagination, IconButton } from '@mui/material';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { formatPostType } from 'helpers/stringHelper';
import useStyles from './index.style';
import CmtMediaObject from '@coremat/CmtMediaObject';
import CmtImage from '@coremat/CmtImage';
import { fakeDb } from 'modules/FakeDb/fake-db';
import { NavigateBefore, NavigateNext } from '@material-ui/icons';
import { useGetListContentQuery } from 'api/console/database';
import Link from 'next/link';

const postsConfig = [
  { key: 'all', label: 'Semua' },
  { key: 'HyppePic', label: 'Hyppepic' },
  { key: 'HyppeVid', label: 'Hyppevid' },
];

const UserPost = (props) => {
  const { idUser } = props;
  const classes = useStyles();
  const [tab, setTab] = useState('all');
  const [payload, setPayload] = useState({
    page: 0,
    limit: 10,
    descending: true,
    iduser: idUser,
  });
  const [posts, setPosts] = useState({
    tab: tab,
    data: [],
  });
  const { data: contentPost, isFetching: loadingContent } = useGetListContentQuery(payload);
  const { authUser } = useAuth();

  useEffect(() => {
    setPosts(() => {
      return {
        tab: tab,
        data: contentPost?.data,
      };
    });
  }, [contentPost]);

  const onTabChange = (_, selectedTab) => {
    setTab(selectedTab);
    console.log(selectedTab);
    setPayload((prev) => {
      return {
        ...prev,
        postType: selectedTab === 'all' ? undefined : [selectedTab],
        page: 0,
      };
    });
  };

  const getMediaUri = (val) => {
    const authToken = `?x-auth-token=${authUser?.token}&x-auth-user=${authUser?.user?.email}`;

    return `${STREAM_URL}${val}${authToken}`;
  };

  const getPostImage = (item) => {
    if (item?.apsara || item?.apsaraId) {
      if (item?.media?.ImageInfo?.length >= 1) {
        return item?.media?.ImageInfo?.[0]?.URL || new Error();
      } else if (item?.media?.VideoList?.length >= 1) {
        return item?.media?.VideoList?.[0]?.CoverURL || new Error();
      } else {
        return new Error();
      }
    } else if (item?.mediaEndpoint) {
      // return new Error();
      return getMediaUri(item?.mediaEndpoint);
    } else {
      return new Error();
    }
  };

  return (
    <Card>
      <TabContext value={tab}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          style={{ padding: '16px 24px 0', borderBottom: '1px solid #0000001f', position: 'relative' }}>
          <Box style={{ position: 'absolute', left: 24 }}>
            <Typography variant="h4">Postingan Pengguna</Typography>
          </Box>
          <TabList
            onChange={onTabChange}
            centered={window.innerWidth < 500 ? false : true}
            variant={window.innerWidth < 500 ? 'scrollable' : 'standard'}
            scrollButtons
            sx={{ marginLeft: 22, '& .MuiTabs-indicator': { backgroundColor: '#AB22AF' } }}>
            {postsConfig?.map(({ key, label }) => (
              <Tab key={key} className={classes.tab} label={label} value={key} />
            ))}
          </TabList>
        </Stack>
        <PerfectScrollbar style={{ maxHeight: 544, minHeight: 544 }}>
          <Stack direction="column" width="100%" alignItems="center">
            {loadingContent ? (
              <Stack height={544} alignItems="center" justifyContent="center" gap={2}>
                <CircularProgress color="secondary" />
                <Typography style={{ fontWeight: 'bold' }}>Loading data...</Typography>
              </Stack>
            ) : posts?.data?.length > 0 ? (
              posts?.data?.map((post, index) => (
                <Link key={index} href={`/database/content/${post?._id}`}>
                  <CmtMediaObject
                    sx={{
                      width: '100%',
                      padding: '24px',
                      borderBottom: '1px solid rgb(238, 238, 238)',
                      '&:hover': {
                        cursor: 'pointer',
                        background: '#bdbdbd24',
                      },
                    }}
                    className={classes.mediaObjectRoot}
                    avatar={
                      <Box
                        position="relative"
                        style={{ width: 200, height: 150, border: '1px solid #eeeeee', borderRadius: 4 }}>
                        <Avatar
                          src={getPostImage(post)}
                          alt="X"
                          variant="rounded"
                          style={{ width: '100%', height: '100%' }}
                        />
                      </Box>
                    }
                    avatarPos="center"
                    footerComponentProps={{ className: classes.footerComponentRoot }}>
                    <Stack direction="column" height={150}>
                      <Box className={classes.badgeRoot} bgcolor={'#EBEBEB'}>
                        {post.postType}
                      </Box>
                      <Typography className={classes.titleRoot}>{post.description}</Typography>
                      <Stack direction="row" style={{ fontSize: 12 }}>
                        {post.likes || 0}
                        <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>&nbsp;Suka |</span>
                        &nbsp;{post.comments || 0}
                        <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>&nbsp;Komentar |</span>
                        &nbsp;{post.views || 0}
                        <span style={{ color: 'rgba(0, 0, 0, 0.6)' }}>&nbsp;Dilihat</span>
                      </Stack>
                      <Typography style={{ color: '#737373', fontSize: 12, marginTop: 10 }}>
                        {moment(post?.createdAt).format('DD/MM/YYYY - HH:mm')} WIB
                      </Typography>
                    </Stack>
                  </CmtMediaObject>
                </Link>
              ))
            ) : (
              <Stack height={504} alignItems="center" justifyContent="center" gap={2}>
                <img src="/images/icons/empty-posts.svg" alt="Empty Post" />
                <Typography>Pengguna belum memiliki kiriman apapun</Typography>
              </Stack>
            )}
          </Stack>
        </PerfectScrollbar>
        <Stack direction="row" alignItems="center" justifyContent="left" spacing={2} m={2}>
          <IconButton
            color="secondary"
            onClick={() =>
              setPayload((prevVal) => {
                return {
                  ...prevVal,
                  page: prevVal.page - 1,
                };
              })
            }
            disabled={payload.page < 1 || loadingContent}>
            <NavigateBefore />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() =>
              setPayload((prevVal) => {
                return {
                  ...prevVal,
                  page: prevVal.page + 1,
                };
              })
            }
            disabled={posts?.data?.length < payload.limit || loadingContent}>
            <NavigateNext />
          </IconButton>
        </Stack>
      </TabContext>
    </Card>
  );
};

UserPost.propTypes = {
  email: PropTypes.string,
};

export default UserPost;
