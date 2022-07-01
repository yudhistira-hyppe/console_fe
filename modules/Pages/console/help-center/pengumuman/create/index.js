import React, { useState } from 'react';
import Head from 'next/head';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Switch,
  TextField,
} from '@material-ui/core';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import GridContainer from '@jumbo/components/GridContainer';
import CKEditor from 'react-ckeditor-component';
import { KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import DeleteIcon from '@material-ui/icons/Delete';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Pengumuman', link: '/console/help-center/pengumuman' },
  { label: 'Buat Pengumuman', isActive: true },
];

const useRowStyles = makeStyles({
  formRoot: {
    width: '100%',
    '& .MuiTextField-root': {
      width: '100%',
    },
  },
  selectBox: {
    padding: '0px!important',
    '& .MuiCheckbox-root:not(:first-child)': {
      marginLeft: 40,
    },
  },
  selectBoxGroupTitle: {
    padding: '20px 12px 0 12px!important',
  },
  resultVoucherLists: {
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    textAlign: 'center',
    '& .MuiTypography-h5': {
      padding: 12,
    },
  },
  btnSecondary: {
    marginLeft: 8,
  },
  editorRoot: {
    borderBottom: '1px solid #d1d1d1',
    '& .cke_chrome': {
      border: 'none',
    },
    '& .cke_bottom': {
      borderTop: 'none',
    },
  },
  btnBottomAction: {
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  },
});

const ConsolePengumumanCreateComponent = () => {
  const router = useRouter();
  const classes = useRowStyles();
  const [content, setContent] = useState('');
  const [pickedDate, setPickedDate] = useState(moment());
  const [pickedTime, setPickedTime] = useState(moment());
  const [title, setTitle] = useState('');
  const [errorTitle, setErrorTitle] = useState('');
  const [penerima, setPenerima] = useState('all');
  const [isButtonPilihPenerimaClicked, setButtonPilihPenerimaClicked] = useState(false);

  const onChangeBody = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
  };

  const onBlurBody = (evt) => {
    console.log('onBlur event called with event info: ', evt);
  };

  const afterPasteBody = (evt) => {
    console.log('afterPaste event called with event info: ', evt);
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Buat Pengumuman</title>
      </Head>
      <PageContainer heading="Buat Pengumuman" breadcrumbs={breadcrumbs}>
        <CmtCard>
          <CmtCardHeader title="Buat Pengumuman" />
          <CmtCardContent>
            <GridContainer>
              <Grid item xs={12} lg={12}>
                <Box className={classes.formRoot}>
                  <TextField
                    error={errorTitle != ''}
                    helperText={errorTitle}
                    label="Judul"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} lg={12}>
                <CKEditor
                  scriptUrl="https://cdn.ckeditor.com/4.17.2/full/ckeditor.js"
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
                      'Subscript,Superscript,Strike,Source,Save,Templates,NewPage,ExportPdf,Preview,Print,PasteFromWord,PasteText,Paste,Copy,Cut,Redo,Undo,Find,Replace,SelectAll,Form,Scayt,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,CopyFormatting,RemoveFormat,BulletedList,NumberedList,Outdent,CreateDiv,Indent,Blockquote,BidiLtr,BidiRtl,Language,HorizontalRule,Table,Anchor,Smiley,SpecialChar,PageBreak,Iframe,Format,Styles,Font,FontSize,Maximize,TextColor,About,ShowBlocks,BGColor,Unlink',
                  }}
                  activeClass={classes.editorRoot}
                  content={content}
                  events={{
                    blur: onBlurBody,
                    afterPaste: afterPasteBody,
                    change: onChangeBody,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={3}>
                {!isButtonPilihPenerimaClicked && (
                  <Button variant="outlined" color="primary" onClick={() => setButtonPilihPenerimaClicked(true)}>
                    Pilih Penerima
                  </Button>
                )}
                {isButtonPilihPenerimaClicked && (
                  <FormControl component="fieldset">
                    <RadioGroup
                      aria-label="gender"
                      name="gender1"
                      value={penerima}
                      onChange={(e) => setPenerima(e.target.value)}>
                      <FormControlLabel value="all" control={<Radio />} label="Semua pengguna" />
                      <FormControlLabel
                        onClick={() => router.push('/console/help-center/pengumuman/pilih-pengguna')}
                        value="selected"
                        control={<Radio />}
                        label="Pengguna pilihan"
                      />
                    </RadioGroup>
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} lg={3}>
                <KeyboardDatePicker
                  className={classes.formRoot}
                  disableToolbar
                  format="DD/MM/yyyy"
                  margin="normal"
                  label="Tanggal"
                  value={pickedDate}
                  onChange={(date) => setPickedDate(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'Change Date',
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  label="Jam"
                  value={pickedTime}
                  onChange={(time) => setPickedTime(time)}
                  KeyboardButtonProps={{
                    'aria-label': 'Change time',
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={4}>
                <FormControl component="fieldset">
                  <FormGroup>
                    <FormControlLabel
                      value="push"
                      control={<Switch color="primary" />}
                      label="Pemberitahuan Dorong"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="inapp"
                      control={<Switch color="primary" />}
                      label="Pemberitahuan Dalam-App"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="page"
                      control={<Switch color="primary" />}
                      label="Halaman Pemberitahuan"
                      labelPlacement="start"
                    />
                    <FormControlLabel
                      value="email"
                      control={<Switch color="primary" />}
                      label="Email"
                      labelPlacement="start"
                    />
                  </FormGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} lg={12} className={classes.btnBottomAction}>
                <DeleteIcon />
                <Button variant="outlined" color="primary" className={classes.btnSecondary}>
                  Simpan Draf
                </Button>
                <Button variant="contained" disabled className={classes.btnSecondary}>
                  Pasang
                </Button>
              </Grid>
            </GridContainer>
          </CmtCardContent>
        </CmtCard>
      </PageContainer>
    </>
  );
};

export default ConsolePengumumanCreateComponent;
