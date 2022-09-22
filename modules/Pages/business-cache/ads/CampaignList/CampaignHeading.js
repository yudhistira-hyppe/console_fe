import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CampaignItem from "./CampaignItem";

const header = ['Status', 'Ads Name','Placement','Show Plan','Budget','Impression','CPV','Trafic','CTA','End Date'];

const useStyles = makeStyles((theme) => ({
    tableCellRoot: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 0,
        paddingBottom: 12,
        fontSize: 12,
        letterSpacing: 0.4,
        color: theme.palette.common.dark,
        borderBottom: '0 none',
        '&:first-child': {
            paddingLeft: 24,
        },
        '&:last-child': {
            textAlign: 'right',
            paddingRight: 24,
        },
    },
}));

const CampaignHeading = () => {
    const classes = useStyles();
    return (
        <TableRow>
            {header.map((value, index) => (<TableCell className={classes.tableCellRoot}>{value}</TableCell>))}
        </TableRow>
    );
};

export default CampaignHeading;
