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
import { useGetModuleQuery, useCreateModuleMutation, useUpdateModuleMutation } from 'api/console/module';
import { Stack } from '@mui/system';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useRouter } from 'next/router';
import { useGetDivisiQuery } from 'api/console/divisi';
import { useGetGroupQuery, useGetSingleGroupQuery } from 'api/console/group';

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
  const [selectDivisi, setSelectDivisi] = React.useState('');
  const [nameGroup, setNameGroup] = React.useState('');
  const { data: getModule } = useGetModuleQuery();

  // dialog
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const [openDialog, setOpenDialog] = React.useState(false);
  // dialog

  const dataTreeViews = {
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
    { label: 'Anggota', link: '/console/anggota' },
    { label: 'Bantuan Pengguna', isActive: true },
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

  const getOnChangeTreeView = (checked, nodes) => {
    //gets all freshly selected or unselected nodes
    const allNode = getChildById(dataTreeViews, nodes?.id);
    //combines newly selected nodes with existing selection
    //or filters out newly deselected nodes from existing selection
    let array = allNode && checked ? _.union(selected, allNode) : selected.filter((value) => !allNode.includes(value));

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

    const grouped = _.mapValues(_.groupBy(array_child, 'module'), (clist) => clist.map((car) => _.omit(car, 'module')));
    const resultData = Object.entries(grouped).map((item) => {
      const dataModule = {};
      dataModule.module = item[0];
      for (let o = 0; o < item[1].length; o++) {
        if (item[1][o].createAcces != undefined) {
          dataModule.createAcces = item[1][o].createAcces;
        }
        if (item[1][o].deleteAcces != undefined) {
          dataModule.deleteAcces = item[1][o].deleteAcces;
        }
        if (item[1][o].updateAcces != undefined) {
          dataModule.updateAcces = item[1][o].updateAcces;
        }
        if (item[1][o].viewAcces != undefined) {
          dataModule.viewAcces = item[1][o].viewAcces;
        }
        if (item[1][o].viewAcces != undefined) {
          dataModule.desc = 'test group';
        }
      }
      return dataModule;
    });

    const finalObject = {
      _id: router.query.id,
      nameGroup: nameGroup,
      divisionId: selectDivisi,
      desc: 'test group',
      module: resultData,
    };

    setSelected(array);
    if (nameGroup && selectDivisi) {
      setdataselected(finalObject);
    }
  };

  const LabelChild = ({ nodes }) => {
    const classes = useStyles();
    return (
      <>
        {nodes.name === 'root' ? (
          // prevent root treeView without checkbox
          'Buka Module'
        ) : (
          <FormControlLabel
            control={
              <Checkbox
                //checked={selected.some((item) => item === nodes.id)}
                checked={selected.some((item) => item === nodes.id)}
                onChange={(event) => getOnChangeTreeView(event.currentTarget.checked, nodes)}
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
    <TreeItem key={nodes.id} nodeId={nodes.id} label={<LabelChild nodes={nodes} />}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const handleSelectGroup = (event) => {
    setSelectDivisi(event.target.value);
  };

  const [updateModule, { isSuccess, isError }] = useUpdateModuleMutation();
  console.log('isError:', isError);
  console.log('isSuccess:', isSuccess);

  useEffect(() => {
    if (isSuccess) window.location.href = '/console/anggota?tab=jabatan';
    if (isError) alert('error bang');
  }, [isSuccess, isError]);

  const handleUpdateModule = () => {
    updateModule(dataselected);
    setOpenDialog(false);
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

  const { data: getSingleGroup } = useGetSingleGroupQuery(router.query.id);

  useEffect(() => {
    setSelectDivisi(getSingleGroup?.data[0]?.divisionId);
    setNameGroup(getSingleGroup?.data[0]?.nameGroup);

    let array_existing = [];
    for (let i = 0; i < getSingleGroup?.data[0]?.data.length; i++) {
      array_existing.push(getSingleGroup?.data[0]?.data[i].id);
      if (getSingleGroup?.data[0]?.data[i].createAcces != undefined) {
        array_existing.push(getSingleGroup?.data[0]?.data[i].id + '-1');
      }
      if (getSingleGroup?.data[0]?.data[i].updateAcces != undefined) {
        array_existing.push(getSingleGroup?.data[0]?.data[i].id + '-2');
      }
      if (getSingleGroup?.data[0]?.data[i].deleteAcces != undefined) {
        array_existing.push(getSingleGroup?.data[0]?.data[i].id + '-3');
      }
      if (getSingleGroup?.data[0]?.data[i].viewAcces != undefined) {
        array_existing.push(getSingleGroup?.data[0]?.data[i].id + '-4');
      }
    }
    setSelected(array_existing);
  }, [getSingleGroup]);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" style={{ cursor: 'pointer' }} onClick={() => router.push('/console/anggota?tab=jabatan')}>
          <img src="/images/icons/arrow-left.svg" />
          <Typography variant="h4" component="div">
            Kembali
          </Typography>
        </Box>
        <Box>
          <PageContainer breadcrumbs={breadcrumbs} />
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={4}>
        <Box sx={{ width: 500 }}>
          <TextField
            fullWidth
            id="outlined-select-currency"
            select
            label="Please select divisi"
            value={selectDivisi}
            size="small"
            onChange={handleSelectGroup}
            variant="outlined"
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
            label="Nama Group"
            size="small"
            variant="outlined"
            value={nameGroup}
            onChange={(e) => setNameGroup(e.target.value)}
          />
        </Box>
        <Box color="rgba(0, 0, 0, 0.3)" sx={{ width: 400 }}>
          <span>Contoh : Customer Care / Staff atau Customer Care / Manager atau Customer Care / Head </span>
        </Box>
      </Stack>
      <TreeView
        // it will expanded if you put teh id of node below
        defaultExpanded={['0']}
        style={{ marginTop: '20px' }}
        aria-label="rich object"
        defaultCollapseIcon={<img src="/images/icons/minus-checkbox.svg" />}
        defaultExpandIcon={<img src="/images/icons/plus-checkbox.svg" />}
        sx={{ height: 110, flexGrow: 1, maxWidth: '100%', overflowY: 'auto' }}>
        {renderTree(dataTreeViews)}
      </TreeView>
      <Divider />

      <Box sx={{ width: 100 }} mt={3}>
        <Button
          onClick={() => setOpenDialog(true)}
          variant="outlined"
          disabled={btnAdd}
          style={btnAdd ? null : { background: '#AB22AF', color: '#FFFFFF', border: 'none' }}>
          Tambah
        </Button>
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
                    handleUpdateModule();
                  }}>
                  KONFIRMASI
                </Button>
              </Stack>
            </Box>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default RichObjectTreeView;
