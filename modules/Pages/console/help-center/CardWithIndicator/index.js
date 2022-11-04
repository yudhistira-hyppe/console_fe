import React from 'react';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtAdvCardContent from '@coremat/CmtAdvCard/CmtAdvCardContent';
import { Button, CardContent, ClickAwayListener, Grow, makeStyles, Paper, Popper, Typography } from '@material-ui/core';
import { Stack } from '@mui/material';
import ActionButtons from './ActionButtons';
import OverallBalance from './OverAllBalances';
import PortfolioDetails from './PortofolioDetails';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@mui/material/MenuItem';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  subTitle: {
    color: theme.palette.text.secondary,
  },
  cardAdvRoot: {
    paddingTop: 0,
  },
}));

const Card = ({
  headTitle,
  TypeProblem,
  numberOfProblem,
  pathIconLeft,
  iconLabelLeft,
  iconLabelRight,
  onClick,
  data,
  status,
  setStatusList,
  isFetching,
}) => {
  const classes = useStyles();

  const Title = () => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
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

    const handleClose = (e) => {
      setOpen(false);
      setStatusList(e.target.id);
    };

    return (
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          {pathIconLeft && <img src={pathIconLeft} alt="icon" />}{' '}
          <Typography variant="h4" component="span" style={{ marginLeft: '7px' }}>
            {headTitle}
          </Typography>
          {iconLabelRight && <img src="/images/icons/small-info.svg" style={{ marginLeft: '7px' }} />}
        </div>
        <Button
          ref={anchorRef}
          variant="outlined"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={() => setOpen((val) => !val)}
          style={{
            fontSize: '0.7rem',
            // border: '1px solid black',
            padding: '1px 18px',
            borderRadius: '4px',
            backgroundColor: '#F2F2F2',
          }}>
          {status}
        </Button>
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
                    <MenuItem id="semua" onClick={handleClose}>
                      Semua
                    </MenuItem>
                    <MenuItem id="harian" onClick={handleClose}>
                      Harian
                    </MenuItem>
                    <MenuItem id="mingguan" onClick={handleClose}>
                      Mingguan
                    </MenuItem>
                    <MenuItem id="bulanan" onClick={handleClose}>
                      Bulanan
                    </MenuItem>
                    <MenuItem id="rentang" onClick={handleClose}>
                      Rentang
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Stack>
    );
  };

  return (
    <>
      <CmtAdvCard>
        <CardContent>
          <Title />
        </CardContent>
        <CmtAdvCardContent
          title={
            isFetching ? <Skeleton width={'3em'} height={'3em'} /> : <OverallBalance numberOfProblem={numberOfProblem} />
          }
          subTitle={isFetching ? <Skeleton width={'9em'} /> : TypeProblem}
          subTitleProps={{
            variant: 'body2',
            component: 'p',
            className: classes.subTitle,
          }}
          extraContent={<ActionButtons onClick={onClick} isFetching={isFetching} column={data.length} />}
          reverseDir
          className={classes.cardAdvRoot}>
          {!isFetching ? (
            <PortfolioDetails
              // title={'Portfolio Distribution'}
              data={data}
            />
          ) : (
            <div>
              <Skeleton width={'5em'} />
              <Skeleton />
              <Skeleton width={'5em'} />
              <Skeleton />
              <Skeleton width={'5em'} />
              <Skeleton />
              <Skeleton width={'5em'} />
              <Skeleton />
            </div>
          )}
        </CmtAdvCardContent>
      </CmtAdvCard>
    </>
  );
};

export default Card;
