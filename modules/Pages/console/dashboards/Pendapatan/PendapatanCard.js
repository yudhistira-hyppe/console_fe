import React from 'react';

import Box from '@material-ui/core/Box';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import useStyles from './Style';
import { Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

const PendapatanCard = ({ title, amount, progress, children, secondaryTitle }) => {
  const classes = useStyles();

  const headerSubTitle = (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <div style={{ fontWeight: 'fontWeightBold', fontSize: 20, marginTop: '1rem' }}>{amount}</div>
      {progress && (
        <Box ml={2} fontSize={16} color={progress?.color && null} display="flex" flexDirection="row" alignItems="center">
          <span className="mr-1">{progress?.value && null}</span>
          {parseFloat(progress?.value && null) > 0 ? (
            <ExpandLessIcon className={classes.iconRoot} />
          ) : (
            <ExpandMoreIcon className={classes.iconRoot} />
          )}
        </Box>
      )}
    </div>
  );

  const TitleComp = () => {
    return (
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Typography variant="h6" component="p">
          {title}
        </Typography>
        <Typography style={{ fontSize: '0.8rem', border: '1px solid black', padding: '1px 5px', borderRadius: '3px' }}>
          {secondaryTitle}
        </Typography>
      </Stack>
    );
  };

  return (
    <CmtCard>
      <CmtCardHeader
        className={classes.cardHeaderRoot}
        titleProps={{
          variant: 'h6',
          component: 'div',
          className: classes.titleRoot,
        }}
        title={<TitleComp />}
        subTitle={headerSubTitle}
      />
      {children}
    </CmtCard>
  );
};

export default PendapatanCard;
