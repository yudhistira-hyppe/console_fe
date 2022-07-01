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
import InfoItem from './Item';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useRouter } from 'next/router';
import {
  useCreateFaqAndInfoMutation,
  useDeleteDetailForFaqAndInfoMutation,
  useDeleteFaqAndInfoMutation,
  useGetListFaqOrInfoByTypeQuery,
  useUpdateFaqAndInfoMutation,
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
  { label: 'Hyppe Info', isActive: true },
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

const ConsoleInfoComponent = () => {
  const classes = useStyles();
  const router = useRouter();
  const { data } = useGetListFaqOrInfoByTypeQuery('info');
  const [addInfoCategory] = useCreateFaqAndInfoMutation();
  const [updateInfoCategory] = useUpdateFaqAndInfoMutation();
  const [deleteInfoCategory] = useDeleteFaqAndInfoMutation();
  const [deleteDetailInfoCategory] = useDeleteDetailForFaqAndInfoMutation();
  const [infoList, setInfoList] = useState([]);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [prevValueActionDialog, setPrevValueActionDialog] = useState({});
  const [typeActionDialog, setTypeActionDialog] = useState('Tambah');
  const [isDetailAction, setIsDetailAction] = useState(false);

  useEffect(() => {
    if (data) {
      setInfoList(data.data);
    } else {
      setInfoList([]);
    }
  }, [data]);

  const onClickCategoryMoreMenu = (type, info) => {
    switch (type) {
      case 'Tambah':
        router.push(
          {
            pathname: '/console/help-center/info/add',
            query: info,
          },
          '/console/help-center/info/add',
        );
        break;
      case 'Ubah':
        setTypeActionDialog('Ubah');
        setIsDetailAction(false);
        setPrevValueActionDialog(info);
        setShowActionDialog(true);
        break;
      case 'Hapus':
        setTypeActionDialog('Hapus');
        setIsDetailAction(false);
        setPrevValueActionDialog(info);
        setShowActionDialog(true);
        break;
      default:
        break;
    }
  };

  const onClickCategoryDetailMoreMenu = (type, detailInfo) => {
    switch (type) {
      case 'Ubah':
        router.push(
          {
            pathname: '/console/help-center/info/edit',
            query: detailInfo,
          },
          '/console/help-center/info/edit',
        );
        break;
      case 'Hapus':
        setTypeActionDialog('Hapus Detail');
        setIsDetailAction(true);
        setPrevValueActionDialog(detailInfo);
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
        addInfoCategory({ kategori: newCategory, tipe: 'info' });
        break;
      case 'Ubah':
        updateInfoCategory({ id: valueId, body: { kategori: newCategory } });
        break;
      case 'Hapus':
        deleteInfoCategory(valueId);
        break;
      case 'Hapus Detail':
        deleteDetailInfoCategory(valueId);
        break;
      default:
        break;
    }
    setShowActionDialog(false);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Hyppe Info</title>
      </Head>
      <PageContainer className={classes.root} heading="Hyppe Info" breadcrumbs={breadcrumbs}>
        <Typography className={classes.subtitle} component="div" variant="h5">
          {infoList.length} Kategori
        </Typography>
        <GridContainer>
          <Grid item xs={12} sm={12} md={12}>
            <Box className={classes.headerButton}>
              <Button variant="contained" startIcon={<AddIcon />} color="primary" onClick={onClickAddNewCategory}>
                Buat Baru
              </Button>
            </Box>
          </Grid>
          {infoList.length > 0 &&
            infoList.map((info) => (
              <Grid item xs={12} sm={6} md={4} key={info._id}>
                <CmtCard>
                  <CmtCardHeader
                    className={clsx(classes.headerRoot, classes.header)}
                    title={info.kategori}
                    actionsPos="top-corner"
                    actions={actions}
                    actionHandler={({ label }) => onClickCategoryMoreMenu(label, info)}
                  />
                  <CmtCardContent>
                    {info.replydata?.length > 0 &&
                      info.replydata.map((detail) => (
                        <InfoItem key={detail._id} data={detail} onClickItem={onClickCategoryDetailMoreMenu} />
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

export default ConsoleInfoComponent;
