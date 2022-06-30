import React from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TransactionItem from './TransactionItem';
import Box from '@material-ui/core/Box';
import TransactionHeading from './TransactionHeading';
import { useAuth } from '../../../../authentication';

const TransactionTable = ({ tableData }) => {
  const { authUser, isLoadingUser } = useAuth();
  return (
    <Box className="Cmt-table-responsive">
      <Table>
        <TableHead>
          <TransactionHeading />
        </TableHead>
        <TableBody>
          {tableData?.data?.length === 0 ? (
            <div style={{ position: 'absolute', top: '50%', left: '45%' }}>data kosong</div>
          ) : (
            ''
          )}
          {tableData?.data?.map((row, index) => (
            <TransactionItem authUser={authUser} row={row} key={index} />
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TransactionTable;
