import React, { useState } from 'react';
import ListHeader from './ListHeader';
import ContactCell from './ContactCell';
import useStyles from '../../index.style';
import { Table, TableBody, Box, Typography, TextField, Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import LaunchIcon from '@material-ui/icons/Launch';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import TrashIcon from '@material-ui/icons/Delete';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MinimizeIcon from '@material-ui/icons/Minimize';
import CKEditor from 'react-ckeditor-component';

function HeaderDialog({ closeDialog }) {
  const classes = useStyles();

  return (
    <Box className={classes.replyDialogHeader}>
      <Box display="flex">
        <EditIcon style={{ fontSize: 18, marginTop: 4 }} />
        <Typography component="div" variant="h5" className={classes.replyDialogHeaderIcon}>
          Teruskan
        </Typography>
      </Box>
      <Box display="flex">
        <MinimizeIcon className={classes.replyDialogHeaderIcon} />
        <LaunchIcon className={classes.replyDialogHeaderIcon} />
        <CloseIcon onClick={closeDialog} className={classes.replyDialogHeaderIcon} />
      </Box>
    </Box>
  );
}

const ListTableView = ({ data }) => {
  const classes = useStyles();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [content, setContent] = useState('');

  const onClickReply = () => {
    setDialogOpen(true);
  };
  const closeDialog = () => {
    setDialogOpen(false);
  };
  const onClickDelete = () => {};
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
    <React.Fragment>
      <ListHeader />
      <Table>
        <TableBody>
          {data &&
            data.map((list, index) => (
              <ContactCell key={index} contact={list} onClickReply={onClickReply} onClickDelete={onClickDelete} />
            ))}
        </TableBody>
      </Table>
      {dialogOpen && (
        <Box className={classes.replyDialog}>
          <HeaderDialog closeDialog={closeDialog} />

          <Box style={{ padding: 20, position: 'relative' }}>
            <TextField label="Kepada" fullWidth />
            <Box style={{ position: 'absolute', right: 0, bottom: 16 }}>
              <Button style={{ textTransform: 'capitalize', color: '#ccc' }}>Cc</Button>
              <Button style={{ textTransform: 'capitalize', color: '#ccc' }}>Bcc</Button>
            </Box>
          </Box>
          <Box style={{ padding: '0 20px' }}>
            <TextField label="Subjek" fullWidth />
          </Box>
          <Box style={{ padding: '0 20px' }}>
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
              activeClass={classes.replyDialogEditor}
              content={content}
              events={{
                blur: onBlurBody,
                afterPaste: afterPasteBody,
                change: onChangeBody,
              }}
            />
          </Box>
          <Box display="flex" style={{ padding: 20, justifyContent: 'space-between' }}>
            <Box>
              <Button variant="contained" startIcon={<SendIcon />} color="primary">
                Send
              </Button>
              <Button startIcon={<AttachFileIcon />} style={{ color: '#dadada' }}></Button>
            </Box>
            <Button startIcon={<TrashIcon />} style={{ color: '#dadada' }} onClick={closeDialog}></Button>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default ListTableView;
