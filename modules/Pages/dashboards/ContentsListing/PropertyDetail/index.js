import React, { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import CmtCarousel from '../../../../../@coremat/CmtCarousel';
import { Close } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import CmtCard from '../../../../../@coremat/CmtCard';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtCardMedia from '../../../../../@coremat/CmtCard/CmtCardMedia';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import ScheduleIcon from '@material-ui/icons/Schedule';
import { timeFromNow } from '../../../../../@jumbo/utils/dateHelper';
import Chip from '@material-ui/core/Chip';

import videojs from 'video.js';
import qualitySelector from 'videojs-hls-quality-selector';
import qualityLevels from 'videojs-contrib-quality-levels';
import { fakeDb } from '../../../../FakeDb/fake-db';
import { STREAM_URL } from '../../../../../authentication/auth-provider/config';

const useStyles = makeStyles((theme) => ({
  titleRoot: {
    fontSize: 16,
    marginLeft: 12,
    fontWeight: theme.typography.fontWeightBold,
  },
  imageRoot: {
    width: '100%',
    height: 250,
  },
  iconRoot: {
    fontSize: 18,
    marginRight: 6,
  },
  linkBtn: {
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  priceWrapper: {
    textAlign: 'right',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: 16,
      textAlign: 'left',
    },
  },
  priceRoot: {
    fontSize: 16,
    color: theme.palette.primary.main,
    marginBottom: 5,
    fontWeight: theme.typography.fontWeightRegular,
  },
  badge: {
    color: '#8F8F8F',
    fontSize: 12,
    height: 24,
  },
  carouselRoot: {
    marginRight: 0,
    '& .bottom-left .slick-dots': {
      left: 24,
    },
    '& .slick-dots': {
      bottom: 24,
      '& li button:before': {
        backgroundColor: theme.palette.primary.main,
        opacity: 1,
      },
      '& li.slick-active button:before': {
        backgroundColor: theme.palette.warning.main,
      },
    },
  },
}));

const ContentDetail = ({ authUser, selectedContent, showContentList }) => {
  const classes = useStyles();
  const videoRef = useRef();
  const [player, setPlayer] = useState(undefined);

  const getMediaUri = (authUser, item) => {
    const authToken = '?x-auth-token=' + authUser.token + '&x-auth-user=' + authUser.email;
    const mediaUri = item.mediaType === 'video' ? item.mediaThumbEndpoint : item.avatar.mediaEndpoint;
    const httpUri = STREAM_URL + mediaUri + authToken;
    return httpUri;
  };

  const getPostType = (item) => fakeDb.postType.filter((type) => type.name === item.postType).map((opt) => opt.slug);
  useEffect(() => {
    if (selectedContent.mediaType === 'video') {
      const videoJsOptions = {
        preload: 'auto',
        autoplay: false,
        controls: true,
        fluid: true,
        responsive: true,
        sources: [
          {
            src: STREAM_URL + selectedContent.mediaEndpoint,
          },
        ],
      };
      videojs.registerPlugin('qualityLevels', qualityLevels);

      videojs.Vhs.xhr.beforeRequest = (options) => {
        options.headers = options.headers || {};
        options.headers['x-auth-token'] = authUser.token;
        options.headers['x-auth-user'] = authUser.email;
        options.headers['post-id'] = selectedContent.postID;
        return options;
      };
      videojs.registerPlugin('hlsQualitySelector', qualitySelector);
      const p = videojs(videoRef.current, videoJsOptions, function onPlayerReaady() {
        console.log('onPlayerReady');
      });
      setPlayer(p);
      return () => {
        if (player) player.dispose();
      };
    }
  }, [selectedContent]);

  useEffect(() => {
    if (player) player.hlsQualitySelector({ displayCurrentQuality: true });
  }, [player]);

  return (
    <CmtCard>
      <Box display="flex" flexDirection="row" alignItems={{ sm: 'center' }} px={6} py={3}>
        <Box display="flex" alignItems="center" mb={{ xs: 2, sm: 0 }}>
          <Tooltip title="close">
            <Box ml={-3} clone>
              <IconButton onClick={showContentList}>
                <Close />
              </IconButton>
            </Box>
          </Tooltip>
          <Typography component="div" variant="h4" className={classes.titleRoot}>
            {selectedContent.description}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" ml="auto">
          {
            <Chip
              className={classes.badge}
              style={{
                backgroundColor: '#EBEBEB',
              }}
              label={getPostType(selectedContent)}
            />
          }
        </Box>
      </Box>
      <Box className={classes.carouselRoot}>
        {selectedContent.mediaType === 'video' ? (
          <div data-vjs-player>
            <video ref={videoRef} className="video-js"></video>
          </div>
        ) : (
          <CmtCardMedia
            className={classes.imageRoot}
            image={getMediaUri(authUser, selectedContent)}
            title={selectedContent.description}
          />
        )}
      </Box>
      <Box p={6}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Box fontSize={12} color="text.disabled" display="flex" flexDirection="row" alignItems="center" mb={2}>
              <Box display="flex" flexDirection="row" alignItems="center" mr={4}>
                <PermIdentityIcon className={classes.iconRoot} /> {selectedContent.username}
              </Box>
              <Box display="flex" flexDirection="row" alignItems="center">
                <ScheduleIcon className={classes.iconRoot} /> {timeFromNow(selectedContent.createdAt)}
              </Box>
            </Box>

            <Box component="p" display="flex" flexDirection="row" mb={2} fontSize={12}>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                {selectedContent.insight?selectedContent.insight.likes:0}
                <Box component="span" color="text.secondary" mr={1}>
                  {` Likes`}
                </Box>
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                {selectedContent.insight?selectedContent.insight.comments:0}
                <Box component="span" color="text.secondary" mr={1}>
                  {` Comments`}
                </Box>
              </Box>
              <Box component="span" mr={{ xs: 3, md: 4 }}>
                {selectedContent.insight?selectedContent.insight.views:0}
                <Box component="span" color="text.secondary" mr={1}>
                  {` Views`}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box className={classes.priceWrapper}>
            <Typography component="div" variant="h6" className={classes.priceRoot}>
              {/*selectedContent.price*/}
            </Typography>
            <Box component="span" fontSize={12} color="text.secondary">
              {/*selectedContent.pricePerSqFt*/}
            </Box>
          </Box>
        </Box>
      </Box>
    </CmtCard>
  );
};

export default ContentDetail;
