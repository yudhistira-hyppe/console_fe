import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { makeStyles } from '@material-ui/core/styles';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import { useRouter } from 'next/router';
import { Box, Button, Grid, TextField } from '@material-ui/core';
import CmtCard from '@coremat/CmtCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import CmtCardContent from '@coremat/CmtCard/CmtCardContent';
import GridContainer from '@jumbo/components/GridContainer';
import CKEditor from 'react-ckeditor-component';
// import DeleteIcon from '@material-ui/icons/Delete';
import { useCreateDetailForFaqAndInfoMutation } from 'api/console/helpCenter/faqAndInfo';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Help Center', link: '/console/help_center' },
  { label: 'Hyppe Info', link: '/console/help_center/hyppe_info' },
  { label: 'Detail Info', isActive: true },
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

const ConsoleAddInfoComponent = () => {
  const router = useRouter();
  const classes = useRowStyles();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [addDetailInfo] = useCreateDetailForFaqAndInfoMutation();

  useEffect(() => {
    if (!router.query.id) {
      router.back();
    }
  }, [router.query]);

  useEffect(() => {
    if (title && content) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [title, content]);

  const onChangeBody = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
  };

  const onSubmitDetail = () => {
    if (title && content && router.query?.id) {
      addDetailInfo({
        Idfaqs: router.query?.id,
        title: title,
        body: content,
      })
        .then(() => router.push('/console/help_center/hyppe_info'))
        .catch((err) => console.error(err));
    }
  };

  const onCancel = () => {
    router.push('/console/help_center/hyppe_info');
  };

  return (
    <>
      <Head>
        <title key="title">Hyppe-Console :: Detail Info</title>
      </Head>
      <PageContainer heading="Detail Info" breadcrumbs={breadcrumbs}>
        <CmtCard>
          <CmtCardHeader title="Detail Info" />
          <CmtCardContent>
            <GridContainer>
              <Grid item xs={12} lg={12}>
                <Box className={classes.formRoot}>
                  <TextField label="Judul" value={title} onChange={(e) => setTitle(e.target.value)} />
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
              <Grid item xs={6} lg={6}>
                <Button variant="outlined" color="primary" className={classes.btnSecondary} onClick={onCancel}>
                  Batal
                </Button>
                {/* <Button variant="outlined" color="primary" className={classes.btnSecondary}>
                  Simpan Draf
                </Button>
                <Button color="default" startIcon={<DeleteIcon />} className={classes.btnSecondary}></Button> */}
              </Grid>
              <Grid item xs={6} lg={6} className={classes.btnBottomAction}>
                <Button variant="contained" color="primary" disabled={disableSubmit} onClick={onSubmitDetail}>
                  Simpan
                </Button>
              </Grid>
            </GridContainer>
          </CmtCardContent>
        </CmtCard>
      </PageContainer>
    </>
  );
};

export default ConsoleAddInfoComponent;
