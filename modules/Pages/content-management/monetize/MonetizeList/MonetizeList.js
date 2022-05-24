import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Box from '@material-ui/core/Box';
import MonetizeItem from "./MonetizeItem";
import MonetizeHeading from "./MonetizeHeading";

const MonetizeList = ({ tableData }) => {
    return (
        <Box className="Cmt-table-responsive">
            <Table>
                <TableHead>
                    <MonetizeHeading />
                </TableHead>
                <TableBody>
                    {tableData.map((row, index) => (
                        <MonetizeItem row={row} key={index} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default MonetizeList;
