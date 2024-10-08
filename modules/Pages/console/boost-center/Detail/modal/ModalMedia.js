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
  height: '60vh',
  boxShadow: 24,
  p: 0,
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function ModalMedia({ showModal, onClose, contentType, idApsara, urlImage }) {
  const { data: apsaraVideo } = useGetVideoFromApsaraQuery({ apsaraId: idApsara });

  return (
    <Modal
      open={showModal}
      onClose={onClose}
      disableAutoFocus
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>
        {contentType === 'video' ? (
          <video src={apsaraVideo?.PlayUrl} controls height="100%" />
        ) : (
          <img src={urlImage} alt="image boost post" height="100%" />
        )}
      </Box>
    </Modal>
  );
}
