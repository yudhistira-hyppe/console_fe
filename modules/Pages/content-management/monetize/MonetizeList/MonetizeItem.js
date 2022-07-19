import React, { useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import clsx from 'clsx';
import { alpha, makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Modal, Switch, TextField, Tooltip, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { RemoveRedEye, Delete, Edit, TrendingUp } from '@material-ui/icons';
import CmtImage from '../../../../../@coremat/CmtImage';
import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { Stack } from '@mui/material';
// import { useUserContentUpdateQuery } from 'api/user/content';
import { usePostUpdatePriceMutation } from 'api/user/content/management';

const useStyles = makeStyles((theme) => ({
  tableRowRoot: {
    border: 'none',
    position: 'relative',
    transition: 'all .2s',
    // borderTop: `solid 1px ${theme.palette.borderColor.main}`,
    // '&:last-child': {
    //   borderBottom: `solid 1px ${theme.palette.borderColor.main}`,
    // },
  },
  tableCellRoot: {
    padding: 16,
    fontSize: 14,
    fontFamily: 'Lato',
    letterSpacing: 0.25,
    color: 'rgba(0, 0, 0, 0.6)',
    // borderBottom: '0 none',
    position: 'relative',
    '&:first-child': {
      paddingLeft: 24,
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
    width: '80px',
  },
  subInfo: {
    fontFamily: 'Lato',
    fontSize: '12px',
    lineHeight: '16px',
    letterSpacing: '0.25px',
    color: 'rgba(0, 0, 0, 0.6)',
  },
}));

function getBgColor(status) {
  const color = {
    sent: '#9BE7FD',
    receive: '#D7F5B1',
  };
  return color[status];
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const MonetizeItem = ({ row, onClicked }) => {
  const { authUser } = useAuth();
  const [tesState, setTesState] = useState(null);
  const [price, setPrice] = useState(tesState?.saleAmount);
  const [payload, setPayload] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();
  const label = { inputProps: { 'aria-label': 'Switch Monetize' } };

  const getMediaUri = () => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.email}`;
    const mediaURI = '/thumb/' + row?.postID;

    return `${STREAM_URL}${mediaURI}${authToken}`;
  };

  const [updateComment, { isSuccess, isLoading, isError }] = usePostUpdatePriceMutation();

  return (
    <TableRow className={classes.tableRowRoot} hover>
      <TableCell className={classes.tableCellRoot}>
        <div className="flex flex-row align-items-center align-content-center">
          {/* <CmtImage alt={row.name} src={row.contentImage} /> */}
          <div
            style={{
              width: '100px',
              height: '100px',
              backgroundImage: `url('${getMediaUri()}')`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}></div>
          <div className="ml-1">{row.title}</div>
        </div>
      </TableCell>
      <TableCell className={classes.tableCellRoot}>{row?.createdAt}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row?.postType}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row?._id}</TableCell>
      <TableCell className={classes.tableCellRoot}>{row?._id}</TableCell>
      <TableCell className={classes.tableCellRoot}>
        <div className="flex flex-row align-items-center">
          <div>{row?.saleAmount}</div>

          <Edit
            onClick={() => {
              setTesState(onClicked());
              handleOpen();
            }}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
              <center>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Ubah Harga Konten ID : <br />
                  <span style={{ background: '#aa22af', color: '#fff', padding: '5px 10px', borderRadius: '5px' }}>
                    {tesState?._id}
                  </span>
                </Typography>
                <TextField
                  style={{ marginTop: '5%' }}
                  defaultValue={tesState?.saleAmount}
                  onChange={(e) => setPrice(e.target.value)}
                  id="outlined-basic"
                  label="Harga"
                  size="small"
                  variant="outlined"
                />
                <Stack direction="row" justifyContent="center" alignItems="center" spacing={1} style={{ marginTop: '5%' }}>
                  <Button variant="contained" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      updateComment({ saleAmount: price, postID: tesState?._id });
                      setOpen(false);
                    }}
                    style={{ background: '#aa22af', color: '#fff' }}>
                    Save
                  </Button>
                </Stack>
              </center>
            </Box>
          </Modal>
        </div>
      </TableCell>
      <TableCell className={classes.tableCellRoot}>
        <TrendingUp />
      </TableCell>
    </TableRow>
  );
};

export default MonetizeItem;
