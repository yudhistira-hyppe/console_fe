import { Typography } from '@material-ui/core';
import { Close, CloudUpload, Delete, InfoOutlined } from '@material-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import PopoverBadge from '../component/PopoverBadge';

const ComponentStepRewards = ({ inputValue, handleInputChange, isDraft }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [popupKey, setPopupKey] = useState(null);

  const handleClick = (event, value) => {
    setAnchorEl(event.currentTarget);
    setPopupKey(value);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function formatBytes(bytes) {
    return (bytes / Math.pow(1024, 2)).toFixed(1);
  }

  const handleUploadImage = (e, key, kind) => {
    if (e.target.files[0]?.type !== 'image/png') {
      alert('salah format woyy 🤬');
      return;
    } else {
      const blob = new Blob(e.target.files, { type: e.target.files[0]?.type });
      const url = URL.createObjectURL(blob);
      let img = new Image();
      img.src = url;
      img.onload = () => {
        if (img.width > 80 && img.height > 80) {
          alert('ukuran imagenya kegedean woyy 🤬');
          return;
        }
        if (formatBytes(e.target.files[0].size) >= 2) {
          alert('size filenya kegedean woyy 🤬');
        } else {
          let prevVal = inputValue?.winner_ranking_badge;
          prevVal[key][kind] = e.target.files[0];
          prevVal[key][`url_${kind}`] = url;

          handleInputChange('winner_ranking_badge', prevVal);
        }
      };
    }
  };

  return (
    <Card sx={{ padding: 3 }}>
      <Stack direction="column" spacing={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography style={{ fontWeight: 'bold' }}>Ketentuan Hadiah</Typography>
          <Tooltip
            title={
              <Stack direction="column" p="8px">
                <Typography style={{ fontSize: 12 }}>
                  Partisipan akan menerima hadiah sesuai dengan ketentuan yang sudah ditetapkan.
                </Typography>
              </Stack>
            }
            arrow>
            <InfoOutlined style={{ fontSize: 14 }} />
          </Tooltip>
        </Stack>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={inputValue?.winner_badges || false}
                onChange={() => {
                  handleInputChange('winner_badges', !inputValue.winner_badges);
                  handleInputChange('winner_ranking_badge', undefined);
                }}
                disabled={!isDraft}
              />
            }
            label={<Typography style={{ color: '#737373' }}>Badge Pemenang</Typography>}
            style={{ width: 'fit-content' }}
          />
          {inputValue?.winner_badges && (
            <Stack direction="column" spacing={3}>
              <FormGroup style={{ gap: 12 }}>
                {Array.from({ length: 3 }, (item, key) => (
                  <Stack direction="column" key={key}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          checked={
                            inputValue?.winner_ranking_badge?.map((item) => item?.ranking)?.includes(key + 1) || false
                          }
                          onChange={() => {
                            if (inputValue?.winner_ranking_badge?.length > key) {
                              handleInputChange(
                                'winner_ranking_badge',
                                inputValue?.winner_ranking_badge?.filter((item) => item?.ranking <= key),
                              );
                            } else {
                              handleInputChange(
                                'winner_ranking_badge',
                                inputValue?.winner_ranking_badge?.length >= 1
                                  ? inputValue?.winner_ranking_badge?.find((item) => item?.ranking == key + 1)
                                    ? inputValue?.winner_ranking_badge?.filter((item) => item?.ranking != key + 1)
                                    : [...inputValue?.winner_ranking_badge, { ranking: key + 1 }]
                                  : [{ ranking: key + 1 }],
                              );
                            }
                          }}
                        />
                      }
                      label={<Typography style={{ color: '#737373' }}>Juara {`#${key + 1}`}</Typography>}
                      style={{ width: 'fit-content' }}
                      disabled={!isDraft}
                    />
                    {inputValue?.winner_ranking_badge?.map((item) => item?.ranking)?.includes(key + 1) && (
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Stack direction="column" spacing={1} style={{ position: 'relative' }}>
                          <Typography style={{ fontWeight: 'bold', fontSize: 14 }}>
                            Badge Profile<span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <label htmlFor={`badge-profile-${key}`}>
                            <Box
                              style={{
                                width: 140,
                                height: 140,
                                border: '1px dashed #9B9B9B',
                                borderRadius: 4,
                                backgroundColor: '#F0F0F0',
                                cursor:
                                  inputValue?.winner_ranking_badge[key]?.profile ===
                                    inputValue?.winner_ranking_badge[key]?.other &&
                                  !isEmpty(inputValue?.winner_ranking_badge[key]?.profile)
                                    ? 'default'
                                    : 'pointer',
                              }}>
                              {inputValue?.winner_ranking_badge[key]?.profile ? (
                                <Avatar
                                  src={inputValue?.winner_ranking_badge[key]?.url_profile}
                                  style={{ width: '100%', height: '100%' }}
                                  variant="rounded"
                                />
                              ) : (
                                <Stack
                                  direction="column"
                                  alignItems="center"
                                  justifyContent="center"
                                  spacing={1}
                                  height="100%">
                                  <CloudUpload style={{ fontSize: 36, color: '#9B9B9B' }} />
                                </Stack>
                              )}
                              <input
                                hidden
                                id={`badge-profile-${key}`}
                                type="file"
                                accept="image/png"
                                onChange={(e) => handleUploadImage(e, key, 'profile')}
                                disabled={
                                  inputValue?.winner_ranking_badge[key]?.profile ===
                                    inputValue?.winner_ranking_badge[key]?.other &&
                                  !isEmpty(inputValue?.winner_ranking_badge[key]?.profile)
                                }
                              />
                            </Box>
                          </label>
                          {inputValue?.winner_ranking_badge[key]?.profile && (
                            <IconButton
                              style={{ position: 'absolute', top: 26, right: 6, border: '1px solid #737373' }}
                              size="small"
                              onClick={() => {
                                let prevVal = inputValue?.winner_ranking_badge;

                                if (
                                  inputValue?.winner_ranking_badge[key]?.profile ===
                                  inputValue?.winner_ranking_badge[key]?.other
                                ) {
                                  prevVal[key]['profile'] = undefined;
                                  prevVal[key][`url_profile`] = undefined;
                                  prevVal[key]['other'] = undefined;
                                  prevVal[key][`url_other`] = undefined;
                                } else {
                                  prevVal[key]['profile'] = undefined;
                                  prevVal[key][`url_profile`] = undefined;
                                }

                                handleInputChange('winner_ranking_badge', prevVal);
                              }}>
                              <Close style={{ fontSize: 16 }} />
                            </IconButton>
                          )}
                          <Typography style={{ color: '#737373', fontSize: 14 }}>Bentuk Badge: Kotak</Typography>
                        </Stack>
                        <Stack direction="column" spacing={1} style={{ position: 'relative' }}>
                          <Typography style={{ fontWeight: 'bold', fontSize: 14 }}>
                            Badge Lainnya<span style={{ color: 'red' }}>*</span>
                          </Typography>
                          <label htmlFor={`badge-other-${key}`}>
                            <Box
                              style={{
                                width: 140,
                                height: 140,
                                border: '1px dashed #9B9B9B',
                                borderRadius: 4,
                                backgroundColor: '#F0F0F0',
                                cursor:
                                  inputValue?.winner_ranking_badge[key]?.profile ===
                                    inputValue?.winner_ranking_badge[key]?.other &&
                                  !isEmpty(inputValue?.winner_ranking_badge[key]?.other)
                                    ? 'default'
                                    : 'pointer',
                              }}>
                              {inputValue?.winner_ranking_badge[key]?.other ? (
                                <Avatar
                                  src={inputValue?.winner_ranking_badge[key]?.url_other}
                                  style={{ width: '100%', height: '100%' }}
                                  variant="rounded"
                                />
                              ) : (
                                <Stack
                                  direction="column"
                                  alignItems="center"
                                  justifyContent="center"
                                  spacing={1}
                                  height="100%">
                                  <CloudUpload style={{ fontSize: 36, color: '#9B9B9B' }} />
                                </Stack>
                              )}
                              <input
                                hidden
                                id={`badge-other-${key}`}
                                type="file"
                                accept="image/png"
                                onChange={(e) => handleUploadImage(e, key, 'other')}
                                disabled={
                                  inputValue?.winner_ranking_badge[key]?.profile ===
                                    inputValue?.winner_ranking_badge[key]?.other &&
                                  !isEmpty(inputValue?.winner_ranking_badge[key]?.other)
                                }
                              />
                            </Box>
                          </label>
                          {inputValue?.winner_ranking_badge[key]?.other && (
                            <IconButton
                              style={{ position: 'absolute', top: 26, right: 6, border: '1px solid #737373' }}
                              size="small"
                              onClick={() => {
                                let prevVal = inputValue?.winner_ranking_badge;

                                if (
                                  inputValue?.winner_ranking_badge[key]?.profile ===
                                  inputValue?.winner_ranking_badge[key]?.other
                                ) {
                                  prevVal[key]['profile'] = undefined;
                                  prevVal[key][`url_profile`] = undefined;
                                  prevVal[key]['other'] = undefined;
                                  prevVal[key][`url_other`] = undefined;
                                } else {
                                  prevVal[key]['other'] = undefined;
                                  prevVal[key][`url_other`] = undefined;
                                }

                                handleInputChange('winner_ranking_badge', prevVal);
                              }}>
                              <Close style={{ fontSize: 16 }} />
                            </IconButton>
                          )}
                          <Typography style={{ color: '#737373', fontSize: 14 }}>Bentuk Badge: Bulat</Typography>
                        </Stack>
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ height: '100%', padding: '12px 16px' }}
                          onClick={(e) => {
                            handleClick(e, key);
                          }}>
                          <Typography style={{ textTransform: 'capitalize', fontSize: 14 }}>
                            Pilih dari penyimpanan badge
                          </Typography>
                        </Button>

                        <PopoverBadge
                          anchorEl={anchorEl}
                          handleClose={handleClose}
                          inputValue={inputValue}
                          handleInputChange={handleInputChange}
                          itemKey={popupKey}
                        />
                      </Stack>
                    )}
                  </Stack>
                ))}
              </FormGroup>
              <Stack direction="column" spacing={1}>
                <Typography style={{ fontWeight: 'bold', color: '#737373' }}>
                  Ketentuan Gambar<span style={{ color: 'red' }}>*</span>
                </Typography>
                <Typography style={{ color: '#737373', fontSize: 14 }}>Ukuran Gambar : 80px x 80px</Typography>
                <Typography style={{ color: '#737373', fontSize: 14 }}>Format Gambar : PNG</Typography>
                <Typography style={{ color: '#737373', fontSize: 14 }}>Ukuran File : Min 800kb - Max 2mb</Typography>
              </Stack>
            </Stack>
          )}

          <Divider flexItem style={{ margin: '24px 0' }} />

          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                checked={inputValue?.winner_rewards || false}
                onChange={() => {
                  handleInputChange('winner_rewards', !inputValue.winner_rewards);
                  handleInputChange('winner_rewards_type', inputValue.winner_rewards ? undefined : 'ranking');
                  handleInputChange('winner_ranking_price', undefined);
                }}
                disabled={!isDraft}
              />
            }
            label={<Typography style={{ color: '#737373' }}>Hadiah Pemenang</Typography>}
            style={{ width: 'fit-content' }}
          />

          {inputValue?.winner_rewards && (
            <RadioGroup
              value={inputValue?.winner_rewards_type || ''}
              onChange={(e) => {
                handleInputChange('winner_rewards_type', e.target.value);

                if (e.target.value === 'ranking') {
                  handleInputChange('reward_poin', undefined);
                  handleInputChange('max_reward', undefined);
                } else {
                  handleInputChange('winner_ranking_price', undefined);
                }
              }}>
              <FormControlLabel
                value="ranking"
                control={<Radio color="secondary" />}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography style={{ color: '#9B9B9B' }}>Sesuai Ranking</Typography>
                    <Tooltip
                      title={
                        <Typography style={{ fontSize: 12, padding: 8 }}>
                          Partisipan akan menerima hadiah berdasarkan peringkat terakhir yang mereka.
                        </Typography>
                      }
                      arrow>
                      <InfoOutlined style={{ fontSize: 14 }} />
                    </Tooltip>
                  </Stack>
                }
                style={{ width: 'fit-content' }}
                disabled={!isDraft}
              />
              {inputValue?.winner_rewards_type === 'ranking' && (
                <FormGroup style={{ marginBottom: 24, gap: 12 }}>
                  {Array.from({ length: 3 }, (item, key) => (
                    <Stack direction="column" key={key}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            color="secondary"
                            checked={
                              inputValue?.winner_ranking_price?.map((item) => item?.ranking)?.includes(key + 1) || false
                            }
                            onChange={() => {
                              if (inputValue?.winner_ranking_price?.length > key) {
                                handleInputChange(
                                  'winner_ranking_price',
                                  inputValue?.winner_ranking_price?.filter((item) => item?.ranking <= key),
                                );
                              } else {
                                handleInputChange(
                                  'winner_ranking_price',
                                  inputValue?.winner_ranking_price?.length >= 1
                                    ? inputValue?.winner_ranking_price?.find((item) => item?.ranking == key + 1)
                                      ? inputValue?.winner_ranking_price?.filter((item) => item?.ranking != key + 1)
                                      : [...inputValue?.winner_ranking_price, { ranking: key + 1, price: '' }]
                                    : [{ ranking: key + 1, price: '' }],
                                );
                              }
                            }}
                          />
                        }
                        label={<Typography style={{ color: '#737373' }}>Juara {`#${key + 1}`}</Typography>}
                        style={{ width: 'fit-content' }}
                        disabled={!isDraft}
                      />
                      {inputValue?.winner_ranking_price?.map((item) => item?.ranking)?.includes(key + 1) && (
                        <TextField
                          placeholder="0"
                          value={inputValue?.winner_ranking_price[key]?.price}
                          onChange={(e) => {
                            let prevVal = inputValue?.winner_ranking_price;
                            prevVal[key].price = e.target.value;

                            handleInputChange('winner_ranking_price', prevVal);
                          }}
                          size="small"
                          color="secondary"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography style={{ fontWeight: 'bold' }}>Rp</Typography>
                              </InputAdornment>
                            ),
                          }}
                          inputProps={{
                            onKeyPress: (event) => {
                              if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                              }
                            },
                          }}
                          sx={{ '& input': { height: 32 } }}
                          style={{ width: 250 }}
                          disabled={!isDraft}
                        />
                      )}
                    </Stack>
                  ))}
                </FormGroup>
              )}

              <FormControlLabel
                value="poin"
                control={<Radio color="secondary" />}
                label={
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Typography style={{ color: '#9B9B9B' }}>Sesuai Poin</Typography>
                    <Tooltip
                      title={
                        <Typography style={{ fontSize: 12, padding: 8 }}>
                          Partisipan akan menerima hadiah berdasarkan jumlah poin yang sudah ditentukan.
                        </Typography>
                      }
                      arrow>
                      <InfoOutlined style={{ fontSize: 14 }} />
                    </Tooltip>
                  </Stack>
                }
                style={{ width: 'fit-content' }}
                disabled={!isDraft}
              />
              {inputValue?.winner_rewards_type === 'poin' && (
                <Stack direction="column" spacing={2} mt={1}>
                  <Stack direction="column" spacing={1}>
                    <Typography>
                      Set Hadiah Per-poin<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      placeholder="0"
                      color="secondary"
                      value={inputValue?.reward_poin || ''}
                      onChange={(e) => handleInputChange('reward_poin', e.target.value)}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography style={{ fontWeight: 'bold' }}>Rp</Typography>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        onKeyPress: (event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        },
                      }}
                      sx={{ '& input': { height: 32 } }}
                      style={{ width: 250 }}
                      disabled={!isDraft}
                    />
                  </Stack>
                  <Stack direction="column" spacing={1}>
                    <Typography>
                      Set Maximal Hadiah<span style={{ color: 'red' }}>*</span>
                    </Typography>
                    <TextField
                      placeholder="0"
                      color="secondary"
                      value={inputValue?.max_reward || ''}
                      onChange={(e) => handleInputChange('max_reward', e.target.value)}
                      size="small"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography style={{ fontWeight: 'bold' }}>Rp</Typography>
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{
                        onKeyPress: (event) => {
                          if (!/[0-9]/.test(event.key)) {
                            event.preventDefault();
                          }
                        },
                      }}
                      sx={{ '& input': { height: 32 } }}
                      style={{ width: 250 }}
                      disabled={!isDraft}
                    />
                  </Stack>
                </Stack>
              )}
            </RadioGroup>
          )}
        </FormGroup>
      </Stack>
    </Card>
  );
};

export default ComponentStepRewards;
