import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import clsx from 'clsx';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { IconButton, Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import CmtDropdownMenu from '../../../../@coremat/CmtDropdownMenu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CmtAvatar from '../../../../@coremat/CmtAvatar';
import CmtMediaObject from '../../../../@coremat/CmtMediaObject';
import {STREAM_URL} from "../../../../authentication/auth-provider/config";

const useStyles = makeStyles((theme) => ({
    tableRowRoot: {
        position: 'relative',
        transition: 'all .2s',
        borderTop: `solid 1px ${theme.palette.borderColor.main}`,
        '&:last-child': {
            borderBottom: `solid 1px ${theme.palette.borderColor.main}`,
        },
    },
    tableCellRoot: {
        padding: 16,
        fontSize: 14,
        letterSpacing: 0.25,
        color: theme.palette.text.secondary,
        borderBottom: '0 none',
        position: 'relative',
        '&:first-child': {
            paddingLeft: 24,
        },
        '&:last-child': {
            textAlign: 'right',
            color: theme.palette.error.main,
            paddingRight: 24,
        },
        '&.success': {
            color: theme.palette.success.main,
        },
        '& .Cmt-media-object': {
            alignItems: 'center',
        },
    },
    badgeRoot: {
        color: theme.palette.common.white,
        borderRadius: 30,
        fontSize: 12,
        padding: '2px 10px',
        display: 'inline-block',
    },
}));

const actions = [
    {
        label: 'View Order',
    },
    {
        label: 'More',
    },
];

function getBgColor(status) {
    const color = {
        cancelled: '#E00930',
        completed: '#0795F4',
        delayed: '#03DAC5',
        onHold: '#FF8C00',
    };
    return color[status];
}

const CampaignItem = ({authUser, row }) => {
    const classes = useStyles();
    const getMediaUri = () => {
        const authToken = '?x-auth-token=' + authUser.token + '&x-auth-user=' + authUser.email;
        const httpUri = STREAM_URL + row.ImageUri + authToken;
        return httpUri;
    };
    return (
        <TableRow className={classes.tableRowRoot}>
            <TableCell className={classes.tableCellRoot}>{row.Status}</TableCell>
            <TableCell className={classes.tableCellRoot}>
                <CmtMediaObject
                    avatarPos="center"
                    avatar={<CmtAvatar size={35} src={getMediaUri()} alt={row.Name} />}
                    title={row.Name}
                    titleProps={{
                        variant: 'h5',
                        className: classes.titleRoot,
                    }}
                />
            </TableCell>
            <TableCell className={classes.tableCellRoot}>{row.Placement}</TableCell>
            <TableCell className={classes.tableCellRoot}>{row.ShowPlan}</TableCell>
            <TableCell className={classes.tableCellRoot}>{row.Budget}</TableCell>
            <TableCell className={classes.tableCellRoot}>{row.Impression}</TableCell>
            <TableCell className={classes.tableCellRoot}>{row.CPV}</TableCell>
            <TableCell className={classes.tableCellRoot}>{row.Trafic}</TableCell>
            <TableCell className={classes.tableCellRoot}>{row.CTA}</TableCell>
            <TableCell className={classes.tableCellRoot}>{row.EndDate}</TableCell>
        </TableRow>
    );
};

export default CampaignItem;
