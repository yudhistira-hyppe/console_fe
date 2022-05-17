import React, { useState } from 'react';
import { Box, Button, Dialog, Grid, DialogContent, DialogActions, TextField, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Head from 'next/head';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '@jumbo/components/GridContainer';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import InfoItem from './Item';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';

import { postNewInfo, setSelectedInfo } from 'redux/actions/helpCenterAction';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
    root: {
      '& .page-header': {
        marginBottom: 0
      }
    },
    header: {
      borderBottom: '1px solid #ddd',
      marginBottom: 24,
      padding: '8px 24px',
      '& .makeStyles-actionMenu-106 button': {
          width: 28
      }
    },
    headerButton: {
      borderBottom: '1px solid #ddd',
      paddingBottom: 16,
    },
    subtitle: {
      color: 'rgba(0, 0, 0, 0.6)',
      marginBottom: 24
    }
}));

const actions = [
    {
        label: 'Tambah',
        icon: <AddIcon/>
    },
    {
        label: 'Ubah',
        icon: <EditIcon/>
    },
    {
        label: 'Hapus',
        icon: <DeleteIcon />
    },
];

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help_center' },
  { label: 'Hyppe Info', isActive: true },
];

const ConsoleInfoComponent = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const { listHyppeInfo } = useSelector((state) => state.helpCenterReducers);
  const [showDialogAddCategory,setShowDialogAddCategory] = useState(false);

  const handleMoreMenuClick = (val,info) => {
    dispatch(setSelectedInfo(info));
    if(val.label == 'Tambah') {
      router.push('/console/help_center/hyppe_info/add')
    }
  };

  const submitNewCategory = (val) => {
    dispatch(postNewInfo(val));
    setShowDialogAddCategory(false);
  }
  
  const createNewInfoCategory = () => {
    setShowDialogAddCategory(true)
  }

  const DialogAddCategory = ({open,handleClose,handleSubmit}) => {
    const [categoryTitle,setCategoryTitle] = useState("");

    return (
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <TextField autoFocus margin="dense" label="Kategori" type="text" fullWidth variant="outlined" value={categoryTitle} onChange={(e) => setCategoryTitle(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button variant='contained' startIcon={<AddIcon />} color="primary" onClick={() => handleSubmit(categoryTitle)}>
            Tambah
          </Button>
          <Button startIcon={<CloseIcon />} color="default" onClick={handleClose}></Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Hyppe Info</title>
      </Head>
      <PageContainer className={classes.root} heading="Hyppe Info" breadcrumbs={breadcrumbs}>
        <Typography className={classes.subtitle} component="div" variant="h5">{listHyppeInfo.length} Kategori</Typography>
        <GridContainer>
          <Grid item xs={12} sm={12} md={12}>
            <Box className={classes.headerButton}>
              <Button variant='contained' startIcon={<AddIcon />} color="primary" onClick={createNewInfoCategory}>Buat Baru</Button>
            </Box>
          </Grid>

            {listHyppeInfo && listHyppeInfo.map((faq,index) => 
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <CmtCard>
                        <CmtCardHeader
                            className={clsx(classes.headerRoot, classes.header)}
                            title={faq.title}
                            actionsPos="top-corner"
                            actions={actions}
                            actionHandler={(val) => handleMoreMenuClick(val,faq)}/>
                        <CmtCardContent>
                           {faq.details && faq.details.map((detail,detIdx) => 
                                <InfoItem data={detail} key={detIdx}/>
                           )}
                        </CmtCardContent>
                    </CmtCard>
                </Grid>
            )}
        </GridContainer>    
      </PageContainer>

      <DialogAddCategory open={showDialogAddCategory} handleClose={() => setShowDialogAddCategory(false)} handleSubmit={submitNewCategory} />
    </>
  );
};

export default ConsoleInfoComponent;
