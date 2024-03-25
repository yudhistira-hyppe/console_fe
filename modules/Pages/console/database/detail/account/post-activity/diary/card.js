// react
import React, { useState } from 'react';

// material ui
import makeStyles from '@material-ui/core/styles/makeStyles';
import Box from '@material-ui/core/Box';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MenuItem, Popover, Select, Stack } from '@mui/material';
import { Typography } from '@material-ui/core';

// template components
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { Error, Lens } from '@material-ui/icons';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';

const useStyles = makeStyles((theme) => ({
  cardHeaderRoot: {
    paddingTop: 20,
    paddingBottom: 6,
  },
  titleRoot: {
    fontSize: 12,
    marginBottom: 2,
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightBold,
  },
  iconRoot: {
    fontSize: 14,
    display: 'block',
    marginTop: 4,
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

const ActivityPostDiaryCard = ({ title, amount, progress, children }) => {
  const classes = useStyles();

  const headerSubTitle = (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Stack direction="row" alignItems="center" gap="12px" mt="6px" height={28}>
        <Stack direction="row" alignItems="center" gap="4px">
          <Lens style={{ color: '#7438CA', fontSize: 8 }} />
          <Typography style={{ color: '#00000061', fontSize: 12, fontWeight: 'bold' }}>Views</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap="4px">
          <Lens style={{ color: '#CB76CD', fontSize: 8 }} />
          <Typography style={{ color: '#00000061', fontSize: 12, fontWeight: 'bold' }}>Likes</Typography>
        </Stack>
      </Stack>
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

  const TitleComp = (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography variant="h4" component="div">
        {title}
      </Typography>
    </Stack>
  );

  return (
    <CmtCard>
      <CmtCardHeader
        className={classes.cardHeaderRoot}
        titleProps={{
          variant: 'h6',
          component: 'div',
          className: classes.titleRoot,
        }}
        title={TitleComp}
        subTitle={headerSubTitle}
      />
      {children}
    </CmtCard>
  );
};

export default ActivityPostDiaryCard;
