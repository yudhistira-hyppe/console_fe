import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Dialog, Grid, DialogContent, DialogActions, TextField, Typography } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Head from 'next/head';
import clsx from 'clsx';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '@jumbo/components/GridContainer';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import FaqItem from './FaqItem';
import AddIcon from '@material-ui/icons/Add';
// import EditIcon from '@material-ui/icons/Edit';
// import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { useRouter } from 'next/router';
import { useCreateFaqAndInfoMutation, useGetListFaqOrInfoByTypeQuery } from 'api/console/helpCenter/faqAndInfo';

const useStyles = makeStyles(() => ({
  root: {
    '& .page-header': {
      marginBottom: 0,
    },
  },
  header: {
    borderBottom: '1px solid #ddd',
    marginBottom: 24,
    padding: '8px 24px',
    '& .makeStyles-actionMenu-106 button': {
      width: 28,
    },
  },
  headerButton: {
    borderBottom: '1px solid #ddd',
    paddingBottom: 16,
  },
  subtitle: {
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 24,
  },
}));

const actions = [
  {
    label: 'Tambah',
    icon: <AddIcon />,
  },
  // {
  //   label: 'Ubah',
  //   icon: <EditIcon />,
  // },
  // {
  //   label: 'Hapus',
  //   icon: <DeleteIcon />,
  // },
];

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help_center' },
  { label: 'FAQ', isActive: true },
];

const DialogAddCategory = ({ open, onClose, onSubmit }) => {
  const [categoryTitle, setCategoryTitle] = useState('');

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogContent>
        <TextField
          margin="dense"
          label="Kategori"
          type="text"
          fullWidth
          variant="outlined"
          value={categoryTitle}
          onChange={(e) => setCategoryTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={() => onSubmit(categoryTitle)}>
          Tambah
        </Button>
        <Button startIcon={<CloseIcon />} color="default" onClick={onClose}></Button>
      </DialogActions>
    </Dialog>
  );
};

DialogAddCategory.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

const ConsoleFaqComponent = () => {
  const router = useRouter();
  const classes = useStyles();
  const { data } = useGetListFaqOrInfoByTypeQuery('faq');
  const [addFaqCategory] = useCreateFaqAndInfoMutation();
  const [faqList, setFaqList] = useState([]);
  const [showDialogAddCategory, setShowDialogAddCategory] = useState(false);

  useEffect(() => {
    if (data) {
      setFaqList(data?.data);
    } else {
      setFaqList([]);
    }
  }, [data]);

  const onClickMoreMenu = (val, info) => {
    if (val.label == 'Tambah') {
      router.push({
        pathname: '/console/help_center/faq/add',
        query: { id: info._id },
      });
    }
  };

  const onSubmitNewCategory = (newCategory) => {
    addFaqCategory({ kategori: newCategory, tipe: 'faq' });
    setShowDialogAddCategory(false);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: FAQ</title>
      </Head>
      <PageContainer className={classes.root} heading="FAQ" breadcrumbs={breadcrumbs}>
        <Typography className={classes.subtitle} component="div" variant="h5">
          {faqList.length} Kategori
        </Typography>
        <GridContainer>
          <Grid item xs={12} sm={12} md={12}>
            <Box className={classes.headerButton}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                color="primary"
                onClick={() => setShowDialogAddCategory(true)}>
                Buat Baru
              </Button>
            </Box>
          </Grid>
          {faqList &&
            faqList.map((faq, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <CmtCard>
                  <CmtCardHeader
                    className={clsx(classes.headerRoot, classes.header)}
                    title={faq.kategori}
                    actionsPos="top-corner"
                    actions={actions}
                    actionHandler={(val) => onClickMoreMenu(val, faq)}
                  />
                  <CmtCardContent>
                    {faq.replydata?.length > 0 &&
                      faq.replydata.map((detail, detIdx) => <FaqItem data={detail} key={detIdx} />)}
                  </CmtCardContent>
                </CmtCard>
              </Grid>
            ))}
        </GridContainer>
      </PageContainer>
      <DialogAddCategory
        open={showDialogAddCategory}
        onClose={() => setShowDialogAddCategory(false)}
        onSubmit={onSubmitNewCategory}
      />
    </>
  );
};

export default ConsoleFaqComponent;
