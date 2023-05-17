import { Add, Delete } from '@material-ui/icons';
import { Box, Button, IconButton, InputAdornment, MenuItem, Modal, Stack, TextField, Typography } from '@mui/material';
import { useCreateSettingMutation, useUpdateSettingMutation } from 'api/console/utilitas/setting';
import { isBoolean, isEmpty } from 'lodash';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 3,
};

const ModalSetting = ({ open, handleClose, selected }) => {
  const [inputValue, setInputValue] = useState({
    jenis: selected?.jenis || '',
    typedata: selected?.typedata || '',
    value: selected?.value || '',
    jenisdata: selected?.jenisdata || '',
    remark: selected?.remark || '',
  });
  const [createSetting, { isLoading: loadingCreate }] = useCreateSettingMutation();
  const [updateSetting, { isLoading: loadingUpdate }] = useUpdateSettingMutation();

  const handleSubmit = () => {
    handleClose();

    if (isEmpty(selected)) {
      createSetting(inputValue).then((res) => {
        if (res.data) {
          toast.success('Berhasil menambahkan setting');
        } else {
          toast.error(res?.error?.data?.message);
        }
      });
    } else {
      updateSetting({ id: selected?._id, formData: inputValue }).then((res) => {
        if (res.data) {
          toast.success('Berhasil menyimpan pembaruan setting');
        } else {
          toast.error(res?.error?.data?.message);
        }
      });
    }

    setInputValue({
      jenis: '',
      typedata: '',
      value: '',
      jenisdata: '',
      remark: '',
    });
  };

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack direction="column" gap={3}>
          <Typography style={{ fontWeight: 'bold', fontSize: 24 }}>Penambahan Setting Baru</Typography>
          <Stack direction="column" gap={2}>
            <TextField
              placeholder="Input Nama Setting"
              label="Nama Setting"
              color="secondary"
              value={inputValue.jenis}
              onChange={(e) => setInputValue({ ...inputValue, jenis: e.target.value })}
              inputProps={{
                maxLength: 30,
              }}
            />
            <TextField
              select
              label="Jenis Data"
              placeholder="Pilih Jenis Data"
              color="secondary"
              value={inputValue.jenisdata}
              onChange={(e) => setInputValue({ ...inputValue, jenisdata: e.target.value })}>
              <MenuItem value="PPN" color="secondary">
                PPN
              </MenuItem>
              <MenuItem value="UMUM" color="secondary">
                UMUM
              </MenuItem>
              <MenuItem value="PPH" color="secondary">
                PPH
              </MenuItem>
              <MenuItem value="ADS" color="secondary">
                ADS
              </MenuItem>
              <MenuItem value="SCORING" color="secondary">
                SCORING
              </MenuItem>
              <MenuItem value="LANDING PAGE" color="secondary">
                LANDING PAGE
              </MenuItem>
            </TextField>
            <TextField
              select
              label="Tipe Data Setting"
              placeholder="Pilih Tipe Data Setting"
              color="secondary"
              value={inputValue.typedata}
              onChange={(e) =>
                setInputValue({ ...inputValue, typedata: e.target.value, value: e.target.value === 'array' ? [''] : '' })
              }>
              <MenuItem value="array" color="secondary">
                Array
              </MenuItem>
              <MenuItem value="boolean" color="secondary">
                Boolean
              </MenuItem>
              <MenuItem value="number" color="secondary">
                Number / Integer
              </MenuItem>
              <MenuItem value="string" color="secondary">
                String
              </MenuItem>
            </TextField>
            {inputValue.typedata !== 'array' && inputValue.typedata !== 'boolean' && inputValue.typedata && (
              <TextField
                placeholder="Input Value Setting"
                label="Value Setting"
                color="secondary"
                value={inputValue.value}
                onChange={(e) => setInputValue({ ...inputValue, value: e.target.value })}
                inputProps={{
                  min: 0,
                  onKeyPress: (event) => {
                    if (inputValue.typedata === 'number') {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }
                  },
                }}
              />
            )}
            {inputValue.typedata === 'boolean' && inputValue.typedata && (
              <TextField
                select
                label="Pilihan"
                placeholder="Pilih Status"
                color="secondary"
                value={inputValue.value ? inputValue.value.toString() : ''}
                onChange={(e) => setInputValue({ ...inputValue, value: e.target.value.toString() })}>
                <MenuItem value="true" color="secondary">
                  True
                </MenuItem>
                <MenuItem value="false" color="secondary">
                  False
                </MenuItem>
              </TextField>
            )}
            {inputValue.typedata === 'array' && inputValue.typedata && (
              <Stack direction="column" spacing={2}>
                {inputValue.value?.map((item, key) => (
                  <TextField
                    key={key}
                    fullWidth
                    placeholder="Input Value Setting"
                    label="Value Setting"
                    color="secondary"
                    value={inputValue.value[key]}
                    onChange={(e) => {
                      let prevVal = inputValue.value;

                      prevVal[key] = e.target.value;

                      setInputValue({ ...inputValue, value: prevVal });
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() =>
                              setInputValue((prevVal) => {
                                return {
                                  ...prevVal,
                                  value:
                                    inputValue?.value?.length > 1 ? prevVal.value?.filter((val, vk) => vk !== key) : [''],
                                };
                              })
                            }>
                            <Delete style={{ fontSize: 20 }} />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                ))}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() =>
                    setInputValue((prevVal) => {
                      return { ...prevVal, value: [...prevVal.value, ''] };
                    })
                  }>
                  <Add />
                </Button>
              </Stack>
            )}
            <TextField
              placeholder="Input Remark Setting"
              label="Remark Setting"
              color="secondary"
              value={inputValue.remark}
              onChange={(e) => setInputValue({ ...inputValue, remark: e.target.value })}
              inputProps={{
                maxLength: 30,
              }}
            />
          </Stack>
          <Stack direction="row" gap={2}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              sx={{ height: 40 }}
              onClick={handleSubmit}
              disabled={
                loadingCreate ||
                loadingUpdate ||
                !inputValue.jenis ||
                !inputValue.remark ||
                !inputValue.jenisdata ||
                !inputValue.typedata ||
                !inputValue.value
              }>
              <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
                {isEmpty(selected) ? 'Tambah' : 'Simpan'}
              </Typography>
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              sx={{ height: 40 }}
              onClick={() => {
                handleClose();
                setInputValue({
                  jenis: '',
                  type: '',
                  value: '',
                  remark: '',
                });
              }}>
              <Typography style={{ fontFamily: 'Lato', fontSize: 14, fontWeight: 'bold', textTransform: 'capitalize' }}>
                Batal
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalSetting;
