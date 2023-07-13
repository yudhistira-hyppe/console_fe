import { Typography } from '@material-ui/core';
import { InfoOutlined } from '@material-ui/icons';
import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  MenuItem,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import CheckboxCounter from 'modules/Components/CommonComponent/CheckboxCounter';
import NumberPlusMinus from 'modules/Components/CommonComponent/NumberPlusMinus';
import React from 'react';

const ComponentStepType = ({ inputValue, handleInputChange }) => {
  return (
    <Card sx={{ padding: 3 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography style={{ fontWeight: 'bold' }}>Tipe Challenge</Typography>
        <Tooltip
          title={
            <Stack direction="column" p="8px">
              <Typography style={{ fontSize: 12 }}>
                Metrik Akun mengukur aktivitas pengguna, sedangkan Metrik Konten mengukur aktivitas konten yang dihasilkan
                oleh pengguna.
              </Typography>
            </Stack>
          }
          arrow>
          <InfoOutlined style={{ fontSize: 14 }} />
        </Tooltip>
      </Stack>
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={4}>
          <Stack direction="column" spacing={1}>
            <Typography>
              Object Challenge<span style={{ color: 'red' }}>*</span>
            </Typography>
            <TextField
              select
              color="secondary"
              value={inputValue?.object || ''}
              onChange={(e) => {
                handleInputChange('object', e.target.value);
                if (e.target.value === 'account') {
                  handleInputChange('metric', 'activity');
                  handleInputChange('activity_referal', 0);
                  handleInputChange('activity_following', 0);
                  handleInputChange('with_hashtag', false);
                  handleInputChange('hashtag', undefined);
                  handleInputChange('content_like_vid', 0);
                  handleInputChange('content_like_pic', 0);
                  handleInputChange('content_like_diary', 0);
                  handleInputChange('content_view_vid', 0);
                  handleInputChange('content_view_diary', 0);
                } else {
                  handleInputChange('metric', undefined);
                  handleInputChange('activity_referal', 0);
                  handleInputChange('activity_following', 0);
                  handleInputChange('interaction_create_vid', 0);
                  handleInputChange('interaction_create_pic', 0);
                  handleInputChange('interaction_create_diary', 0);
                  handleInputChange('interaction_like_vid', 0);
                  handleInputChange('interaction_like_pic', 0);
                  handleInputChange('interaction_like_diary', 0);
                  handleInputChange('interaction_view_vid', 0);
                  handleInputChange('interaction_view_diary', 0);
                  handleInputChange('with_hashtag', false);
                  handleInputChange('hashtag', undefined);
                  handleInputChange('content_like_vid', 0);
                  handleInputChange('content_like_pic', 0);
                  handleInputChange('content_like_diary', 0);
                  handleInputChange('content_view_vid', 0);
                  handleInputChange('content_view_diary', 0);
                }
              }}
              SelectProps={{
                renderValue: (selected) => (
                  <Typography>
                    {selected === '' && 'Pilih Jenis Challenge'}
                    {selected === 'account' && 'Akun'}
                    {selected === 'content' && 'Konten'}
                  </Typography>
                ),
                displayEmpty: true,
              }}>
              <MenuItem value="account">
                <Stack direction="column">
                  <Typography>Akun</Typography>
                  <Typography style={{ fontSize: 12, color: '#9B9B9B' }}>
                    Metrik diukur berdasarkan interaksi akun Anda
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem value="content">
                <Stack direction="column">
                  <Typography>Konten</Typography>
                  <Typography style={{ fontSize: 12, color: '#9B9B9B' }}>
                    Metrik diukur berdasarkan interaksi konten Anda
                  </Typography>
                </Stack>
              </MenuItem>
            </TextField>
          </Stack>
        </Grid>

        {inputValue?.object === 'account' && (
          <Grid item xs={12}>
            <Stack direction="column" spacing={3}>
              <Typography>
                Pilih Metrik<span style={{ color: 'red' }}>*</span>
              </Typography>

              <RadioGroup
                value={inputValue?.metric}
                onChange={(e) => {
                  handleInputChange('metric', e.target.value);
                  if (e.target.value === 'activity') {
                    handleInputChange('activity_referal', 0);
                    handleInputChange('activity_following', 0);
                  } else {
                    handleInputChange('interaction_create_vid', 0);
                    handleInputChange('interaction_create_pic', 0);
                    handleInputChange('interaction_create_diary', 0);
                    handleInputChange('interaction_like_vid', 0);
                    handleInputChange('interaction_like_pic', 0);
                    handleInputChange('interaction_like_diary', 0);
                    handleInputChange('interaction_view_vid', 0);
                    handleInputChange('interaction_view_diary', 0);
                    handleInputChange('with_hashtag', false);
                    handleInputChange('hashtag', 0);
                  }
                }}>
                <FormControlLabel
                  value="activity"
                  control={<Radio color="secondary" />}
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography>Aktivitas Akun</Typography>
                      <Tooltip
                        title={
                          <Typography style={{ fontSize: 12, padding: 8 }}>
                            Metrik ini diukur berdasarkan aktivitas akun partisipasi, termasuk interaksi dan perkembangan
                            akun tersebut.
                          </Typography>
                        }
                        arrow>
                        <InfoOutlined style={{ fontSize: 14 }} />
                      </Tooltip>
                    </Stack>
                  }
                  style={{ width: 'fit-content' }}
                />
                {inputValue?.metric === 'activity' && (
                  <FormGroup>
                    <CheckboxCounter
                      label="Referal"
                      description="Poin"
                      value={inputValue?.activity_referal}
                      handleCheckbox={() => handleInputChange('activity_referal', inputValue?.activity_referal >= 1 ? 0 : 1)}
                      handleCounter={(val) => handleInputChange('activity_referal', val)}
                      min={1}
                      max={99}
                    />
                    <CheckboxCounter
                      label="Ikuti"
                      description="Poin"
                      value={inputValue?.activity_following}
                      handleCheckbox={() =>
                        handleInputChange('activity_following', inputValue?.activity_following >= 1 ? 0 : 1)
                      }
                      handleCounter={(val) => handleInputChange('activity_following', val)}
                      min={1}
                      max={99}
                    />
                  </FormGroup>
                )}

                <Divider style={{ margin: '16px 0' }} flexItem />

                <FormControlLabel
                  value="interaction"
                  control={<Radio color="secondary" />}
                  label={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography>Interaksi Konten</Typography>
                      <Tooltip
                        title={
                          <Typography style={{ fontSize: 12, padding: 8 }}>
                            Metrik ini diukur melalui aktivitas akun partisipasi terkait interaksi dengan konten yang
                            dimilikinya.
                          </Typography>
                        }
                        arrow>
                        <InfoOutlined style={{ fontSize: 14 }} />
                      </Tooltip>
                    </Stack>
                  }
                  style={{ width: 'fit-content' }}
                />
                {inputValue?.metric === 'interaction' && (
                  <Stack direction="column" spacing={1}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="secondary"
                          checked={inputValue?.with_hashtag || false}
                          onChange={() => {
                            handleInputChange('with_hashtag', !inputValue?.with_hashtag);
                            handleInputChange('hashtag', '');
                          }}
                        />
                      }
                      label={<Typography style={{ color: '#9B9B9B' }}>Tagar [Opsional]</Typography>}
                      style={{ width: 'fit-content' }}
                    />
                    {inputValue?.with_hashtag && (
                      <TextField
                        placeholder="Input tagar"
                        color="secondary"
                        value={inputValue?.hashtag || ''}
                        onChange={(e) => handleInputChange('hashtag', e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" style={{ paddingRight: 14, fontWeight: 'bold' }}>
                              #
                            </InputAdornment>
                          ),
                        }}
                        style={{ width: 200 }}
                      />
                    )}
                    <Typography style={{ fontWeight: 'bold' }}>Buat Konten</Typography>
                    <FormGroup>
                      <CheckboxCounter
                        label="HyppeVid"
                        description="Poin"
                        value={inputValue?.interaction_create_vid}
                        handleCheckbox={() =>
                          handleInputChange('interaction_create_vid', inputValue?.interaction_create_vid >= 1 ? 0 : 1)
                        }
                        handleCounter={(val) => handleInputChange('interaction_create_vid', val)}
                        min={1}
                        max={99}
                      />
                      <CheckboxCounter
                        label="HyppePic"
                        description="Poin"
                        value={inputValue?.interaction_create_pic}
                        handleCheckbox={() =>
                          handleInputChange('interaction_create_pic', inputValue?.interaction_create_pic >= 1 ? 0 : 1)
                        }
                        handleCounter={(val) => handleInputChange('interaction_create_pic', val)}
                        min={1}
                        max={99}
                      />
                      <CheckboxCounter
                        label="HyppeDiary"
                        description="Poin"
                        value={inputValue?.interaction_create_diary}
                        handleCheckbox={() =>
                          handleInputChange('interaction_create_diary', inputValue?.interaction_create_diary >= 1 ? 0 : 1)
                        }
                        handleCounter={(val) => handleInputChange('interaction_create_diary', val)}
                        min={1}
                        max={99}
                      />
                    </FormGroup>
                    <Typography style={{ fontWeight: 'bold' }}>Suka</Typography>
                    <FormGroup>
                      <CheckboxCounter
                        label="HyppeVid"
                        description="Poin"
                        value={inputValue?.interaction_like_vid}
                        handleCheckbox={() =>
                          handleInputChange('interaction_like_vid', inputValue?.interaction_like_vid >= 1 ? 0 : 1)
                        }
                        handleCounter={(val) => handleInputChange('interaction_like_vid', val)}
                        min={1}
                        max={99}
                      />
                      <CheckboxCounter
                        label="HyppePic"
                        description="Poin"
                        value={inputValue?.interaction_like_pic}
                        handleCheckbox={() =>
                          handleInputChange('interaction_like_pic', inputValue?.interaction_like_pic >= 1 ? 0 : 1)
                        }
                        handleCounter={(val) => handleInputChange('interaction_like_pic', val)}
                        min={1}
                        max={99}
                      />
                      <CheckboxCounter
                        label="HyppeDiary"
                        description="Poin"
                        value={inputValue?.interaction_like_diary}
                        handleCheckbox={() =>
                          handleInputChange('interaction_like_diary', inputValue?.interaction_like_diary >= 1 ? 0 : 1)
                        }
                        handleCounter={(val) => handleInputChange('interaction_like_diary', val)}
                        min={1}
                        max={99}
                      />
                    </FormGroup>
                    <Typography style={{ fontWeight: 'bold' }}>Tonton</Typography>
                    <FormGroup>
                      <CheckboxCounter
                        label="HyppeVid"
                        description="Poin"
                        value={inputValue?.interaction_view_vid}
                        handleCheckbox={() =>
                          handleInputChange('interaction_view_vid', inputValue?.interaction_view_vid >= 1 ? 0 : 1)
                        }
                        handleCounter={(val) => handleInputChange('interaction_view_vid', val)}
                        min={1}
                        max={99}
                      />
                      <CheckboxCounter
                        label="HyppeDiary"
                        description="Poin"
                        value={inputValue?.interaction_view_diary}
                        handleCheckbox={() =>
                          handleInputChange('interaction_view_diary', inputValue?.interaction_view_diary >= 1 ? 0 : 1)
                        }
                        handleCounter={(val) => handleInputChange('interaction_view_diary', val)}
                        min={1}
                        max={99}
                      />
                    </FormGroup>
                  </Stack>
                )}
              </RadioGroup>
            </Stack>
          </Grid>
        )}

        {inputValue?.object === 'content' && (
          <Grid item xs={12}>
            <Stack direction="column" spacing={1}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography>
                  Pilih Metrik<span style={{ color: 'red' }}>*</span>
                </Typography>
                <Tooltip
                  title={
                    <Typography style={{ fontSize: 12, padding: 8 }}>
                      ketika semua metriks dipilih, hanya satu konten dengan poin tertinggi yang akan masuk ke dalam.
                    </Typography>
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
                      checked={inputValue?.with_hashtag || false}
                      onChange={() => {
                        handleInputChange('with_hashtag', !inputValue?.with_hashtag);
                        handleInputChange('hashtag', '');
                      }}
                    />
                  }
                  label={<Typography style={{ color: '#9B9B9B' }}>Tagar [Opsional]</Typography>}
                  style={{ width: 'fit-content' }}
                />
                {inputValue?.with_hashtag && (
                  <TextField
                    placeholder="Input tagar"
                    color="secondary"
                    value={inputValue?.hashtag || ''}
                    onChange={(e) => handleInputChange('hashtag', e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" style={{ paddingRight: 14, fontWeight: 'bold' }}>
                          #
                        </InputAdornment>
                      ),
                    }}
                    style={{ width: 200 }}
                  />
                )}
              </FormGroup>
              <Typography style={{ fontWeight: 'bold' }}>Suka</Typography>
              <FormGroup>
                <CheckboxCounter
                  label="HyppeVid"
                  description="Poin"
                  value={inputValue?.content_like_vid}
                  handleCheckbox={() => handleInputChange('content_like_vid', inputValue?.content_like_vid >= 1 ? 0 : 1)}
                  handleCounter={(val) => handleInputChange('content_like_vid', val)}
                  min={1}
                  max={99}
                />
                <CheckboxCounter
                  label="HyppePic"
                  description="Poin"
                  value={inputValue?.content_like_pic}
                  handleCheckbox={() => handleInputChange('content_like_pic', inputValue?.content_like_pic >= 1 ? 0 : 1)}
                  handleCounter={(val) => handleInputChange('content_like_pic', val)}
                  min={1}
                  max={99}
                />
                <CheckboxCounter
                  label="HyppeDiary"
                  description="Poin"
                  value={inputValue?.content_like_diary}
                  handleCheckbox={() => handleInputChange('content_like_diary', inputValue?.content_like_diary >= 1 ? 0 : 1)}
                  handleCounter={(val) => handleInputChange('content_like_diary', val)}
                  min={1}
                  max={99}
                />
              </FormGroup>
              <Typography style={{ fontWeight: 'bold' }}>Tonton</Typography>
              <FormGroup>
                <CheckboxCounter
                  label="HyppeVid"
                  description="Poin"
                  value={inputValue?.content_view_vid}
                  handleCheckbox={() => handleInputChange('content_view_vid', inputValue?.content_view_vid >= 1 ? 0 : 1)}
                  handleCounter={(val) => handleInputChange('content_view_vid', val)}
                  min={1}
                  max={99}
                />
                <CheckboxCounter
                  label="HyppeDiary"
                  description="Poin"
                  value={inputValue?.content_view_diary}
                  handleCheckbox={() => handleInputChange('content_view_diary', inputValue?.content_view_diary >= 1 ? 0 : 1)}
                  handleCounter={(val) => handleInputChange('content_view_diary', val)}
                  min={1}
                  max={99}
                />
              </FormGroup>
            </Stack>
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default ComponentStepType;
