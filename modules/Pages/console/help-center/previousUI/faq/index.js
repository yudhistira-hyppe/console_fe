import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
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
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useRouter } from 'next/router';
import {
  useGetListFaqOrInfoByTypeQuery,
  useCreateFaqAndInfoMutation,
  useUpdateFaqAndInfoMutation,
  useDeleteFaqAndInfoMutation,
  useDeleteDetailForFaqAndInfoMutation,
} from 'api/console/helpCenter/faqAndInfo';

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
  {
    label: 'Ubah',
    icon: <EditIcon />,
  },
  {
    label: 'Hapus',
    icon: <DeleteIcon />,
  },
];

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'FAQ', isActive: true },
];
const ActionDialog = ({ open, type, isDetailAction, prevValue, onClose, onSubmit }) => {
  const [categoryTitle, setCategoryTitle] = useState('');
  const [disableSubmitButton, setDisableSubmitButton] = useState(true);

  useEffect(() => {
    if (open) {
      setCategoryTitle(prevValue.kategori);
    } else {
      setCategoryTitle(null);
    }
  }, [open]);

  useEffect(() => {
    if (type.includes('Hapus')) {
      setDisableSubmitButton(false);
    } else {
      if (categoryTitle === prevValue.kategori) {
        setDisableSubmitButton(true);
      } else {
        setDisableSubmitButton(false);
      }
    }
  }, [categoryTitle]);

  const renderButtonIcon = () => {
    if (type.includes('Tambah')) return <AddIcon />;
    if (type.includes('Ubah')) return <EditIcon />;
    if (type.includes('Hapus')) return <DeleteIcon />;
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{type} Kategori</DialogTitle>
      <DialogContent>
        {type.includes('Hapus') ? (
          <p>
            Apa anda yakin ingin menghapus {isDetailAction && 'detail'} kategori
            <b> {prevValue.kategori || prevValue.title}</b>
          </p>
        ) : (
          <TextField
            margin="dense"
            label="Kategori"
            type="text"
            fullWidth
            variant="outlined"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button color="default" onClick={onClose}>
          Batal
        </Button>
        <Button
          variant="contained"
          disabled={disableSubmitButton}
          startIcon={renderButtonIcon()}
          color="primary"
          onClick={() => onSubmit(type, prevValue._id, categoryTitle)}>
          {type}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

ActionDialog.propTypes = {
  open: PropTypes.bool,
  type: PropTypes.string,
  isDetailAction: PropTypes.bool,
  prevValue: PropTypes.object,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

const ConsoleFaqComponent = () => {
  const router = useRouter();
  const classes = useStyles();
  const { data } = useGetListFaqOrInfoByTypeQuery('faq');
  const [addFaqCategory] = useCreateFaqAndInfoMutation();
  const [updateFaqCategory] = useUpdateFaqAndInfoMutation();
  const [deleteFaqCategory] = useDeleteFaqAndInfoMutation();
  const [deleteDetailFaqCategory] = useDeleteDetailForFaqAndInfoMutation();
  const [faqList, setFaqList] = useState([]);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [prevValueActionDialog, setPrevValueActionDialog] = useState({});
  const [typeActionDialog, setTypeActionDialog] = useState('Tambah');
  const [isDetailAction, setIsDetailAction] = useState(false);

  useEffect(() => {
    if (data) {
      setFaqList(data?.data);
    } else {
      setFaqList([]);
    }
  }, [data]);

  const onClickCategoryMoreMenu = (type, faq) => {
    switch (type) {
      case 'Tambah':
        router.push(
          {
            pathname: '/console/help-center/faq/add',
            query: faq,
          },
          '/console/help-center/faq/add',
        );
        break;
      case 'Ubah':
        setTypeActionDialog('Ubah');
        setIsDetailAction(false);
        setPrevValueActionDialog(faq);
        setShowActionDialog(true);
        break;
      case 'Hapus':
        setTypeActionDialog('Hapus');
        setIsDetailAction(false);
        setPrevValueActionDialog(faq);
        setShowActionDialog(true);
        break;
      default:
        break;
    }
  };

  const onClickCategoryDetailMoreMenu = (type, detailFaq) => {
    switch (type) {
      case 'Ubah':
        router.push(
          {
            pathname: '/console/help-center/faq/edit',
            query: detailFaq,
          },
          '/console/help-center/faq/edit',
        );
        break;
      case 'Hapus':
        setTypeActionDialog('Hapus Detail');
        setIsDetailAction(true);
        setPrevValueActionDialog(detailFaq);
        setShowActionDialog(true);
        break;
      default:
        break;
    }
  };

  const onClickAddNewCategory = () => {
    setTypeActionDialog('Tambah');
    setIsDetailAction(false);
    setPrevValueActionDialog({ kategori: '' });
    setShowActionDialog(true);
  };

  const onSubmitActionDialog = (actionType, valueId, newCategory) => {
    switch (actionType) {
      case 'Tambah':
        addFaqCategory({ kategori: newCategory, tipe: 'faq' });
        break;
      case 'Ubah':
        updateFaqCategory({ id: valueId, body: { kategori: newCategory } });
        break;
      case 'Hapus':
        deleteFaqCategory(valueId);
        break;
      case 'Hapus Detail':
        deleteDetailFaqCategory(valueId);
        break;
      default:
        break;
    }
    setShowActionDialog(false);
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
              <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={onClickAddNewCategory}>
                Buat Baru
              </Button>
            </Box>
          </Grid>
          {faqList.length > 0 &&
            faqList.map((faq) => (
              <Grid item xs={12} sm={6} md={4} key={faq._id}>
                <CmtCard>
                  <CmtCardHeader
                    className={clsx(classes.headerRoot, classes.header)}
                    title={faq.kategori}
                    actionsPos="top-corner"
                    actions={actions}
                    actionHandler={({ label }) => onClickCategoryMoreMenu(label, faq)}
                  />
                  <CmtCardContent>
                    {faq.replydata?.length > 0 &&
                      faq.replydata.map((detail) => (
                        <FaqItem key={detail._id} data={detail} onClickItem={onClickCategoryDetailMoreMenu} />
                      ))}
                  </CmtCardContent>
                </CmtCard>
              </Grid>
            ))}
        </GridContainer>
      </PageContainer>
      <ActionDialog
        open={showActionDialog}
        type={typeActionDialog}
        isDetailAction={isDetailAction}
        prevValue={prevValueActionDialog}
        onClose={() => setShowActionDialog(false)}
        onSubmit={onSubmitActionDialog}
      />
    </>
  );
};

export default ConsoleFaqComponent;
