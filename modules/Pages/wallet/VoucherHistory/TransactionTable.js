import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Box from '@material-ui/core/Box';
import {useAuth} from "../../../../authentication";
import VoucherItem from "./VoucherItem";
import VoucherHeading from "./VoucherHeading";

const VoucherTable = ({ tableData }) => {
    const { authUser, isLoadingUser } = useAuth();
    return (
        <Box className="Cmt-table-responsive">
            <Table>
                <TableHead>
                    <VoucherHeading />
                </TableHead>
                <TableBody>
                    {tableData.map((row, index) => (
                        <VoucherItem row={row} key={index} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default VoucherTable;
