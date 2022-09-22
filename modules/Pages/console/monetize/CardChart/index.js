import CmtCard from '@coremat/CmtCard';
import React from 'react';
import { Stack } from '@mui/system';
import { Typography } from '@mui/material';
import UserActiveGraph from './GraphicChart';
import { makeStyles } from '@material-ui/styles';
import { Button, Popper, Paper, ClickAwayListener, Grow } from '@material-ui/core';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';

import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { DateRangePickerDay as MuiDateRangePickerDay } from '@mui/x-date-pickers-pro/DateRangePickerDay';
import Box from '@mui/material/Box';

const DateRangePickerDay = styled(MuiDateRangePickerDay)(
  ({ theme, isHighlighting, isStartOfHighlighting, isEndOfHighlighting }) => ({
    ...(isHighlighting && {
      borderRadius: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
    ...(isStartOfHighlighting && {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%',
    }),
    ...(isEndOfHighlighting && {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%',
    }),
  }),
);

const useStyles = makeStyles((theme) => ({
  cardGraph: {
    height: '13em',
    flex: 1,
    overflow: 'visible',
  },
}));

const GraphChart = ({ title, amount, dataChart, colorStop1, colorStop2, colorGradient, dataKey, setStatusList, status }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([null, null]);
  const [showDate, setShowDate] = React.useState(false);
  const [showType, setShowType] = React.useState(null);
  const classes = useStyles();
  const anchorRef = React.useRef();
  const prevOpen = React.useRef(open);

  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef?.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const handleClose = (newValue) => {
    if (showType === 'harian' && newValue[0] !== null){
      setOpen(false);
      setShowDate(false);
    } else if (showType !== 'harian' && newValue[0] && newValue[1]){
      setOpen(false);
      setShowDate(false);
    }
    console.log(value);
    setStatusList(showType);
    // if (!e.target.id) {
    //   setOpen(false);
    // }
    // setStatusList(e.target.id);
  };

  const renderWeekPickerDay = (date, dateRangePickerDayProps) => {
    return <DateRangePickerDay {...dateRangePickerDayProps} />;
  };

  const onDateChangeHandler = (newValue) => {
    setValue(newValue);
    handleClose(newValue);
  };

  const onShowTypeChangeHandler = (e) => {
    if (e.target.id !== 'semua'){
      setShowDate(true);
      setShowType(e.target.id);
    }
  };

  return (
    <CmtCard className={classes.cardGraph}>
      <Stack px={2} py={2} direction="row" justifyContent={'space-between'}>
        <Stack flex={1} direction="row">
          <Typography>{title}</Typography>
        </Stack>
        <Stack flex={1} justifyContent="flex-end" direction="row">
          <div>
            <Button
              ref={anchorRef}
              variant="outlined"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={() => {
                setOpen((val) => !val);
                setValue([null, null]);
              }}
              style={{
                fontSize: '0.7rem',
                // border: '1px solid black',
                padding: '1px 18px',
                borderRadius: '4px',
                backgroundColor: '#F2F2F2',
              }}>
              {status}
            </Button>
          </div>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
            style={{ backgroundColor: 'white', zIndex: 10 }}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}>
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}>
                      <MenuItem>
                        <Typography variant="body2" id="semua" onClick={onShowTypeChangeHandler}>
                          Semua
                        </Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant="body2" id="harian" onClick={onShowTypeChangeHandler}>
                          Harian
                        </Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant="body2" id="mingguan" onClick={onShowTypeChangeHandler}>
                          Mingguan
                        </Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant="body2" id="bulanan" onClick={onShowTypeChangeHandler}>
                          Bulanan
                        </Typography>
                      </MenuItem>
                      <MenuItem>
                        <Typography variant="body2" id="rentang" onClick={onShowTypeChangeHandler}>
                          Rentang
                        </Typography>
                      </MenuItem>
                      <div>
                        {showDate && showType && (
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <StaticDateRangePicker
                              displayStaticWrapperAs="desktop"
                              label="date range"
                              value={value}
                              onChange={onDateChangeHandler}
                              renderDay={renderWeekPickerDay}
                              renderInput={(startProps, endProps) => (
                                <React.Fragment>
                                  <TextField {...startProps} />
                                  <Box sx={{ mx: 2 }}> to </Box>
                                  <TextField {...endProps} />
                                </React.Fragment>
                              )}
                            />
                          </LocalizationProvider>
                        )}
                      </div>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </Stack>
      </Stack>
      <Stack px={2}>
        <Typography fontWeight={'bold'}>{amount}</Typography>
      </Stack>
      {dataChart ? (
        <UserActiveGraph
          dataChart={dataChart}
          colorStop1={colorStop1}
          colorStop2={colorStop2}
          colorGradient={colorGradient}
          dataKey={dataKey}
        />
      ) : null}
    </CmtCard>
  );
};

export default GraphChart;
