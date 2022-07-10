import { useRouter } from 'next/router';
import CmtCard from '../../../../../@coremat/CmtCard';
import Box from '@material-ui/core/Box';
import CmtImage from '../../../../../@coremat/CmtImage';
import { Button } from '@material-ui/core';
import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CmtCardContent from '../../../../../@coremat/CmtCard/CmtCardContent';

const useStyles = makeStyles((theme) => ({
  infoLabel: {
    fontFamily: 'Lato',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.4px',
    color: 'rgba(0, 0, 0, 0.38);',
  },
  precentageLabel: {
    fontFamily: 'Lato',
    fontSize: '16px',
    lineHeight: '24px',
    letterSpacing: '0.15px',
    color: '#E00930',
  },
  balanceLabel: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '24px',
    lineHeight: '22px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  headTitle: {
    fontFamily: 'Lato',
    fontWeight: 'bold',
    fontSize: '20px',
    lineHeight: '24px',
    color: '#202020',
  },
  summaryHistLbl: {
    fontFamily: 'Lato',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#202020',
  },
  borderInBetween: {
    borderTop: '1px solid rgba(0, 0, 0, 0.161741)',
    '&:last-child': {
      borderBottom: '1px solid rgba(0, 0, 0, 0.161741)',
    },
  },
  labelLink: {
    fontFamily: 'Lato',
    fontSize: '14px',
    fontWeight: 'bold',
    letterSpacing: '0.4px',
    color: '#AB22AF',
    textAlign: 'center',
  },
  badgeRoot: {
    color: theme.palette.common.white,
    borderRadius: 4,
    fontSize: 12,
    padding: '6px 8px',
    display: 'inline-block',
    width: '80px',
  },
  contentTitleLbl: {
    fontFamily: 'Lato',
    fontSize: '16px',
    lineHeight: '22px',
    letterSpacing: '0.15px',
    color: '#202020',
  },
}));

const DetailsCard = ({ title, contentTitle, views, likes, comments, ownership, category, date, contentType, image }) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div>
      <CmtCard className="h-full w-full">
        <CmtCardContent className="p-3">
          <div className={classes.headTitle}>{title}</div>
          <div className="mt-5">
            <div className="flex flex-row">
              <div>
                <div
                  style={{
                    width: '160px',
                    height: '130px',
                    backgroundImage: `url('${image}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}></div>
              </div>
              <div className="ml-3 flex flex-column justify-content-between">
                <Box className={classes.badgeRoot} component="span" bgcolor={'rgba(33, 33, 33, 0.08)'}>
                  <div style={{ color: 'rgba(0, 0, 0, 0.6)', fontWeight: 'bold', textAlign: 'center' }}>{contentType}</div>
                </Box>
                <div className={classes.contentTitleLbl}>{contentTitle}</div>
                <div className={classes.infoLabel}>
                  Ownership :<span style={{ color: 'black' }}>{ownership}</span>
                </div>
                <div className={classes.infoLabel}>
                  Category :<span style={{ color: 'black' }}>{category}</span>
                </div>
                <div className={classes.infoLabel}>
                  <span style={{ color: 'black' }}>{likes}</span>
                  <span> Likes | </span>
                  <span style={{ color: 'black' }}>{comments}</span>
                  <span> Comments | </span>
                  <span style={{ color: 'black' }}>{views}</span>
                  <span> Views </span>
                </div>
                <div className={classes.infoLabel}>{date}</div>
              </div>
            </div>
          </div>
        </CmtCardContent>
      </CmtCard>
    </div>
  );
};

export default DetailsCard;
