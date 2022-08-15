import React from 'react';
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
} from '@material-ui/core';
import { useGetModuleQuery } from 'api/console/module';
import { Stack } from '@mui/system';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useRouter } from 'next/router';
import { useGetAnggotaQuery } from 'api/console/getUserHyppe';

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
  const [selected, setSelected] = React.useState([]);
  console.log('selected:', selected);
  const { data: tesData } = useGetModuleQuery();
  const router = useRouter();
  const data = {
    id: '0',
    name: 'Berikan Semua Akses',
    children: tesData?.data,
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

  const getOnChange = (checked, nodes) => {
    //gets all freshly selected or unselected nodes
    const allNode = getChildById(data, nodes.id);
    //combines newly selected nodes with existing selection
    //or filters out newly deselected nodes from existing selection
    let array = checked ? [...selected, ...allNode] : selected.filter((value) => !allNode.includes(value));

    setSelected(array);
  };

  const LabelChild = ({ nodes }) => {
    const classes = useStyles();
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={selected.some((item) => item === nodes.id)}
            onChange={(event) => getOnChange(event.currentTarget.checked, nodes)}
            className={classes.checkbox}
          />
        }
        label={<>{nodes.name}</>}
        key={nodes.id}
      />
    );
  };

  const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={<LabelChild nodes={nodes} />}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </TreeItem>
  );

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];

  const [userSelect, setUserSelect] = React.useState('');

  const handleChange = (event) => {
    setUserSelect(event.target.value);
  };

  const payload = {
    skip: 0,
    limit: 100,
  };

  const { data: userHyppe } = useGetAnggotaQuery(payload);
  console.log('userHyppe:', userHyppe);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box display="flex" style={{ cursor: 'pointer' }} onClick={() => router.push('/console/anggota')}>
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
            label="Select"
            value={userSelect}
            onChange={handleChange}
            helperText="Please select user">
            {userHyppe?.data?.map((item) => (
              <MenuItem key={item?._id} value={item?._id}>
                {item?.email}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box color="rgba(0, 0, 0, 0.3)" sx={{ width: 400 }}>
          <span>Contoh : Customer Care / Staff atau Customer Care / Manager atau Customer Care / Head </span>
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
        <Button
          variant="outlined"
          style={{ background: 'rgba(0, 0, 0, 0.12)', color: 'rgba(0, 0, 0, 0.38)', border: 'none' }}>
          Tambah
        </Button>
      </Box>
    </>
  );
};

export default RichObjectTreeView;
