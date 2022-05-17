import React, { useContext } from 'react';
const { Box, List, withWidth, ListItem } = require("@material-ui/core");
import { useDispatch, useSelector } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useStyles from '../index.style';
import Inbox from '@material-ui/icons/Inbox';
import StarIcon from '@material-ui/icons/Star';
import MailOutlineOutlined from '@material-ui/icons/MailOutlineOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import CmtList from '@coremat/CmtList';
import { getAppSidebarHeight } from '@jumbo/constants/AppConstants';
import AppContext from '@jumbo/components/contextProvider/AppContextProvider/AppContext';
import PropTypes from 'prop-types';
import ItemCell from './ItemCell';
import LabelCell from './LabelCell';

import { setFilterType } from 'redux/actions/helpCenterAction';

const foldersList = [
    { id: 1, name: 'Kotak Masuk', slug: 'inbox', icon: <Inbox /> },
    { id: 2, name: 'Terkirim', slug: 'sent', icon: <StarIcon /> },
    { id: 3, name: 'Draf', slug: 'draft', icon: <MailOutlineOutlined /> },
    { id: 6, name: 'Sampah', slug: 'trash', icon: <DeleteIcon /> },
];

const labelsList = [
    { id: 1, name: 'Berjalan', slug: 'running', color: '#FF8C00' },
    { id: 2, name: 'Selesai', slug: 'done', color: '#00C4B4' },
];

const Sidebar = ({ onClickCreateContact, width }) => {
    const { isSideBarCollapsed, filterType } = useSelector((state) => state.helpCenterReducers);
    const { showFooter } = useContext(AppContext);
    const dispatch = useDispatch();

    const classes = useStyles({
        isCollapsed: isSideBarCollapsed,
        height: getAppSidebarHeight(width, showFooter)
    });

    const onChangeFolder = (folder) => {
        dispatch(
          setFilterType({
            selectedFolder: folder,
            selectedLabel: '',
            searchText: '',
          }),
        );
      };
    
      const onChangeLabel = (label) => {
        dispatch(
          setFilterType({
            selectedFolder: '',
            selectedLabel: label,
            searchText: '',
          }),
        );
      };

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
                                selectedItem={filterType.selectedFolder}
                                onChange={onChangeFolder}
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
                                selectedItem={filterType.selectedLabel}
                                onChange={onChangeLabel}
                            />
                        )}
                    />

                </List>
            </PerfectScrollbar>
        </Box>
    )
}

export default withWidth()(Sidebar);

Sidebar.prototype = {
  onClickCreateContact: PropTypes.func,
};
