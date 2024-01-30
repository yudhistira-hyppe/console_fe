import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CardMedia from '@material-ui/core/CardMedia';
import { useGetVideoFromApsaraQuery } from 'api/console/ads';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  width: '500px',
  height: 'auto',
  maxHeight: '80vh',
  boxShadow: 24,
  p: 0,
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
};

export default function ModalMedia({ showModal, onClose, contentType, idApsara, urlImage }) {
  const { data: adsVideo } = useGetVideoFromApsaraQuery({ apsaraId: idApsara });

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus>
      <Box sx={style}>
        {contentType === 'video' ? (
          <video src={adsVideo?.PlayUrl} controls width="100%" height="auto" />
        ) : (
          <img src={urlImage} alt="image ads" width="100%" height="auto" />
        )}
      </Box>
    </Modal>
  );
}
