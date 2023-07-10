import { Typography } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Box, Button, Divider, IconButton, ListItemText, MenuItem, MenuList, Modal, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { DateRange as DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 870,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
};

const ModalChooseDate = ({ open, dataPayload, onClose, onSubmit }) => {
  const [tab, setTab] = useState('1');
  const [payload, setPayload] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    setTab(1);
    setPayload([
      {
        startDate: dataPayload?.[0]?.startDate ? dayjs(dataPayload?.[0]?.startDate).toDate() : new Date(),
        endDate: dataPayload?.[0]?.endDate ? dayjs(dataPayload?.[0]?.endDate).toDate() : new Date(),
        key: 'selection',
      },
    ]);
  }, [open]);

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column">
          <Stack
            direction="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
            style={{ padding: 20, borderBottom: '1px solid #0000001f' }}>
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Rentang Waktu</Typography>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </Stack>

          <Stack direction="row" style={{ borderBottom: '1px solid #0000001f' }}>
            <MenuList style={{ width: '100%' }}>
              <MenuItem
                selected={tab == 1}
                onClick={() => {
                  setTab(1);
                  setPayload([
                    {
                      startDate: new Date(),
                      endDate: new Date(),
                      key: 'selection',
                    },
                  ]);
                }}
                sx={{
                  padding: '10px 16px',
                  '&.Mui-selected': {
                    borderLeft: '4px solid #AB22AF',
                    color: '#AB22AF',
                    fontWeight: 'bold',
                    background: 'initial',
                  },
                }}>
                <ListItemText>
                  <Typography style={{ textAlign: 'center' }}>Kustom</Typography>
                </ListItemText>
              </MenuItem>
              <MenuItem
                selected={tab == 2}
                onClick={() => {
                  setTab(2);
                  setPayload([
                    {
                      startDate: dayjs().subtract(6, 'day').toDate(),
                      endDate: new Date(),
                      key: 'selection',
                    },
                  ]);
                }}
                sx={{
                  padding: '10px 16px',
                  '&.Mui-selected': {
                    borderLeft: '4px solid #AB22AF',
                    color: '#AB22AF',
                    fontWeight: 'bold',
                    background: 'initial',
                  },
                }}>
                <ListItemText>
                  <Typography style={{ textAlign: 'center' }}>7 Hari Terakhir</Typography>
                </ListItemText>
              </MenuItem>
              <MenuItem
                selected={tab == 3}
                onClick={() => {
                  setTab(3);
                  setPayload([
                    {
                      startDate: dayjs().subtract(13, 'day').toDate(),
                      endDate: new Date(),
                      key: 'selection',
                    },
                  ]);
                }}
                sx={{
                  padding: '10px 16px',
                  '&.Mui-selected': {
                    borderLeft: '4px solid #AB22AF',
                    color: '#AB22AF',
                    fontWeight: 'bold',
                    background: 'initial',
                  },
                }}>
                <ListItemText>
                  <Typography style={{ textAlign: 'center' }}>14 Hari Terakhir</Typography>
                </ListItemText>
              </MenuItem>
              <MenuItem
                selected={tab == 4}
                onClick={() => {
                  setTab(4);
                  setPayload([
                    {
                      startDate: dayjs().subtract(29, 'day').toDate(),
                      endDate: new Date(),
                      key: 'selection',
                    },
                  ]);
                }}
                sx={{
                  padding: '10px 16px',
                  '&.Mui-selected': {
                    borderLeft: '4px solid #AB22AF',
                    color: '#AB22AF',
                    fontWeight: 'bold',
                    background: 'initial',
                  },
                }}>
                <ListItemText>
                  <Typography style={{ textAlign: 'center' }}>30 Hari Terakhir</Typography>
                </ListItemText>
              </MenuItem>
            </MenuList>
            <Divider orientation="vertical" flexItem />
            <DateRangePicker
              onChange={(item) => {
                setPayload([item.selection]);
                setTab(1);
              }}
              dragSelectionEnabled={false}
              moveRangeOnFirstSelection={false}
              months={2}
              editableDateInputs={false}
              showDateDisplay={false}
              ranges={payload}
              rangeColors={['#AB22AF']}
              direction="horizontal"
            />
          </Stack>

          <Stack direction="row" justifyContent="flex-end" alignItems="center" gap={2} style={{ padding: 20 }}>
            <Button variant="outlined" color="secondary" style={{ borderRadius: 6, padding: '10px 20px' }} onClick={onClose}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Batal</Typography>
            </Button>
            <Button
              variant="contained"
              color="secondary"
              style={{ borderRadius: 6, padding: '10px 20px' }}
              onClick={() => onSubmit(payload)}>
              <Typography style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: 14 }}>Terapkan</Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalChooseDate;
