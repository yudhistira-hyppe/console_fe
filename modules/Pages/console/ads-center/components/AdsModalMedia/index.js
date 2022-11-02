import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CardMedia from '@material-ui/core/CardMedia';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '50%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 0,
  borderRadius: '4px',
};

export default function AdsModalMedia({ showModal, onClose }) {

    return (
    <div>
      <Modal
        open={showModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <CardMedia 
            component={'iframe'}
            height={'100%'}
            image="https://www.youtube.com/embed/ZnuwB35GYMY?controls=0"
            title="YouTube video player"
            alt="green-iguana"
            allowFullScreen
          />
        </Box>
      </Modal>
    </div>
  );
}
