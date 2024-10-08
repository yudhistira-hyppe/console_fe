import React, { cloneElement, isValidElement, useEffect, useMemo, useState } from 'react';
import { List, ListItem } from '@material-ui/core';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { useRouter } from 'next/router';
import NavMenuItem from './NavMenuItem';
import useStyles from './NavCollapse.style';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import { isUrlInChildren } from '../../CmtHelpers/JssHelper';

const NavCollapse = (props) => {
  const router = useRouter();
  const classes = useStyles();

  const { name, icon, className, children = [] } = props;
  const isExpandable = useMemo(() => children.length, [children]);
  const [open, setOpen] = useState(false);
  const [hoverIcon, setHover] = useState(false);

  useEffect(() => {
    if (isUrlInChildren(props, router.pathname)) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [props, router.pathname]);

  const renderIcon = () => {
    if (icon && isValidElement(icon)) {
      return cloneElement(icon, {
        className: clsx(classes.iconRoot, 'Cmt-icon-root'),
      });
    }

    return null;
  };

  const MenuItemChildren = isExpandable ? (
    <List component="div" disablePadding className={classes.navCollapseItem}>
      {children.map((item, index) => {
        switch (item.type) {
          case 'collapse':
            return <NavCollapse {...item} key={index} className={classes.subCollapse} />;
          case 'item':
            return <NavMenuItem {...item} key={index} isChild={isExpandable} />;
          default:
            return null;
        }
      })}
    </List>
  ) : null;

  const MenuCollapse = (
    <ListItem
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      id="menu-collapse"
      component="div"
      disableGutters
      className={clsx(classes.navCollapseBtn, `${open ? 'active' : ''}`, 'Cmt-navCollapseBtn')}>
      <Box component="span" className={`${classes.navCollapseBtnInner}`}>
        {renderIcon()}
        <Box component="span" className={classes.navText}>
          {name}
        </Box>
        {/* Display the expand menu if the item has children */}
        {isExpandable && !hoverIcon && <ArrowDropDownIcon className={classes.navArrow} />}
        {isExpandable && hoverIcon && <ArrowDropUpIcon className={classes.navArrow} />}
        {/* Display an icon if any */}
      </Box>
      {MenuItemChildren}
    </ListItem>
  );

  return (
    <Box className={clsx(classes.navCollapse, 'Cmt-navCollapse', className, `${open ? 'active' : ''}`)}>{MenuCollapse}</Box>
  );
};

export default NavCollapse;
