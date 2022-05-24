import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import Box from '@material-ui/core/Box';
import {useAuth} from "../../../../authentication";
import ContentHeading from "./ContentHeading";
import ContentItem from "./ContentItem";

const ContentTable = ({ tableData }) => {
    const { authUser, isLoadingUser } = useAuth();
    return (
        <Box className="Cmt-table-responsive">
            <Table>
                <TableHead>
                    <ContentHeading />
                </TableHead>
                <TableBody>
                    {tableData.map((row, index) => (
                        <ContentItem authUser={authUser} row={row} key={index} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default ContentTable;
