import React, { useEffect, useState } from 'react';
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
import { useUpdateAnnouncementMutation } from 'api/console/helpCenter/announcement';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help-center' },
  { label: 'Pengumuman', link: '/console/help-center/pengumuman' },
  { label: 'Ubah Pengumuman', isActive: true },
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
  const [updateAnnouncement] = useUpdateAnnouncementMutation();
  const [isValidQuery, setIsValidQuery] = useState(false);
  const [data, setData] = useState({
    title: '',
    body: '',
    pushMessage: false,
    appMessage: false,
    appInfo: false,
    email: false,
    datesend: '',
  });
  const [content, setContent] = useState('');
  const [penerima, setPenerima] = useState('all');
  const [pickedDate, setPickedDate] = useState();
  const [pickedTime, setPickedTime] = useState();
  const [isSendButtonDisabled, setIsSendButtonDisabled] = useState(true);
  const [isButtonPilihPenerimaClicked, setButtonPilihPenerimaClicked] = useState(false);

  useEffect(() => {
    if (Object.keys(router.query).length > 0 && router.query.data) {
      const parsedQueryData = JSON.parse(router.query.data);
      setIsValidQuery(true);
      setData(parsedQueryData);
      setContent(parsedQueryData.body);
      setPenerima(parsedQueryData.tipe === 'all' ? 'all' : 'choice');
      setPickedDate(moment(parsedQueryData.datesend));
      setPickedTime(moment(parsedQueryData.datesend));
    } else {
      router.push('/console/help-center/pengumuman');
    }
  }, [router.query]);

  useEffect(() => {
    if (data.title && content && penerima) {
      setIsSendButtonDisabled(false);
    } else {
      setIsSendButtonDisabled(true);
    }
  }, [data.title, content, penerima]);

  const onChangeBody = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
  };

  const onChangeType = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.checked,
    });
  };

  const onClickSelectUsers = () => {
    if (data.tipe === 'choice') {
      const formattedDate = moment(pickedDate).format('YYYY-MM-DD');
      const formattedTime = moment(pickedTime).format('HH:mm:00');
      router.push(
        {
          pathname: '/console/help-center/pengumuman/pilih-pengguna',
          query: {
            data: JSON.stringify({
              ...data,
              body: content,
              datesend: `${formattedDate} ${formattedTime}`,
            }),
            actionType: 'edit',
          },
        },
        '/console/help-center/pengumuman/pilih-pengguna',
      );
    }
  };

  const onClickActionButton = (status) => {
    const idRequest = data._id;
    delete data._id;
    const bodyRequest = {
      ...data,
      body: content,
      datetimeSend: moment(pickedTime).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
      status,
    };
    delete bodyRequest.datesend;
    updateAnnouncement({ id: idRequest, body: bodyRequest })
      .then(() => router.push('/console/help-center/pengumuman'))
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Ubah Pengumuman</title>
      </Head>
      {isValidQuery ? (
        <PageContainer heading="Ubah Pengumuman" breadcrumbs={breadcrumbs}>
          <CmtCard>
            <CmtCardHeader title="Ubah Pengumuman" />
            <CmtCardContent>
              <GridContainer>
                <Grid item xs={12} lg={12}>
                  <Box className={classes.formRoot}>
                    <TextField
                      label="Judul"
                      value={data.title}
                      onChange={(e) => setData({ ...data, title: e.target.value })}
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
                        <FormControlLabel
                          value="all"
                          control={<Radio />}
                          label="Semua pengguna"
                          disabled={data.tipe !== 'all'}
                        />
                        <FormControlLabel
                          onClick={onClickSelectUsers}
                          value="choice"
                          control={<Radio />}
                          label="Pengguna pilihan"
                          disabled={data.tipe !== 'choice'}
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
                        control={
                          <Switch color="primary" checked={data.pushMessage} onChange={onChangeType} name="pushMessage" />
                        }
                        label="Pemberitahuan Dorong"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        control={
                          <Switch color="primary" checked={data.appMessage} onChange={onChangeType} name="appMessage" />
                        }
                        label="Pemberitahuan Dalam-App"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        control={<Switch color="primary" checked={data.appInfo} onChange={onChangeType} name="appInfo" />}
                        label="Halaman Pemberitahuan"
                        labelPlacement="start"
                      />
                      <FormControlLabel
                        control={<Switch color="primary" checked={data.email} onChange={onChangeType} name="email" />}
                        label="Email"
                        labelPlacement="start"
                      />
                    </FormGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={12} className={classes.btnBottomAction}>
                  {/* <DeleteIcon /> */}
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.btnSecondary}
                    onClick={() => onClickActionButton('draft')}>
                    Simpan Draf
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSendButtonDisabled}
                    className={classes.btnSecondary}
                    onClick={() => onClickActionButton('send')}>
                    Pasang
                  </Button>
                </Grid>
              </GridContainer>
            </CmtCardContent>
          </CmtCard>
        </PageContainer>
      ) : null}
    </>
  );
};

export default ConsolePengumumanCreateComponent;
