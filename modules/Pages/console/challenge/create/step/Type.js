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
                <strong>Akun</strong>: Merupakan metrics yang mengukur aktivitas akun pengguna
              </Typography>
              <Typography style={{ fontSize: 12 }}>
                <strong>Konten</strong>: Merupakan metrics yang mengukur aktivitas dari konten pengguna
              </Typography>
            </Stack>
          }
          arrow>
          <InfoOutlined style={{ fontSize: 14 }} />
        </Tooltip>
      </Stack>
      <Grid container spacing={3} mt={3}>
        <Grid item xs={12} md={3}>
          <Stack direction="column" spacing={1}>
            <Typography>Object Challenge</Typography>
            <TextField
              select
              color="secondary"
              value={inputValue?.object || ''}
              onChange={(e) => {
                handleInputChange('object', e.target.value);
                if (e.target.value === 'account') {
                  handleInputChange('metric', 'activity');
                  handleInputChange('with_hashtag', false);
                  handleInputChange('hashtag', '');
                  handleInputChange('content_count_like_vid', undefined);
                  handleInputChange('content_count_like_pic', undefined);
                  handleInputChange('content_count_like_diary', undefined);
                  handleInputChange('content_count_view_vid', undefined);
                  handleInputChange('content_count_view_diary', undefined);
                } else {
                  handleInputChange('metric', 'activity');
                  handleInputChange('with_hashtag', false);
                  handleInputChange('hashtag', '');
                  handleInputChange('count_referal', undefined);
                  handleInputChange('count_following', undefined);
                  handleInputChange('count_create_vid', undefined);
                  handleInputChange('count_create_pic', undefined);
                  handleInputChange('count_create_diary', undefined);
                  handleInputChange('count_like_vid', undefined);
                  handleInputChange('count_like_pic', undefined);
                  handleInputChange('count_like_diary', undefined);
                  handleInputChange('count_view_vid', undefined);
                  handleInputChange('count_view_diary', undefined);
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
              <Typography>Pilih Metrik</Typography>

              <RadioGroup
                value={inputValue?.metric}
                onChange={(e) => {
                  handleInputChange('metric', e.target.value);
                  if (e.target.value === 'activity') {
                    handleInputChange('count_referal', undefined);
                    handleInputChange('count_following', undefined);
                  } else {
                    handleInputChange('count_create_vid', undefined);
                    handleInputChange('count_create_pic', undefined);
                    handleInputChange('count_create_diary', undefined);
                    handleInputChange('count_like_vid', undefined);
                    handleInputChange('count_like_pic', undefined);
                    handleInputChange('count_like_diary', undefined);
                    handleInputChange('count_view_vid', undefined);
                    handleInputChange('count_view_diary', undefined);
                    handleInputChange('with_hashtag', false);
                    handleInputChange('hashtag', undefined);
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
                            Metrik ini diukur berdasarkan aktivitas dari sebuah akun partisipasi, terhadap interaksi atau
                            pengembangan akun tersebut
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
                      handleCheckbox={() => handleInputChange('activity_referal', 1)}
                      handleCounter={(val) => handleInputChange('count_referal', val)}
                      min={1}
                      max={100}
                    />
                    <CheckboxCounter
                      label="Ikuti"
                      description="Poin"
                      value={inputValue?.activity_following}
                      handleCheckbox={() => handleInputChange('activity_following', 1)}
                      handleCounter={(val) => handleInputChange('count_following', val)}
                      min={1}
                      max={100}
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
                            Metrik ini diukur melalui aktivitas dari sebuah akun partisipasi, terhadap interaksi konten yang
                            dia miliki
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
                      label="Tagar [Opsional]"
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
                            <InputAdornment style={{ paddingRight: 14, fontWeight: 'bold' }}>#</InputAdornment>
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
                        handleCheckbox={() => handleInputChange('interaction_create_vid', 1)}
                        handleCounter={(val) => handleInputChange('count_create_vid', val)}
                        min={1}
                        max={100}
                      />
                      <CheckboxCounter
                        label="HyppePic"
                        description="Poin"
                        value={inputValue?.interaction_create_pic}
                        handleCheckbox={() => handleInputChange('interaction_create_pic', 1)}
                        handleCounter={(val) => handleInputChange('count_create_pic', val)}
                        min={1}
                        max={100}
                      />
                      <CheckboxCounter
                        label="HyppeDiary"
                        description="Poin"
                        value={inputValue?.interaction_create_diary}
                        handleCheckbox={() => handleInputChange('interaction_create_diary', 1)}
                        handleCounter={(val) => handleInputChange('count_create_diary', val)}
                        min={1}
                        max={100}
                      />
                    </FormGroup>
                    <Typography style={{ fontWeight: 'bold' }}>Suka</Typography>
                    <FormGroup>
                      <CheckboxCounter
                        label="HyppeVid"
                        description="Poin"
                        value={inputValue?.interaction_like_vid}
                        handleCheckbox={() => handleInputChange('interaction_like_vid', 1)}
                        handleCounter={(val) => handleInputChange('count_like_vid', val)}
                        min={1}
                        max={100}
                      />
                      <CheckboxCounter
                        label="HyppePic"
                        description="Poin"
                        value={inputValue?.interaction_like_pic}
                        handleCheckbox={() => handleInputChange('interaction_like_pic', 1)}
                        handleCounter={(val) => handleInputChange('count_like_pic', val)}
                        min={1}
                        max={100}
                      />
                      <CheckboxCounter
                        label="HyppeDiary"
                        description="Poin"
                        value={inputValue?.interaction_like_diary}
                        handleCheckbox={() => handleInputChange('interaction_like_diary', 1)}
                        handleCounter={(val) => handleInputChange('count_like_diary', val)}
                        min={1}
                        max={100}
                      />
                    </FormGroup>
                    <Typography style={{ fontWeight: 'bold' }}>Tonton</Typography>
                    <FormGroup>
                      <CheckboxCounter
                        label="HyppeVid"
                        description="Poin"
                        value={inputValue?.interaction_view_vid}
                        handleCheckbox={() => handleInputChange('interaction_view_vid', 1)}
                        handleCounter={(val) => handleInputChange('count_view_vid', val)}
                        min={1}
                        max={100}
                      />
                      <CheckboxCounter
                        label="HyppeDiary"
                        description="Poin"
                        value={inputValue?.interaction_view_diary}
                        handleCheckbox={() => handleInputChange('interaction_view_diary', 1)}
                        handleCounter={(val) => handleInputChange('count_view_diary', val)}
                        min={1}
                        max={100}
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
              <Typography>Pilih Metrik</Typography>

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
                  label="Tagar [Opsional]"
                  style={{ width: 'fit-content' }}
                />
                {inputValue?.with_hashtag && (
                  <TextField
                    placeholder="Input tagar"
                    color="secondary"
                    onChange={(e) => handleInputChange('hashtag', e.target.value)}
                    InputProps={{
                      startAdornment: <InputAdornment style={{ paddingRight: 14, fontWeight: 'bold' }}>#</InputAdornment>,
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
                  handleCheckbox={() => handleInputChange('content_like_vid', 1)}
                  handleCounter={(val) => handleInputChange('content_count_like_vid', val)}
                  min={1}
                  max={100}
                />
                <CheckboxCounter
                  label="HyppePic"
                  description="Poin"
                  value={inputValue?.content_like_pic}
                  handleCheckbox={() => handleInputChange('content_like_pic', 1)}
                  handleCounter={(val) => handleInputChange('content_count_like_pic', val)}
                  min={1}
                  max={100}
                />
                <CheckboxCounter
                  label="HyppeDiary"
                  description="Poin"
                  value={inputValue?.content_like_diary}
                  handleCheckbox={() => handleInputChange('content_like_diary', 1)}
                  handleCounter={(val) => handleInputChange('content_count_like_diary', val)}
                  min={1}
                  max={100}
                />
              </FormGroup>
              <Typography style={{ fontWeight: 'bold' }}>Tonton</Typography>
              <FormGroup>
                <CheckboxCounter
                  label="HyppeVid"
                  description="Poin"
                  value={inputValue?.content_view_vid}
                  handleCheckbox={() => handleInputChange('content_view_vid', 1)}
                  handleCounter={(val) => handleInputChange('content_count_view_vid', val)}
                  min={1}
                  max={100}
                />
                <CheckboxCounter
                  label="HyppeDiary"
                  description="Poin"
                  value={inputValue?.content_view_diary}
                  handleCheckbox={() => handleInputChange('content_view_diary', 1)}
                  handleCounter={(val) => handleInputChange('content_count_view_diary', val)}
                  min={1}
                  max={100}
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
