import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles';

const header = ['Detail Content','Content Type','Waktu', 'Content ID','Views', 'Likes', 'Share', 'Ownership Certificate Number', 'Monetize'];

const useStyles = makeStyles((theme) => ({
    tableCellRoot: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '16px',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 20,
        paddingBottom: 20,
        fontSize: 12,
        letterSpacing: 0.4,
        color: 'black',
        borderTop: `solid 1px ${theme.palette.borderColor.main}`,
        borderBottom: '0 none',
        '&:first-child': {
            paddingLeft: 24,
        },
        '&:last-child': {
            paddingLeft: 30
        },
    },
}));

const ContentHeading = () => {
    const classes = useStyles();
    return (
        <TableRow>
            {header.map((value, index) => (
                <TableCell key={index} className={classes.tableCellRoot}>{value}</TableCell>))}
        </TableRow>
    );
};

export default ContentHeading;
