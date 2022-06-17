import React from 'react';
import { Box } from '@material-ui/core';
import CmtTimeLine from '../../../../@coremat/CmtTimeLine';
import CmtTimeLineItem from '../../../../@coremat/CmtTimeLine/CmtTimeLineItem';
import CmtTimelineContent from '../../../../@coremat/CmtTimeLine/CmtTimelineContent';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtImage from '../../../../@coremat/CmtImage';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  timelineView: {
    position: 'relative',
    '& .Cmt-timeline-item': {
      paddingLeft: 64,
      '&:before': {
        left: 20,
      },
      '&:first-child:before, &:last-child:before': {
        borderLeftStyle: 'solid',
      },
      '& .Cmt-timeline-badge': {
        transition: 'all 0.3s ease',
        transform: 'scale(1)',
      },
      '&:hover': {
        '& .Cmt-timeline-badge': {
          boxShadow: '0 4px 8px rgba(0,0,0,.45)',
          transform: 'scale(1.2)',
        },
      },
    },
    '& .Cmt-timeline-badge': {
      top: 0,
      width: 40,
      height: 40,
    },
  },
  titleRoot: {
    fontWeight: theme.typography.fontWeightRegular,
    letterSpacing: 0.5,
    marginBottom: 4,
    cursor: 'pointer',
  },
  subTitleRoot: {
    fontSize: 12,
    letterSpacing: 0.4,
    color: theme.palette.text.secondary,
  },
  dateRoot: {
    fontSize: 12,
    letterSpacing: 0.4,
    color: theme.palette.text.disabled,
    textAlign: 'right',
  },
  circleBackground: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#AB22AF',
  },
}));

const formatDate = (date) => {
  return new Date(date.createdAt.split(' ')[0]).toLocaleString('en-us', {
    month: 'short',
    year: 'numeric',
    day: 'numeric',
  });
};

const NotificationData = ({ data }) => {
  console.log('data:', data)
  const classes = useStyles();
  return (
    <Box className={classes.timelineView}>
      <CmtTimeLine align={'left'}>
        {data?.map((item, index) => (
          <CmtTimeLineItem
            key={index}
            point={<CmtImage src={'/images/dashboard/notif-icon.svg'} />}
            pointColor={'#AB22AF'}
            content={
              <CmtTimelineContent isWrapper={false}>
                <Box display="flex">
                  <Box>
                    <Typography className={classes.titleRoot} component="div" variant="h4" mt={0}>
                      {/* {item.title} */}
                      {item.eventType}
                    </Typography>
                    <Typography component="p" className={classes.subTitleRoot} mt={0}>
                      {item.title} {item.body}
                    </Typography>
                  </Box>
                  <Box component="span" className={classes.dateRoot} ml="auto">
                    {formatDate(item)}
                  </Box>
                </Box>
              </CmtTimelineContent>
            }
          />
        ))}
      </CmtTimeLine>
    </Box>
  );
};

export default NotificationData;
