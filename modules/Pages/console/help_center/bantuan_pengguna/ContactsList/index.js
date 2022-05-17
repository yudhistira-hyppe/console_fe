import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import PerfectScrollbar from 'react-perfect-scrollbar';
import AppContext from '@jumbo/components/contextProvider/AppContextProvider/AppContext';
import { getContactContainerHeight } from '@jumbo/constants/AppConstants';
import useStyles from '../index.style';
import ListTableView from './ListTableView';

const contactsList = [
    {
        'id': 124,
        'name': 'Jane_cooper',
        'problem': 'Akun tidak bisa dibuka',
        'problem_descriptions': 'Maecenas sem arcu, scelerisque in odio vel, porttitor dignissim purus.',
        'report_date': '5 Januari',
    },
    {
        'id': 125,
        'name': 'Intan_Jo',
        'problem': 'Wallet tidak bisa di sync',
        'problem_descriptions': 'Maecenas sem arcu, scelerisque in odio vel, porttitor dignissim purus.',
        'report_date': '4 Januari',
    }
]

const ContactsList = ({ width, onShowContactDetail, onClickEditContact }) => {
    const { showFooter } = useContext(AppContext);
    const dispatch = useDispatch();

    const classes = useStyles({
        height: getContactContainerHeight(width, showFooter),
    });

    return contactsList.length > 0 ? (
        <Box className={classes.inBuildAppMainContent}>
            <PerfectScrollbar className={classes.perfectScrollbarContactCon}>
                <ListTableView data={contactsList}/>
            </PerfectScrollbar>
        </Box>
    ) : (
        <Box className={classes.inBuildAppMainContent}>
            <EmptyContactResult />
        </Box>
    );
}

export default ContactsList;