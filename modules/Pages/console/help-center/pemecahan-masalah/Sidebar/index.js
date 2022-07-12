import React from 'react';
import PropTypes from 'prop-types';
import { Box, List, ListItem } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useStyles from '../index.style';
import Inbox from '@material-ui/icons/Inbox';
import CmtList from '@coremat/CmtList';
import ItemCell from './ItemCell';
import LabelCell from './LabelCell';

const foldersList = [{ id: 1, name: 'Kotak Masuk', slug: 'inbox', icon: <Inbox /> }];

const labelsList = [
  { id: 1, name: 'Berjalan', slug: 'onprogress', color: '#FF8C00' },
  { id: 2, name: 'Selesai', slug: 'close', color: '#00C4B4' },
];

const Sidebar = ({ filters, onFolderOrLabelChange }) => {
  const classes = useStyles();

  return (
    <Box className={classes.inBuildAppSidebar}>
      <PerfectScrollbar className={classes.perfectScrollbarContactSidebar}>
        <List component="nav" className={classes.appNav}>
          <CmtList
            data={foldersList}
            renderRow={(item, index) => (
              <ItemCell
                key={index}
                item={item}
                classes={classes}
                selectedItem={filters.status ? '' : 'inbox'}
                onChange={(value) => onFolderOrLabelChange('folder', value)}
              />
            )}
          />
          <ListItem component="div" className={classes.appNavHeaderItem}>
            <Box component="span" className={classes.appNavHeaderItemText}>
              Labels
            </Box>
          </ListItem>
          <CmtList
            data={labelsList}
            renderRow={(item, index) => (
              <LabelCell
                key={index}
                item={item}
                classes={classes}
                selectedItem={filters.status}
                onChange={(value) => onFolderOrLabelChange('label', value)}
              />
            )}
          />
        </List>
      </PerfectScrollbar>
    </Box>
  );
};

Sidebar.propTypes = {
  filters: PropTypes.object,
  onFolderOrLabelChange: PropTypes.func,
};

export default Sidebar;
