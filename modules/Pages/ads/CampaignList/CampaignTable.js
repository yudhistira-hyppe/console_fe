import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import CampaignItem from "./CampaignItem";
import Box from '@material-ui/core/Box';
import CampaignHeading from "./CampaignHeading";
import {useAuth} from "../../../../authentication";

const CampaignTable = ({ tableData }) => {
    const { authUser, isLoadingUser } = useAuth();
    return (
        <Box className="Cmt-table-responsive">
            <Table>
                <TableHead>
                    <CampaignHeading />
                </TableHead>
                <TableBody>
                    {tableData.map((row, index) => (
                        <CampaignItem authUser={authUser} row={row} key={index} />
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};

export default CampaignTable;
