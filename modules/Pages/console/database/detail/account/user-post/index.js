import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Typography } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, CircularProgress, Divider, Stack, Tab, Button, Avatar } from '@mui/material';
import { useAuth } from 'authentication';
import { useUserContentsGroupQuery } from 'api/user/content/management';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { formatPostType } from 'helpers/stringHelper';
import useStyles from './index.style';
import CmtMediaObject from '@coremat/CmtMediaObject';
import CmtImage from '@coremat/CmtImage';
import { fakeDb } from 'modules/FakeDb/fake-db';

const postsConfig = [
  { key: 'all', label: 'ALL' },
  { key: 'vid', label: 'HYPPEVID' },
  { key: 'pict', label: 'HYPPEPICT' },
  { key: 'story', label: 'HYPPESTORY' },
  { key: 'diary', label: 'HYPPEDIARY' },
];

const UserPost = (props) => {
  const { email } = props;
  const classes = useStyles();
  const { authUser } = useAuth();
  const [tab, setTab] = useState('all');
  const [payload, setPayload] = useState({
    skip: 0,
    limit: 10,
    postType: '',
    email: email,
  });
  const [posts, setPosts] = useState({
    tab: tab,
    data: [],
  });
  const { data: contentPost, isFetching: loadingContent } = useUserContentsGroupQuery(payload);

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
    setPayload((prev) => {
      return {
        ...prev,
        postType: selectedTab === 'all' ? '' : selectedTab,
      };
    });
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
      return new Error();
    } else {
      return new Error();
    }
  };

  return (
    <Card>
      <TabContext value={tab}>
        <Box position="relative" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Box padding="24px 24px 0">
            <Typography variant="h4">Post Pengguna</Typography>
          </Box>
          <TabList
            onChange={onTabChange}
            centered={window.innerWidth < 500 ? false : true}
            variant={window.innerWidth < 500 ? 'scrollable' : 'standard'}
            scrollButtons
            textColor="secondary"
            indicatorColor="secondary">
            {postsConfig?.map(({ key, label }) => (
              <Tab key={key} className={classes.tab} label={label} value={key} />
            ))}
          </TabList>
        </Box>
        <PerfectScrollbar style={{ maxHeight: 544, padding: 20 }}>
          <Stack direction="column" width="100%" alignItems="center" gap="12px">
            {loadingContent ? (
              <Stack height={504} alignItems="center" justifyContent="center" spacing={2}>
                <CircularProgress color="secondary" />
                <Typography style={{ fontWeight: 'bold' }}>Loading data...</Typography>
              </Stack>
            ) : posts?.data?.length > 0 ? (
              posts?.data?.map((post, index) => (
                <CmtMediaObject
                  key={index}
                  style={{ width: '100%' }}
                  className={classes.mediaObjectRoot}
                  avatar={
                    <Box
                      position="relative"
                      style={{ width: 200, height: 150, border: '1px solid #eeeeee', borderRadius: 4 }}>
                      <Avatar src={getPostImage(post)} alt="X" variant="rounded" style={{ width: '100%', height: '100%' }} />
                    </Box>
                  }
                  avatarPos="center"
                  footerComponentProps={{ className: classes.footerComponentRoot }}>
                  <Stack direction="column" height={150}>
                    <Box className={classes.badgeRoot} component="span" bgcolor={'#EBEBEB'}>
                      {post.postType}
                    </Box>
                    <Typography component="div" variant="h4" className={classes.titleRoot}>
                      {post.description}
                    </Typography>
                    <Box component="p" display="flex" flexDirection="row" fontSize={12}>
                      {post.likes || 0}
                      <Box component="span" color="text.secondary">
                        &nbsp;Suka |
                      </Box>
                      &nbsp;{post.comments || 0}
                      <Box component="span" color="text.secondary">
                        &nbsp;Komentar |
                      </Box>
                      &nbsp;{post.views || 0}
                      <Box component="span" color="text.secondary">
                        &nbsp;Dilihat
                      </Box>
                    </Box>
                    <Typography style={{ color: '#737373', fontSize: 12, marginTop: 10 }}>
                      {moment(post?.createdAt).format('DD/MM/YY - HH:mm')} WIB
                    </Typography>
                  </Stack>
                </CmtMediaObject>
              ))
            ) : (
              <Stack height={504} alignItems="center" justifyContent="center" spacing={2}>
                <img src="/images/icons/empty-posts.svg" alt="Empty Post" />
                <Typography>Pengguna belum memiliki kiriman apapun</Typography>
              </Stack>
            )}
          </Stack>
        </PerfectScrollbar>
      </TabContext>
    </Card>
  );
};

UserPost.propTypes = {
  email: PropTypes.string,
};

export default UserPost;
