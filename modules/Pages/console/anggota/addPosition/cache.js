import React from 'react';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { Box, Checkbox, Divider, FormControlLabel, TextField, Typography } from '@material-ui/core';
import { RenderTree, data } from './tes-data.json';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Stack } from '@mui/material';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useRouter } from 'next/router';
import { useGetModuleQuery } from 'api/console/module';

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

const breadcrumbs = [
  { label: 'Anggota', link: '/console/anggota' },
  { label: 'Bantuan Pengguna', isActive: true },
];

export default function RecursiveTreeView() {
  const router = useRouter();
  const [selected, setSelected] = React.useState([]);
  // console.log('selected:', selected);

  const { data: tesData, isLoading } = useGetModuleQuery();
  console.log('tesData:', tesData);
  console.log('data:', data);

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

  function getOnChange(checked, nodes) {
    //gets all freshly selected or unselected nodes
    const allNode = getChildById(data, nodes.id);
    //combines newly selected nodes with existing selection
    //or filters out newly deselected nodes from existing selection
    let array = checked ? [...selected, ...allNode] : selected.filter((value) => !allNode.includes(value));

    setSelected(array);
  }

  const RenderTreeWithCheckboxes = (nodes) => {
    const classes = useStyles();
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.some((item) => item === nodes.id)}
                onChange={(event) => getOnChange(event.currentTarget.checked, nodes)}
                //onClick={(e) => e.stopPropagation()}
                className={classes.checkbox}
              />
            }
            label={<>{nodes.name}</>}
            key={nodes.id}
          />
        }>
        {Array.isArray(nodes.children) ? nodes.children.map((node) => RenderTreeWithCheckboxes(node)) : null}
      </TreeItem>
    );
  };

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
            size="small"
            id="outlined-basic"
            label="Jabatan"
            variant="outlined"
            style={{ background: '#FFFFFF' }}
          />
        </Box>
        <Box color="rgba(0, 0, 0, 0.3)" sx={{ width: 400 }}>
          <span>Contoh : Customer Care / Staff atau Customer Care / Manager atau Customer Care / Head </span>
        </Box>
      </Stack>
      <TreeView
        style={{ marginTop: '20px' }}
        defaultCollapseIcon={<img src="/images/icons/minus-checkbox.svg" />}
        defaultExpandIcon={<img src="/images/icons/plus-checkbox.svg" />}>
        {RenderTreeWithCheckboxes({
          id: 1,
          name: 'Berikan semua akses',
          children: [
            {
              id: 4224,
              name: 'Module User',
              children: [
                {
                  id: 5252,
                  name: 'createAcces',
                },
                {
                  id: 4,
                  name: 'updateAcces',
                },
                {
                  id: 5,
                  name: 'deleteAcces',
                },
                {
                  id: 6,
                  name: 'viewAcces',
                },
              ],
            },
          ],
        })}

        {/* {RenderTreeWithCheckboxes({
          id: 232,
          name: 'berikan semua aksesssss',
          children: [
            {
              id: '62e9f2ac8c330000dd004225',
              name: 'Module User',
              children: [
                {
                  id: 1,
                  name: 'createAcces',
                },
                {
                  id: 2,
                  name: 'updateAcces',
                },
                {
                  id: 3,
                  name: 'deleteAcces',
                },
                {
                  id: 4,
                  name: 'viewAcces',
                },
              ],
            },
          ],
        })} */}
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
}
