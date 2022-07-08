import { Grid, Typography, Button, Box, makeStyles, alpha } from '@material-ui/core';
import CmtImage from '@coremat/CmtImage';
import { useRouter } from 'next/router';
import { useAuth } from 'authentication';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import CmtGridView from '@coremat/CmtGridView';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    '& .Cmt-header-root': {
      paddingTop: 3,
      paddingBottom: 0,
    },
  },
  tabsList: {
    position: 'relative',
    minHeight: 60,
    '& .MuiTabs-indicator': {
      backgroundColor: alpha(theme.palette.primary.main, 0.8),
    },
  },
  tabItem: {
    maxWidth: 'none',
    minWidth: 10,
    minHeight: 60,
    padding: '5px 10px',
    textTransform: 'capitalize',
    color: theme.palette.text.primary,
    fontSize: 14,
    fontWeight: theme.typography.fontWeightRegular,
  },
  columnRoot: {
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: '0.5px',
  },
}));

const Organization = () => {
  const router = useRouter();
  const { authUser } = useAuth();
  console.log('authUser', authUser.roles);
  const classes = useStyles();

  const renderData = [
    // { title: 'Works at', desc: 'company', icon: <BusinessIcon /> },
    { title: 'Admin', desc: '25/10/2001', icon: 'icon' },
    { title: 'Lokasi', desc: 'Bogor, Jawa Barat Indonesia', icon: 'icon' },
    { title: 'Email', desc: 'Wanita', icon: 'icon' },
    { title: 'Anggota', desc: 'Wanita', icon: 'icon' },
    { title: 'Email', desc: 'Wanita', icon: 'icon' },
    // { title: 'Kategori', desc: 'desc', icon: <PeopleAltIcon /> },
    // {
    //     title: `${family.length} Family Members`,
    //   title: `Kategori`,
    //   list: (
    //     <Box mt={1}>
    //       Entertaiment, Hobby, Music
    //       <CmtAvatarGroup
    //         // items={family}
    //         items={'family'}
    //         srcKey="profile_pic"
    //         avatarSize={24}
    //         spacing={1}
    //         max={6}
    //         titleKey="name"
    //         renderItemSummary={(item) => (
    //           <Typography color="inherit" style={{ fontSize: 10 }}>
    //             {item.name}
    //           </Typography>
    //         )}
    //       />
    //     </Box>
    //   ),
    //   icon: 'icon',
    // },
  ];
  return (
    <>
      <CmtCardContent>
        <CmtGridView
          itemPadding={24}
          responsive={{
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
          }}
          data={renderData}
          renderRow={(item, index) => (
            <>
              <Box display="flex" alignItems="center" key={index}>
                {console.log('item:', item.desc)}
                {item.icon}
                <Box ml={6}>
                  <Box fontSize={12} color="text.secondary">
                    {item.title}
                  </Box>
                  <Box className={classes.columnRoot}>
                    {item.desc ? item.desc : item.list}
                    {/* item desc ? item desc : item.list */}
                  </Box>
                </Box>
              </Box>
            </>
          )}
        />
      </CmtCardContent>
      {/* yang ini gajadi anying :( */}
      {/* <Grid container spacing={2}> */}
      {/* <Grid item xs={8}>
        <Typography style={{ fontWeight: 'bold' }}>Active Premium</Typography>
        <div style={{ color: 'rgba(0, 0, 0, 0.38)', marginTop: '5px' }}>
          Ubah akun Anda menjadi akun premium untuk dapat membuat dan mengelola organisasi Anda
        </div>
        <Button
          variant="contained"
          color="primary"
          style={{ marginTop: '20px' }}
          onClick={() =>
            authUser.roles.includes('ROLE_PREMIUM') ? alert('akun sudah premium') : router.push('/premium-activation')
          }>
          ACTIVATE
        </Button>
      </Grid>
      <Grid item xs={4}>
        <CmtImage src={'/images/kotak.png'} />
      </Grid> */}
      {/* </Grid> */}
    </>
  );
};

export default Organization;
