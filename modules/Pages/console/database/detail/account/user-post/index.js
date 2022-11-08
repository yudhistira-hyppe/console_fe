import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Typography } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, CircularProgress, Divider, Stack, Tab, Button } from '@mui/material';
import { useAuth } from 'authentication';
import { useLazyUserContentsAllQuery } from 'api/user/content';
import { useLazyUserContentsGroupQuery } from 'api/user/content/management';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { formatPostType } from 'helpers/stringHelper';
import useStyles from './index.style';

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
  const [isFetching, setIsFetching] = useState({ all: false, vid: false, pict: false, story: false, diary: false });
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState({
    all: false,
    vid: false,
    pict: false,
    story: false,
    diary: false,
  });
  const [posts, setPosts] = useState({ all: [], vid: [], pict: [], story: [], diary: [] });
  const [payloadPosts, setPayloadPosts] = useState({
    all: {
      email: email,
      limit: 10,
      skip: 0,
    },
    vid: {
      email: email,
      ownership: false,
      monetesisasi: false,
      archived: false,
      buy: false,
      postType: 'vid',
      limit: 10,
      skip: 0,
    },
    pict: {
      email: email,
      ownership: false,
      monetesisasi: false,
      archived: false,
      buy: false,
      postType: 'pict',
      limit: 10,
      skip: 0,
    },
    story: {
      email: email,
      ownership: false,
      monetesisasi: false,
      archived: false,
      buy: false,
      postType: 'story',
      limit: 10,
      skip: 0,
    },
    diary: {
      email: email,
      ownership: false,
      monetesisasi: false,
      archived: false,
      buy: false,
      postType: 'diary',
      limit: 10,
      skip: 0,
    },
  });
  const [getPostAll] = useLazyUserContentsAllQuery();
  const [getPostByType] = useLazyUserContentsGroupQuery();

  const getPost = (postType) => {
    let getPostApiCall;

    setIsFetching((prevState) => ({
      ...prevState,
      [postType]: true,
    }));

    if (postType === 'all') {
      getPostApiCall = getPostAll(payloadPosts[postType]).unwrap();
    } else {
      getPostApiCall = getPostByType(payloadPosts[postType]).unwrap();
    }

    getPostApiCall
      .then(({ data }) => {
        setPosts((prevState) => ({
          ...prevState,
          [postType]: [...posts[postType], ...data],
        }));
        setPayloadPosts((prevState) => ({
          ...prevState,
          [postType]: { ...payloadPosts[postType], skip: payloadPosts[postType].skip + 10 },
        }));
        setIsFetching((prevState) => ({
          ...prevState,
          [postType]: false,
        }));
        setShowLoadMoreBtn((prevState) => ({
          ...prevState,
          [postType]: data.length === payloadPosts[postType].limit,
        }));
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (posts[tab].length === 0 && !isFetching[tab]) {
      getPost(tab);
    }
  }, [tab]);

  const onTabChange = (_, selectedTab) => {
    setTab(selectedTab);
  };

  const getPostImage = (post) => {
    if (post.postID) {
      const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;
      const mediaUri = post.mediaType === 'image' ? `/pict/${post.postID}` : `/thumb/${post.postID}`;
      return `${STREAM_URL}${mediaUri}${authToken}`;
    }
    return '';
  };

  const onErrorPostImage = (error) => {
    error.target.src = '/images/icons/img-empty.svg';
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
            {postsConfig.map(({ key, label }) => (
              <Tab key={key} className={classes.tab} label={label} value={key} />
            ))}
          </TabList>
        </Box>
        {postsConfig.map(({ key }) => (
          <TabPanel key={key} value={key}>
            <PerfectScrollbar>
              <Stack maxHeight={544} gap={2} alignItems="center">
                {posts[key].length > 0 &&
                  posts[key].map((post, index) => (
                    <Stack key={index} width="100%" direction={'row'} spacing={2}>
                      <img
                        className={classes.postImage}
                        src={getPostImage(post)}
                        alt={post.title}
                        onError={onErrorPostImage}
                      />
                      <Stack flex={1} gap={1}>
                        <Box
                          width="fit-content"
                          padding="6px 8px"
                          borderRadius="4px"
                          color="text.secondary"
                          bgcolor="rgba(33, 33, 33, 0.08)">
                          <Typography variant="h6">{formatPostType(post.postType)}</Typography>
                        </Box>
                        <Typography className={classes.postDescription}>{post.description}</Typography>
                        <Stack direction={'row'} spacing={1}>
                          <Box fontSize={12} lineHeight="16px">
                            {`${post.views || 0} `}
                            <Box component="span" color="text.disabled">
                              Dilihat
                            </Box>
                          </Box>
                          <Divider orientation="vertical" />
                          <Box fontSize={12} lineHeight="16px">
                            {`${post.likes || 0} `}
                            <Box component="span" color="text.disabled">
                              Disukai
                            </Box>
                          </Box>
                          <Divider orientation="vertical" />
                          <Box fontSize={12} lineHeight="16px">
                            {`${post.comments || 0} `}
                            <Box component="span" color="text.disabled">
                              Komentar
                            </Box>
                          </Box>
                          <Divider orientation="vertical" />
                          <Box fontSize={12} lineHeight="16px">
                            {`${post.shares || 0} `}
                            <Box component="span" color="text.disabled">
                              Dibagikan
                            </Box>
                          </Box>
                        </Stack>
                        <Box fontSize={12} lineHeight="16px" color="text.disabled">
                          {moment(post.createdAt).locale('id').format('MMM DD, YYYY')}
                        </Box>
                      </Stack>
                      <Stack gap={0.5} justifyContent={'center'}>
                        <Box fontSize={12} lineHeight="16px">
                          <Box component="span" color="text.disabled">
                            Terdaftar:
                          </Box>{' '}
                          -
                        </Box>
                        <Box fontSize={12} lineHeight="16px">
                          <Box component="span" color="text.disabled">
                            Dijual:
                          </Box>{' '}
                          -
                        </Box>
                      </Stack>
                    </Stack>
                  ))}
                {!isFetching[key] && posts[key].length === 0 && (
                  <Stack alignItems="center" gap={2}>
                    <img src="/images/icons/empty-posts.svg" alt="Empty Post" />
                    <Typography>
                      {key === 'all'
                        ? 'Pengguna belum memiliki kiriman apapun'
                        : `Pengguna belum memiliki kiriman ${formatPostType(key)}`}
                    </Typography>
                  </Stack>
                )}
                {!isFetching[key] && showLoadMoreBtn[key] && (
                  <Button variant="contained" color="secondary" onClick={() => getPost(key)}>
                    Muat lebih banyak
                  </Button>
                )}
                {isFetching[key] && (
                  <Stack alignItems="center">
                    <CircularProgress color="secondary" />
                  </Stack>
                )}
              </Stack>
            </PerfectScrollbar>
          </TabPanel>
        ))}
      </TabContext>
    </Card>
  );
};

UserPost.propTypes = {
  email: PropTypes.string,
};

export default UserPost;
