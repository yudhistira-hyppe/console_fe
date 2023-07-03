import React from 'react';
import { Typography } from '@material-ui/core';
import { Box, IconButton, Modal, Stack } from '@mui/material';
import { ChevronRight, Close } from '@material-ui/icons';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 3,
  borderRadius: '12px',
};

const ModalKickUser = ({ open, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Stack direction="column" gap={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography style={{ fontWeight: 'bold', textAlign: 'center', fontSize: 20 }}>
              Mengapa Anda Mengeluarkan Partisipan ini?
            </Typography>

            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Typography style={{ color: '#00000099', fontSize: 14 }}>
              Ekstremisme Kekerasan: Ancaman dan hasutan kekerasan, individu dan organisasi berbahaya - organisasi teroris,
              kebencian terorganisir, organisasi kriminal.
            </Typography>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Typography style={{ color: '#00000099', fontSize: 14 }}>
              Perilaku Kebencian: Serangan berdasarkan atribut dilindungi - ras, etnis, asal kebangsaan, agama, kasta,
              orientasi seksual, jenis kelamin, identitas gender, status imigrasi, hinaan, ideologi kebencian.
            </Typography>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Typography style={{ color: '#00000099', fontSize: 14 }}>
              Kegiatan Ilegal dan Barang Teratur: Kegiatan kriminal, senjata, narkoba, obat terlarang, alkohol, tembakau,
              penipuan, kecurangan, perjudian, privasi, data pribadi, informasi identifikasi pribadi (PII).
            </Typography>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Typography style={{ color: '#00000099', fontSize: 14 }}>
              Konten Kekerasan dan Grafis: Konten manusia yang menggambarkan kematian atau kecelakaan yang kejam atau grafis.
            </Typography>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Typography style={{ color: '#00000099', fontSize: 14 }}>
              Bunuh Diri, Melukai Diri Sendiri, dan Tindakan Berbahaya: Bunuh diri, melukai diri sendiri dan gangguan makan,
              tindakan berbahaya.
            </Typography>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Typography style={{ color: '#00000099', fontSize: 14 }}>
              Pelecehan dan Penindasan: Perilaku kasar, pelecehan seksual, ancaman peretasan, doxxing, pemerasan.
            </Typography>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Typography style={{ color: '#00000099', fontSize: 14 }}>
              Ekstremisme Kekerasan: Ancaman dan hasutan kekerasan, individu dan organisasi berbahaya - organisasi teroris,
              kebencian terorganisir, organisasi kriminal.
            </Typography>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Typography style={{ color: '#00000099', fontSize: 14 }}>
              Konten Dewasa dan Aktivitas Seksual: Eksploitasi seksual, ketelanjangan dan aktivitas seksual orang dewasa.
            </Typography>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Typography style={{ color: '#00000099', fontSize: 14 }}>
              Keamanan Anak: Eksploitasi seksual anak, perilaku grooming, ketelanjangan dan aktivitas seksual anak, aktivitas
              berbahaya oleh anak, bahaya fisik dan psikologis anak, kejahatan terhadap anak.
            </Typography>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
            <Typography style={{ color: '#00000099', fontSize: 14 }}>
              Integritas dan Keaslian: Spam dan keterlibatan palsu, peniruan, informasi yang salah, pelanggaran hak kekayaan
              intelektual.
            </Typography>
            <IconButton>
              <ChevronRight />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalKickUser;
