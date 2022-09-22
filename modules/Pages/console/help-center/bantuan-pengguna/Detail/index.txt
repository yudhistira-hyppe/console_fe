import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Box,
  IconButton,
  Typography,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from '@material-ui/core';
import CKEditor from 'react-ckeditor-component';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SendIcon from '@material-ui/icons/Send';
import CmtAvatar from '@coremat/CmtAvatar';
import SpinnerLoading from 'components/common/loading/spinner';
import useStyles from '../index.style';
import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';
import { useCreateReplyTicketMutation, useGetTicketByIdQuery } from 'api/console/helpCenter/ticket';

const Detail = ({ ticketId, onCloseDetail }) => {
  const classes = useStyles();
  const { authUser } = useAuth();
  const [detail, setDetail] = useState({});
  const [content, setContent] = useState('');
  const [statusReply, setStatusReply] = useState('');
  const [isButtonReplyDisabled, setIsButtonReplyDisabled] = useState(true);
  const { data, isFetching } = useGetTicketByIdQuery(ticketId);
  const [replyTicket] = useCreateReplyTicketMutation();

  useEffect(() => {
    if (data && data.data.length > 0) {
      setDetail(data.data[0]);
    }
  }, [data]);

  useEffect(() => {
    if (content && statusReply) {
      setIsButtonReplyDisabled(false);
    } else {
      setIsButtonReplyDisabled(true);
    }
  }, [content, statusReply]);

  const getMediaUri = (mediaEndpoint) => {
    const authToken = `?x-auth-token=${authUser.token}&x-auth-user=${authUser.user.email}`;

    return `${STREAM_URL}${mediaEndpoint}${authToken}`;
  };

  const onChangeBody = (evt) => {
    const newContent = evt.editor.getData();
    setContent(newContent);
  };

  const onClickSendReply = () => {
    if (content && statusReply) {
      replyTicket({
        IdUserticket: detail._id,
        subject: 'balasan',
        body: content,
        status: statusReply,
      })
        .then(() => {
          setContent();
          setStatusReply();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <>
      {isFetching ? (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center">
          <SpinnerLoading />
        </Box>
      ) : (
        <Box width="calc(100% - 256px)">
          <Box padding="24px" borderBottom="1px solid rgba(0, 0, 0, 0.12)">
            <IconButton size="small" onClick={onCloseDetail}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Box paddingTop="20px">
            <Typography variant="h3" style={{ marginBottom: 16, padding: '0 24px 0 24px' }}>
              {detail?.subject}
            </Typography>
            <Box display="flex" alignItems="center" gridGap="18px" padding="0 24px 0 24px" marginBottom="16px">
              <CmtAvatar size={40} src={getMediaUri(detail?.avatar?.mediaEndpoint)} alt={detail?.userrequest} />
              <Box display="flex" alignItems="center" gridGap="4px">
                <Typography style={{ fontSize: '16px', lineHeight: '24px', color: 'rgba(0, 0, 0, 0.87)' }}>
                  {detail?.userrequest}
                </Typography>
                <Typography style={{ fontSize: '12px', lineHeight: '16px', color: 'rgba(0, 0, 0, 0.6)' }}>
                  {`<${detail?.email}>`}
                </Typography>
              </Box>
            </Box>
            <Box borderTop="1px solid rgba(0, 0, 0, 0.12)" position="relative" padding="32px 24px">
              <Typography
                style={{
                  padding: '4px 12px',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  borderRadius: '4px',
                  position: 'absolute',
                  right: 0,
                  backgroundColor: '#FFF',
                  top: '-17px',
                  width: 'fit-content',
                  margin: 'auto',
                  left: 0,
                  color: 'rgba(0, 0, 0, 0.6)',
                }}>
                {moment(detail?.datetime).locale('id').utc().format('DD MMMM YYYY, HH:mm')}
              </Typography>
              <div dangerouslySetInnerHTML={{ __html: detail?.body }} />
            </Box>
            {detail?.replydata?.length > 0 &&
              detail?.replydata?.map((item) => (
                <Box key={item._id} borderTop="1px solid rgba(0, 0, 0, 0.12)" position="relative" padding="32px 24px">
                  <Typography
                    style={{
                      padding: '4px 12px',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      borderRadius: '4px',
                      position: 'absolute',
                      right: 0,
                      backgroundColor: '#FFF',
                      top: '-17px',
                      width: 'fit-content',
                      margin: 'auto',
                      left: 0,
                      color: 'rgba(0, 0, 0, 0.6)',
                    }}>
                    {moment(item.datetime).locale('id').utc().format('DD MMMM YYYY, HH:mm')}
                  </Typography>
                  <div dangerouslySetInnerHTML={{ __html: item.body }} />
                </Box>
              ))}
            {detail?.status !== 'close' && (
              <Box borderTop="1px solid rgba(0, 0, 0, 0.12)">
                <CKEditor
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
                    change: onChangeBody,
                  }}
                />
                <Box display="flex" padding="24px" alignItems="center" justifyContent="space-between">
                  <FormControl>
                    <FormLabel>Pilih Status Balasan Tiket</FormLabel>
                    <RadioGroup row value={statusReply} onChange={(_, status) => setStatusReply(status)}>
                      <FormControlLabel value="onprogress" control={<Radio />} label="Masih Berjalan" />
                      <FormControlLabel value="close" control={<Radio />} label="Selesai" />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    style={{ height: '100%' }}
                    variant="contained"
                    startIcon={<SendIcon />}
                    color="primary"
                    disabled={isButtonReplyDisabled}
                    onClick={onClickSendReply}>
                    Kirim
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

Detail.propTypes = {
  ticketId: PropTypes.string,
  onCloseDetail: PropTypes.func,
};

export default Detail;
