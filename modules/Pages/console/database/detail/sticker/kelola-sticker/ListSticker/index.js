import GridContainer from '@jumbo/components/GridContainer';
import { Typography } from '@material-ui/core';
import { DragIndicator } from '@material-ui/icons';
import { Avatar, Button, Paper, Stack } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import moment from 'moment';
import React, { useState } from 'react';
import ModalSave from '../Modal/ModalSave';

const dummySticker = [
  { id: '1' },
  { id: '2' },
  { id: '3' },
  { id: '4' },
  { id: '5' },
  { id: '6' },
  { id: '7' },
  { id: '8' },
  { id: '9' },
  { id: '10' },
];

const ListSticker = ({ category }) => {
  const [stickers, setSticker] = useState(dummySticker);
  const [showModal, setShowModal] = useState(false);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const newList = Array.from(stickers);
    const [itemOrdered] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, itemOrdered);

    setSticker(newList);
  };

  return (
    <>
      <ModalSave showModal={showModal} onClose={() => setShowModal(!showModal)} onConfirm={() => setShowModal(!showModal)} />

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
              <img src={`/images/emoji/${category.image}`} style={{ width: 'auto', height: 30 }} />
            </Stack>
            <Stack direction="column">
              <Typography style={{ fontSize: 22, fontWeight: 'bold' }}>{category.name}</Typography>
              <Typography style={{ fontSize: 12, color: '#00000099' }}>
                Pembaruan terakhir {moment().format('DD/MM/YYYY')}
              </Typography>
            </Stack>
          </Stack>

          <Stack direction="column" gap={1} mt={3}>
            <Button
              variant="contained"
              color="secondary"
              style={{ height: 40 }}
              fullWidth
              disabled={JSON.stringify(stickers) === JSON.stringify(dummySticker)}
              onClick={() => setShowModal(!showModal)}>
              <Typography style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 1.25 }}>Simpan</Typography>
            </Button>
            <Button variant="text" color="secondary" style={{ height: 40 }} fullWidth>
              <Typography style={{ fontSize: 14, fontWeight: 'bold', letterSpacing: 1.25 }}>Batal</Typography>
            </Button>
          </Stack>
        </Stack>

        <Paper style={{ width: '100%' }}>
          <Stack direction="column" width="100%">
            <Stack direction="row" style={{ width: '100%', borderBottom: '1px solid #21212114', padding: 24 }}>
              <Typography style={{ width: '50%', fontSize: 14, paddingLeft: 40 }}>Nama Stiker</Typography>
              <Typography style={{ width: '30%', fontSize: 14 }}>Tanggal Unggah</Typography>
              <Typography style={{ width: '20%', fontSize: 14 }}>Jumlah Digunakan</Typography>
            </Stack>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="stickers">
                {(provided) => (
                  <Stack direction="column" {...provided.droppableProps} ref={provided.innerRef}>
                    {stickers.map((item, key) => {
                      return (
                        <Draggable key={item.id} draggableId={item.id} index={key}>
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
                              <Stack direction="row" gap={3} alignItems="center" style={{ width: '50%', paddingLeft: 20 }}>
                                <Avatar variant="rounded" src={new Error()} alt="X" style={{ width: 40, height: 40 }} />
                                <Typography style={{ fontSize: 14 }}>Stiker {item.id}</Typography>
                              </Stack>
                              <Typography style={{ width: '30%', fontSize: 14 }}>{moment().format('DD/MM/YYYY')}</Typography>
                              <Typography style={{ width: '20%', fontSize: 14 }}>{100}</Typography>
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
          </Stack>
        </Paper>
      </Stack>
    </>
  );
};

export default ListSticker;
