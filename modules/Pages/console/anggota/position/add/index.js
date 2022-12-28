import React, { useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  makeStyles,
  Box,
  Typography,
  TextField,
  MenuItem,
  Dialog,
  DialogContent,
  Slide,
} from '@material-ui/core';
import { useGetModuleQuery } from 'api/console/module';
import { Stack } from '@mui/system';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useRouter } from 'next/router';
import { useGetDivisiQuery } from 'api/console/divisi';
import { useCreateModuleMutation } from 'api/console/group';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import Breadcrumbs from '../../../help-center/bantuan-pengguna/BreadCrumb';
import Head from 'next/head';
import { LoadingButton } from '@mui/lab';
import { toast, Toaster } from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
  checkbox: {
    '&.MuiCheckbox-root': {
      color: 'rgba(115, 115, 115, 1)',
    },
    '&.MuiCheckbox-colorSecondary': {
      '&.Mui-checked': {
        color: 'rgba(171, 34, 175, 1)',
      },
    },
  },
}));

const RichObjectTreeView = () => {
  const router = useRouter();
  const [selected, setSelected] = React.useState([]);
  const [dataselected, setdataselected] = React.useState([]);
  console.log('dataselected:', dataselected);
  const [selectDivisi, setSelectDivisi] = React.useState('');
  const [nameGroup, setNameGroup] = React.useState('');
  const { data: getModule } = useGetModuleQuery();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  // dialog
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [openDialog, setOpenDialog] = React.useState(false);
  // dialog

  const data = {
    id: '0',
    name: 'root',
    children: getModule?.data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        // children:{
        //     id: item.children.id,
        //     name: item.children.name
        // }
        children: item.children.map((item_children) => {
          return {
            id: item.id + '-' + item_children.id,
            name: item_children.name,
          };
        }),
      };
    }),
  };

  const breadcrumbs = [
    { label: 'Jabatan', link: '/anggota?tab=jabatan' },
    { label: 'Tambah Jabatan', isActive: true },
  ];

  //node is always the root "Parent"
  //id is id of node clicked
  function getChildById(node, id) {
    let array = [];

    //returns an array of nodes ids: clicked node id and all children node ids
    function getAllChild(nodes) {
      if (nodes === null) return [];
      array.push(nodes.id);
      if (Array.isArray(nodes.children)) {
        nodes.children.forEach((node) => {
          array = [...array, ...getAllChild(node)];
          array = array.filter((v, i) => array.indexOf(v) === i);
        });
      }
      return array;
    }

    //returns the node object that was selected
    function getNodeById(nodes, id) {
      if (nodes.id === id) {
        return nodes;
      } else if (Array.isArray(nodes.children)) {
        let result = null;
        nodes.children.forEach((node) => {
          if (!!getNodeById(node, id)) {
            result = getNodeById(node, id);
          }
        });
        return result;
      }

      return null;
    }

    return getAllChild(getNodeById(node, id));
  }

  const getOnChange = (checked, nodes) => {
    //gets all freshly selected or unselected nodes
    const allNode = getChildById(data, nodes.id);
    //combines newly selected nodes with existing selection
    //or filters out newly deselected nodes from existing selection
    let array = checked ? _.union(selected, allNode) : selected.filter((value) => !allNode.includes(value));

    const array_modul = [];
    const array_child = [];
    for (let i = 0; i < array.length; i++) {
      const id_ = array[i];
      const chars = id_.split('-');
      if (chars[1] === undefined) {
        array_modul.push({ module: id_ });
      } else {
        if (parseInt(chars[1]) === 1) {
          array_child.push({
            module: chars[0],
            createAcces: true,
          });
        } else if (parseInt(chars[1]) === 2) {
          array_child.push({
            module: chars[0],
            updateAcces: true,
          });
        } else if (parseInt(chars[1]) === 3) {
          array_child.push({
            module: chars[0],
            deleteAcces: true,
          });
        } else if (parseInt(chars[1]) === 4) {
          array_child.push({
            module: chars[0],
            viewAcces: true,
          });
        }
      }
    }
    // var result = array_child.reduce(function (r, a) {
    //     r[a.module] = r[a.module] || [];
    //     r[a.module].push(a);
    //     return [r];
    // }, Object.create(null));
    const grouped = _.mapValues(_.groupBy(array_child, 'module'), (clist) => clist.map((car) => _.omit(car, 'module')));
    const resultData = Object.entries(grouped).map((item) => {
      const data = {};
      data.module = item[0];
      for (let o = 0; o < item[1].length; o++) {
        if (item[1][o].createAcces != undefined) {
          data.createAcces = item[1][o].createAcces;
        }
        if (item[1][o].deleteAcces != undefined) {
          data.deleteAcces = item[1][o].deleteAcces;
        }
        if (item[1][o].updateAcces != undefined) {
          data.updateAcces = item[1][o].updateAcces;
        }
        if (item[1][o].viewAcces != undefined) {
          data.viewAcces = item[1][o].viewAcces;
        }
        if (item[1][o].viewAcces != undefined) {
          data.desc = 'test group';
        }
      }
      return data;
    });

    const finalObject = {
      nameGroup: nameGroup,
      divisionId: selectDivisi,
      desc: 'test group',
      module: resultData,
    };

    setSelected(array);
    setdataselected(finalObject);
  };

  const LabelChild = ({ nodes }) => {
    const classes = useStyles();
    return (
      <>
        {nodes.name === 'root' ? (
          <FormControlLabel
            control={
              <Checkbox
                //checked={selected.some((item) => item === nodes.id)}
                checked={selected.some((item) => item === nodes.id)}
                onChange={(event) => getOnChange(event.currentTarget.checked, nodes)}
                className={classes.checkbox}
              />
            }
            label="Module Akses"
            key={nodes.id}
          />
        ) : (
          <FormControlLabel
            control={
              <Checkbox
                //checked={selected.some((item) => item === nodes.id)}
                checked={selected.some((item) => item === nodes.id)}
                onChange={(event) => getOnChange(event.currentTarget.checked, nodes)}
                className={classes.checkbox}
              />
            }
            label={<>{nodes.name}</>}
            key={nodes.id}
          />
        )}
      </>
    );
  };

  const renderTree = (nodes) => (
    <TreeItem
      key={nodes.id}
      nodeId={nodes.id}
      label={<LabelChild nodes={nodes} />}
      disabled={!access.find((item) => item?.nameModule === 'member_position')?.acces?.createAcces}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const handleSelectGroup = (event) => {
    setSelectDivisi(event.target.value);
  };

  const [createGroup, { isLoading }] = useCreateModuleMutation();

  const handleCreate = () => {
    createGroup(dataselected).then((res) => {
      console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message, { duration: 3000 });
      } else {
        router.replace('/anggota?tab=jabatan');
        toast.success('Berhasil membuat jabatan', { duration: 3000 });
      }
    });
  };

  const payloadDivisi = {
    skip: 0,
    limit: 100,
  };
  const { data: divisionSelectData } = useGetDivisiQuery(payloadDivisi);

  const [btnAdd, setBtnAdd] = React.useState(false);

  useEffect(() => {
    if (selectDivisi && nameGroup && dataselected?.module?.length > 0) {
      setBtnAdd(false);
    } else {
      setBtnAdd(true);
    }
  }, [dataselected, selectDivisi, nameGroup]);

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Add Jabatan</title>
      </Head>
      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/anggota?tab=jabatan')}
          gap="5px"
          style={{ width: 'fit-content', cursor: 'pointer' }}>
          <Stack direction={'column'} justifyContent={'center'}>
            <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }} />
          </Stack>
          <Typography variant="h1" style={{ fontSize: 20, color: 'black' }}>
            Kembali
          </Typography>
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={4}>
        <Box sx={{ width: 500 }}>
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            label="Please select divisi"
            value={selectDivisi}
            onChange={handleSelectGroup}
            variant="outlined"
            disabled={!access.find((item) => item?.nameModule === 'member_position')?.acces?.createAcces}
            // helperText="Please select divisi"
          >
            {divisionSelectData?.data?.map((item) => (
              <MenuItem key={item?._id} value={item?._id}>
                {item?.nameDivision}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            style={{ marginTop: '10px' }}
            id="outlined-basic"
            fullWidth
            label="Nama Jabatan"
            variant="outlined"
            onChange={(e) => setNameGroup(e.target.value)}
            disabled={!access.find((item) => item?.nameModule === 'member_position')?.acces?.createAcces}
          />
        </Box>
        <Box color="rgba(0, 0, 0, 0.3)" sx={{ width: 400 }} style={{ marginTop: 6 }}>
          <span>
            contoh : <strong>Customer Care / Staff</strong> atau <strong>Customer Care / Manager</strong> atau{' '}
            <strong>Customer Care / Head</strong>
          </span>
        </Box>
      </Stack>
      <TreeView
        style={{ marginTop: '20px' }}
        aria-label="rich object"
        defaultCollapseIcon={<img src="/images/icons/minus-checkbox.svg" />}
        defaultExpandIcon={<img src="/images/icons/plus-checkbox.svg" />}
        defaultExpanded={['root']}
        sx={{ height: 110, flexGrow: 1, maxWidth: '100%', overflowY: 'auto' }}>
        {renderTree(data)}
      </TreeView>
      <Divider />

      <Box sx={{ width: 100 }} mt={3}>
        <LoadingButton
          loading={isLoading}
          onClick={() => setOpenDialog(true)}
          variant="contained"
          color="secondary"
          disabled={btnAdd || !access.find((item) => item?.nameModule === 'member_position')?.acces?.createAcces}>
          Tambah
        </LoadingButton>
      </Box>

      {openDialog && (
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => setOpenDialog(false)}
          aria-describedby="alert-dialog-slide-description">
          <DialogContent>
            <Box p={4}>
              <center>
                <Typography id="modal-modal-title" variant="h3" component="div">
                  Tambah Jabatan?
                </Typography>
              </center>
              <Box mt={3} textAlign="center">
                {/* Kamu yakin menambahkan Jabatan <br /> */}
                {/* <span style={{ color: 'rgb(170, 34, 175)' }}>{nameGroup}</span> */}
              </Box>
              <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} style={{ marginTop: '15px' }}>
                <Button
                  style={{
                    // background: 'rgb(170, 34, 175)',
                    color: 'rgba(0, 0, 0, 0.6)',
                    border: 'none',
                    padding: '5px 10px',
                    marginTop: '10px',
                    fontWeight: 'bold',
                  }}
                  onClick={() => setOpenDialog(false)}>
                  BATAL
                </Button>
                <Button
                  variant="outlined"
                  style={{
                    background: 'rgb(170, 34, 175)',
                    color: '#FFFFFF',
                    border: 'none',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    marginTop: '10px',
                  }}
                  onClick={() => {
                    handleCreate();
                    setOpenDialog(false);
                  }}>
                  KONFIRMASI
                </Button>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
      )}
      <Toaster />
    </>
  );
};

export default RichObjectTreeView;
