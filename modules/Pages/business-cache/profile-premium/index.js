import GridContainer from '@jumbo/components/GridContainer';
import { Box, Button, Chip, Grid, Typography } from '@material-ui/core';
import { alpha, makeStyles } from '@material-ui/core/styles';
import Contact from './Contact';
import TabList from './TabsList';
import Header from './Header';
import { useAuth } from 'authentication';
import { useGetProfileByUserEmailQuery } from 'api/user/user';
import { Stack } from '@mui/material';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CmtList from '@coremat/CmtList';
import CommentItem from '../dashboards/Comments/CommentItem';
import Member from './Member';
import CmtAvatar from '@coremat/CmtAvatar';

const useStyles = makeStyles((theme) => ({
  pageFull: {
    width: '100%',
  },
  profileSidebar: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  profileMainContent: {
    '@media screen and (min-width: 1280px) and (max-width: 1499px)': {
      flexBasis: '100%',
      maxWidth: '100%',
    },
  },
  cardRoot: {
    position: 'relative',
    '& .Cmt-card-content': {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  scrollbarRoot: {
    height: 300,
    marginRight: -24,
    paddingRight: 24,
    marginLeft: -24,
    paddingLeft: 24,
    marginTop: 13,
    paddingTop: 5,
  },
  chipRoot: {
    backgroundColor: alpha(theme.palette.primary.main, 0.1),
    color: theme.palette.primary.main,
    letterSpacing: 0.25,
    fontSize: 14,
  },
}));

const dataTesting = [
  {
    name: 'agus',
    id: 'example@gmail.com',
    image: '/images/pp.png',
  },
  {
    name: 'suparwan',
    id: 'example@gmail.com',
    image: '/images/pp.png',
  },
  {
    name: 'anto',
    id: 'example@gmail.com',
    image: '/images/pp.png',
  },
  {
    name: 'siti',
    id: 'example@gmail.com',
    image: '/images/pp.png',
  },
  {
    name: 'supardi',
    id: 'example@gmail.com',
    image: '/images/pp.png',
  },
  {
    name: 'agus',
    id: 'example@gmail.com',
    image: '/images/pp.png',
  },
];

const ProfileBasic = () => {
  const classes = useStyles();
  const { authUser } = useAuth();
  const { data: ProfileBasic } = useGetProfileByUserEmailQuery(authUser.user.email);
  return (
    <>
      <GridContainer>
        <Grid item xs={12} lg={12} className={classes.profileSidebar}>
          <Box>
            <Header dataUser={ProfileBasic} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4} className={classes.profileSidebar}>
          <Box mb={6}>
            <Contact dataUser={ProfileBasic} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={8} className={classes.profileMainContent}>
          <Box mb={6}>
            <TabList dataUser={ProfileBasic} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}></Grid>
        <Grid item xs={12} lg={8} className={classes.profileMainContent}>
          <Box sx={{ justifyContent: 'flex-end' }}>
            <CmtCard className={classes.cardRoot}>
              <CmtCardHeader
                title={
                  <>
                    <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems="center">
                      <Box mr={{ sm: 4, md: 5, lg: 6 }} mb={{ xs: 3, sm: 0 }}>
                        <img src={'/images/icons/people.svg'} alt={'pict'} />
                      </Box>
                      <Box>
                        <Typography>
                          <small>4 Family Members</small> <br />
                          <div style={{ fontSize: '0.8rem', maxWidth: '70%', color: 'rgba(0, 0, 0, 0.6)' }}>
                            When you Invite team members to join your workspace, they receive a confirmation. you can add 4
                            team members to your organization
                          </div>
                        </Typography>
                      </Box>
                    </Box>
                  </>
                }>
                <Button variant="outlined" style={{ background: '#aa22af', color: '#FFFFFF', border: 'none' }}>
                  Invite Member
                </Button>
              </CmtCardHeader>
              <CmtCardContent>
                <PerfectScrollbar className={classes.scrollbarRoot}>
                  <CmtList data={dataTesting} renderRow={(item, index) => <Member key={index} item={item} />}></CmtList>
                </PerfectScrollbar>
              </CmtCardContent>
            </CmtCard>
          </Box>
        </Grid>
      </GridContainer>
    </>
  );
};

export default ProfileBasic;
