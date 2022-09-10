import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { Avatar, Button, Card, Chip, Divider, Link, Typography } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import React, { useState } from 'react';
import { Stack } from '@mui/material';
import Ckeditor from 'react-ckeditor-component/lib/ckeditor';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Breadcrumbs from '../BreadCrumb/index';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Bantuan Pengguna', link: '/console/help-center/bantuan-pengguna' },
  { label: 'Detil Masalah', isActive: true },
];

const DetailBantuanPengguna = () => {
  const [dummyData, setDummyData] = useState([
    { 'Nomor Tiket': '004/22/08/22', type: 'text' },
    { Sumber: 'Formulir', type: 'text' },
    { Pengirim: 'stephanie@example.com', type: 'text' },
    { 'Ditangani Oleh': 'Paramita S', type: 'chip' },
    { 'Divisi Pendukung': 'Paramita S', type: 'select' },
    { 'Penerima Tugas': 'Paramita S', type: 'select' },
    { 'Waktu Masuk': '-', type: 'text' },
    { 'Percakapan Terakhir': 'Paramita S', type: 'text' },
    { 'Sistem Operasi': 'IOS', type: 'text' },
    { 'Versi Aplikasi': 'Paramita S', type: 'text' },
    { Kategori: 'Akun & Verifikasi', type: 'text' },
    { Level: '4', type: 'text' },
  ]);
  const router = useRouter();

  const onBackHandler = () => {
    router.push('/console/help-center/bantuan-pengguna');
  };

  return (
    <>
      <PageContainer>
        <Stack direction={'column'} spacing={2} mb={3}>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <Link href="/" onClick={onBackHandler} style={{ cursore: 'pointer' }}>
            <Stack direction={'row'}>
              <Stack direction={'column'} justifyContent={'center'}>
                <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '15px', fontWeight: 'bold' }} />
              </Stack>
              <Stack>
                <Typography variant="h1" style={{ color: 'black' }}>
                  Kembali
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <div style={{ flex: 2 }}>
            <Stack direction={'column'} spacing={2}>
              <Typography variant="h1">Tidak Bisa Login dengan Gmail</Typography>
              <Typography variant="subtitle2">
                Icon Gmail pada halaman login tidak bisa saya klik saat ingin login menggunakan akun Gmail saya
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Chip
                  label="Filename.zip"
                  deleteIcon={<MoreIcon />}
                  onDelete
                  avatar={<Avatar>I</Avatar>}
                  style={{ marginRight: '1em' }}
                />
                <Chip
                  label="Filename.zip"
                  deleteIcon={<MoreIcon />}
                  onDelete
                  avatar={<Avatar>I</Avatar>}
                  style={{ marginRight: '1em' }}
                />
                <Stack direction={'column'} justifyContent={'center'}>
                  <Typography variant="subtitle2" style={{ color: 'rgba(0, 0, 0, 0.38)' }}>
                    +1 Lagi
                  </Typography>
                </Stack>
              </div>
            </Stack>
            <Divider style={{ margin: '1.3em 0px 1.3em 0px' }} />

            <div>
              <Typography variant="h3">Aktifitas</Typography>
              <Stack my={1} direction={'row'}>
                <Button variant="contained" size="small" style={{ elevation: 0, boxShadow: 'none', marginRight: '10px' }}>
                  Pesan
                </Button>
                <Button style={{ elevation: 0, boxShadow: 'none', marginRight: '10px' }}>Komentar</Button>
                <Button>Riwayat</Button>
              </Stack>

              <Ckeditor
                config={{
                  toolbarLocation: 'bottom',
                  toolbarGroups: [
                    { name: 'document', groups: ['mode', 'document', 'doctools'] },
                    { name: 'clipboard', groups: ['clipboard', 'undo'] },
                    { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                    { name: 'forms', groups: ['forms'] },
                    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                    { name: 'links', groups: ['links'] },
                    { name: 'insert', groups: ['Image', 'Table'] },
                    { name: 'styles', groups: ['styles'] },
                    { name: 'colors', groups: ['colors'] },
                    { name: 'tools', groups: ['tools'] },
                    { name: 'others', groups: ['others'] },
                    { name: 'about', groups: ['about'] },
                  ],
                  removeButtons:
                    'Subscript,Superscript,Strike,Save,Templates,NewPage,ExportPdf,Preview,Print,PasteFromWord,PasteText,Paste,Copy,Cut,Redo,Undo,Find,Replace,SelectAll,Form,Scayt,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,BulletedList,NumberedList,Outdent,CreateDiv,Indent,Blockquote,BidiLtr,BidiRtl,Language,HorizontalRule,Table,Anchor,Smiley,SpecialChar,PageBreak,Iframe,Format,Styles,Font,FontSize,Maximize,TextColor,About,ShowBlocks,BGColor,Unlink,Italic,Bold,Underline,',
                }}
                // activeClass={classes.replyDialogEditor}
                // content={content}
                // events={{
                //   change: onChangeBody,
                // }}
              />
            </div>
          </div>

          <Card style={{ flex: 1, padding: '2em' }}>
            <Button variant="contained">Baru</Button>
            {dummyData?.map((el, i) => {
              if (el.type === 'text') {
                return (
                  <Stack direction={'row'} spacing={1} mt={2} key={i}>
                    <div style={{ flex: 1 }}>
                      <Typography variant="body2">{Object.keys(el)[0]}</Typography>
                    </div>
                    <div style={{ flex: 2 }}>
                      <Typography variant="body2" color="#00000099" style={{ opacity: '0.6' }}>
                        {el[`${Object.keys(el)[0]}`]}
                      </Typography>
                    </div>
                  </Stack>
                );
              } else if (el.type === 'chip') {
                return (
                  <Stack direction={'row'} spacing={1} mt={2} key={i}>
                    <Stack direction={'column'} justifyContent={'center'} flex={1}>
                      <Typography variant="body2">{Object.keys(el)[0]}</Typography>
                    </Stack>
                    <div style={{ flex: 2 }}>
                      <Chip label={el[`${Object.keys(el)[0]}`]} Filled />
                    </div>
                  </Stack>
                );
              } else if (el.type === 'select') {
                return (
                  <Stack direction={'row'} spacing={1} mt={2} key={i}>
                    <Stack direction={'column'} justifyContent={'center'} flex={1}>
                      <Typography variant="body2">{Object.keys(el)[0]}</Typography>
                    </Stack>
                    <div style={{ flex: 2 }}>
                      <FormControl sx={{ m: 1, minWidth: '50%' }} size="small">
                        <Select
                          // value={age}
                          // onChange={handleChange}
                          displayEmpty
                          inputProps={{ 'aria-label': 'Without label' }}>
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={10}>Ten</MenuItem>
                          <MenuItem value={20}>Twenty</MenuItem>
                          <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </Stack>
                );
              }
            })}
          </Card>
        </Stack>
      </PageContainer>
    </>
  );
};

export default DetailBantuanPengguna;
