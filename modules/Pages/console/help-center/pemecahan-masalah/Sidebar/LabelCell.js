import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import LabelIcon from '@material-ui/icons/Label';
import ListItemText from '@material-ui/core/ListItemText';

const LabelCell = ({ classes, item, selectedItem, onChange }) => {
  return (
    <ListItem
      button
      className={clsx(classes.appNavItem, classes.appTaskNavItem, {
        active: item.slug === selectedItem,
      })}
      onClick={() => onChange(item.slug)}>
      <ListItemIcon className="Cmt-icon-root">
        {item.icon ? item.icon : <LabelIcon style={{ color: item.color }} />}
      </ListItemIcon>
      <ListItemText className="Cmt-nav-text" primary={item.name} />
    </ListItem>
  );
};

LabelCell.propTypes = {
  classes: PropTypes.object,
  item: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  selectedItem: PropTypes.string,
};

LabelCell.defaultProps = {
  selectedItem: '',
};

export default LabelCell;
