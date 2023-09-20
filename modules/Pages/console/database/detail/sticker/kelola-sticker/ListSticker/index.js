import GridContainer from '@jumbo/components/GridContainer';
import { Typography } from '@material-ui/core';
import { DragIndicator, NavigateBefore, NavigateNext } from '@material-ui/icons';
import { Avatar, Button, CircularProgress, IconButton, Paper, Stack } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useGetListStickerQuery, useUpdateStickerMutation } from 'api/console/database';
import { toast } from 'react-hot-toast';
import ModalIndexing from '../Modal/ModalIndexing';
import ModalUpdateCategory from '../Modal/ModalUpdateCategory';
import { useRouter } from 'next/router';

const ListSticker = ({ category, setTab }) => {
  const [stickers, setSticker] = useState([]);
  const [showModal, setShowModal] = useState({
    updateCategory: false,
    updateIndex: false,
  });
  const [selectedItem, setSelectedItem] = useState({});
  const [filter, setFilter] = useState({
    page: 0,
    limit: 10,
    tipesticker: 'STICKER',
    sorting: 'createdAt-',
    kategori: [],
  });
  const [updateSticker] = useUpdateStickerMutation();
  const [refreshTable, setRefreshTable] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (category) {
      setFilter({ ...filter, kategori: [category?.name], page: 0 });
    }
  }, [category]);

  const { data: listSticker, isFetching: loadingSticker } = useGetListStickerQuery(filter);

  useEffect(() => {
    if (filter.page >= 1 && listSticker?.data?.length < 1) {
      toast.success('Semua data sudah ditampilkan');
      setFilter((prevVal) => {
        return {
          ...prevVal,
          page: prevVal.page - 1,
        };
      });
    }
  }, [filter, loadingSticker]);

  useEffect(() => {
    setRefreshTable(true);
    setTimeout(() => setRefreshTable(false), 500);
    if (!loadingSticker) {
      setSticker(listSticker?.data);
    }
  }, [loadingSticker, listSticker]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    setRefreshTable(true);
    const dataDrag = JSON.parse(result?.draggableId);

    let formData = new FormData();
    formData.append('id', dataDrag?._id);
    formData.append('nourut', result?.destination?.index + 1);
    formData.append('type', dataDrag?.type);
    formData.append('kategori', dataDrag?.kategori);
    formData.append('name', dataDrag?.name);
    formData.append('status', dataDrag?.status ? true : false);

    updateSticker(formData).then((res) => {
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else if (res?.data) {
        toast.success('Berhasil mengubah urutan sticker');
      }
    });
  };

  return (
    <>
      <ModalUpdateCategory
        showModal={showModal.updateCategory}
        onClose={() => setShowModal({ ...showModal, updateCategory: !showModal.updateCategory })}
        category={category}
        setTab={setTab}
      />
      <ModalIndexing
        showModal={showModal.updateIndex}
        onClose={() => setShowModal({ ...showModal, updateIndex: !showModal.updateIndex })}
        data={selectedItem}
        onSubmit={() => {
          setShowModal({ ...showModal, updateIndex: !showModal.updateIndex });
          setRefreshTable(true);
        }}
      />

      <Stack direction="row" gap={3} mt={5}>
        <Stack direction="column" width="100%" maxWidth={280}>
          <Stack direction="row" alignItems="center" gap={2}>
            <Stack
              alignItems="center"
              justifyContent="center"
              borderRadius="100%"
              height={75}
              width={75}
              style={{ background: '#00000080' }}>
              <img src={category?.icon} style={{ width: 'auto', height: 30 }} />
            </Stack>
            <Stack direction="column">
              <Typography style={{ fontSize: 22, fontWeight: 'bold' }}>{category?.name}</Typography>
              <Typography style={{ fontSize: 12, color: '#00000099' }}>
                Pembaruan terakhir {moment(category?.updatedAt).format('DD/MM/YYYY')}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column" gap={1} mt={3}>
            <Button
              variant="contained"
              color="secondary"
              style={{ height: 40 }}
              fullWidth
              onClick={() => setShowModal({ ...showModal, updateCategory: !showModal.updateCategory })}>
              <Typography style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 1.25 }}>Ubah</Typography>
            </Button>
          </Stack>
        </Stack>

        <Stack direction="column" width="100%">
          <Paper style={{ width: '100%', height: 950 }}>
            <Stack direction="column" width="100%">
              <Stack direction="row" style={{ width: '100%', borderBottom: '1px solid #21212114', padding: 24 }}>
                <Typography style={{ width: '40%', fontSize: 14, paddingLeft: 40 }}>Nama Stiker</Typography>
                <Typography style={{ width: '30%', fontSize: 14 }}>Tanggal Unggah</Typography>
                <Typography style={{ width: '30%', fontSize: 14 }}>Jumlah Digunakan</Typography>
              </Stack>

              {refreshTable ? (
                <Stack direction="column" alignItems="center" justifyContent="center" height={880} width="100%" gap={2}>
                  <CircularProgress color="secondary" />
                  <Typography style={{ fontFamily: 'Normal' }}>loading data...</Typography>
                </Stack>
              ) : stickers?.length >= 1 ? (
                <DragDropContext onDragStart={(val) => console.log(val)} onDragEnd={handleDragEnd}>
                  <Droppable droppableId="stickers">
                    {(provided) => (
                      <Stack direction="column" {...provided.droppableProps} ref={provided.innerRef}>
                        {[...stickers]
                          .sort((a, b) => a.index - b.index)
                          ?.map((item, key) => {
                            return (
                              <Draggable key={item._id} draggableId={JSON.stringify(item)} index={key}>
                                {(provided) => (
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    sx={{
                                      width: '100%',
                                      boxShadow: '0px 0px 1px rgba(0, 0, 0, 0.161741)',
                                      padding: '24px !important',
                                    }}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}>
                                    <DragIndicator style={{ color: '#666666' }} />
                                    <Stack
                                      direction="row"
                                      gap={3}
                                      alignItems="center"
                                      style={{ width: '40%', paddingLeft: 20 }}>
                                      <Avatar
                                        variant="rounded"
                                        src={item?.image}
                                        alt="X"
                                        style={{ width: 40, height: 40 }}
                                      />
                                      <Typography style={{ fontSize: 14 }}>{item?.name}</Typography>
                                    </Stack>
                                    <Typography style={{ width: '30%', fontSize: 14 }}>
                                      {moment(item?.createdAt).format('DD/MM/YYYY')}
                                    </Typography>
                                    <Typography style={{ width: '15%', fontSize: 14 }}>{item?.countused || 0}</Typography>
                                    <Stack direction="row" width="15%" alignItems="center" justifyContent="center">
                                      <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => {
                                          setShowModal({ ...showModal, updateIndex: !showModal.updateIndex });
                                          setSelectedItem(item);
                                        }}>
                                        <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>Ubah urutan</Typography>
                                      </Button>
                                    </Stack>
                                  </Stack>
                                )}
                              </Draggable>
                            );
                          })}
                        {provided.placeholder}
                      </Stack>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                <Stack direction="column" alignItems="center" justifyContent="center" height={880} width="100%" gap={2}>
                  <Typography style={{ fontFamily: 'Normal' }}>Tidak ada data sticker dengan kategori ini</Typography>
                </Stack>
              )}
            </Stack>
          </Paper>

          {stickers?.length >= 1 && !loadingSticker && (
            <Stack direction="row" alignItems="center" justifyContent="right" spacing={2} mt={2}>
              <IconButton
                color="secondary"
                onClick={() => setFilter({ ...filter, page: filter.page - 1 })}
                disabled={filter.page < 1}>
                <NavigateBefore />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() => setFilter({ ...filter, page: filter.page + 1 })}
                disabled={stickers?.length < 10}>
                <NavigateNext />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default ListSticker;
