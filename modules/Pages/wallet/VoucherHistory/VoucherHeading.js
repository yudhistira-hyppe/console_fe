import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles';

const header = ['Tanggal','Jenis Voucher','Status'];

const useStyles = makeStyles((theme) => ({
    tableCellRoot: {
        fontFamily: 'Lato',
        fontWeight: 'bold',
        fontSize: '16px',
        lineHeight: '16px',
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 12,
        paddingBottom: 12,
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

const VoucherHeading = () => {
    const classes = useStyles();
    return (
        <TableRow>
            {header.map((value, index) => (
                <TableCell key={index} className={classes.tableCellRoot}>{value}</TableCell>))}
        </TableRow>
    );
};

export default VoucherHeading;
