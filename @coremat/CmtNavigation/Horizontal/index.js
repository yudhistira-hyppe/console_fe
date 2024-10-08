import React from 'react';
import { List } from '@material-ui/core';
import NavMenuItem from './NavMenuItem';
import NavCollapse from './NavCollapse';
import NavMega from './NavMega';
import makeStyles from '@material-ui/core/styles/makeStyles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  horizontalNavMenu: {
    position: 'relative',
    display: 'flex',
    height: 46,
    alignItems: 'center',
    gap: 20,
  },
}));

const CmtHorizontal = (props) => {
  const { menuItems } = props;
  const classes = useStyles();
  return (
    <List component="nav" disablePadding className={clsx(classes.horizontalNavMenu, 'Cmt-horizontalNavMenu')}>
      {menuItems.map((item, index) => {
        switch (item.type) {
          case 'collapse':
            return <NavCollapse {...item} key={index} />;
          case 'mega':
            return <NavMega {...item} key={index} />;
          case 'item':
            return <NavMenuItem {...item} key={index} />;
          default:
            return null;
        }
      })}
    </List>
  );
};

export default CmtHorizontal;
