import { Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import { LoadingButton } from '@mui/lab';
import { Autocomplete, Box, Button, Chip, IconButton, MenuItem, Modal, Stack, TextField } from '@mui/material';
import {
  useCreateCategoryMutation,
  useGetDetailCategoryQuery,
  useUpdateCategoryMutation,
} from 'api/console/utilitas/transaction';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

const categories = [
  {
    code: 'PBC',
    coa: 'Pembelian Coin',
    type: 'USER',
  },
  {
    code: 'PNC',
    coa: 'Penerimaan Coin',
    type: 'USER',
  },
  {
    code: 'PTC',
    coa: 'Penukaran Coin',
    type: 'USER',
  },
  {
    code: 'RFN',
    coa: 'Refund IDR',
    type: 'USER',
  },
  {
    code: 'PGC',
    coa: 'Penggunaan Coin',
    type: 'USER',
  },
  {
    code: 'PGH',
    coa: 'Penggunaan Coin untuk Bagi Hasil',
    type: 'USER',
  },
  {
    code: 'PMC',
    coa: 'Pengembalian Coin',
    type: 'USER',
  },
  {
    code: 'PCM',
    coa: 'Pembelian Credit',
    type: 'USER',
  },
  {
    code: 'PCR',
    coa: 'Penggunaan Credit',
    type: 'USER',
  },
  {
    code: 'PCH',
    coa: 'Penggunaan Credit untuk Bagi Hasil',
    type: 'USER',
  },
  {
    code: 'PCB',
    coa: 'Pembekuan Credit',
    type: 'USER',
  },
  {
    code: 'PCN',
    coa: 'Pengembalian Credit',
    type: 'USER',
  },
  {
    code: 'UPH',
    coa: 'Upah',
    type: 'USER',
  },
  {
    code: 'PJC',
    coa: 'Penjualan Coin',
    type: 'HYPPE',
  },
  {
    code: 'BHS',
    coa: 'Bagi Hasil',
    type: 'HYPPE',
  },
  {
    code: 'PTC',
    coa: 'Pertukaran Coin',
    type: 'HYPPE',
  },
  {
    code: 'RFN',
    coa: 'Refund IDR',
    type: 'HYPPE',
  },
  {
    code: 'PJL',
    coa: 'Penjualan Layanan',
    type: 'HYPPE',
  },
  {
    code: 'PJH',
    coa: 'Penjualan Layanan Bagi Hasil',
    type: 'HYPPE',
  },
  {
    code: 'PMC',
    coa: 'Pengembalian Coin',
    type: 'HYPPE',
  },
  {
    code: 'PJR',
    coa: 'Penjualan Credit',
    type: 'HYPPE',
  },
  {
    code: 'PTI',
    coa: 'Penjualan Tayangan Iklan',
    type: 'HYPPE',
  },
  {
    code: 'PKI',
    coa: 'Penjualan Klik Iklan',
    type: 'HYPPE',
  },
  {
    code: 'PCB',
    coa: 'Pembekuan Credit',
    type: 'HYPPE',
  },
  {
    code: 'PCN',
    coa: 'Pengembalian Credit',
    type: 'HYPPE',
  },
  {
    code: 'PBC',
    coa: 'Pembayaran Creator',
    type: 'HYPPE',
  },
  {
    code: 'PSC',
    coa: 'Pengisian Saldo Coin',
    type: 'HYPPE',
  },
  {
    code: 'PSP',
    coa: 'Pengisian Saldo PG',
    type: 'HYPPE',
  },
  {
    code: 'PNP',
    coa: 'Penarikan Saldo PG',
    type: 'HYPPE',
  },
];

const ModalCreateCategory = ({ open, handleClose, type, idSelected }) => {
  const [inputValue, setInputValue] = useState({
    code: '',
    coa: '',
    type: [],
    user: '',
    transaction: [],
  });
  const [tempKey, setTempKey] = useState(1);
  const [createCategory, { isLoading: loadingCreate }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: loadingUpdate }] = useUpdateCategoryMutation();
  const { data: details, isLoading: loadingDetail } =
    type === 'update' ? useGetDetailCategoryQuery(idSelected) : { data: {}, isLoading: false };

  useEffect(() => {
    if (type === 'update') {
      setInputValue({
        code: details?.data?.code || '',
        coa: details?.data?.coa || '',
        type: details?.data?.type || [],
        user: details?.data?.user || '',
        transaction:
          details?.data?.transaction?.map((item, key) => {
            return {
              ...item,
              id: `saved-${key + 1}`,
            };
          }) || [],
      });
    }
  }, [loadingDetail]);

  const checkDisabled = () => {
    let disabled = false;

    if (
      !inputValue?.code ||
      !inputValue?.coa ||
      !inputValue?.user ||
      inputValue?.type?.length < 1 ||
      inputValue?.transaction?.length < 1 ||
      inputValue?.transaction?.map((item) => item?.name).includes('') ||
      inputValue?.transaction?.map((item) => item?.Status).includes('')
    ) {
      disabled = true;
    }

    return disabled;
  };

  const handleCreate = () => {
    let formData = {
      ...inputValue,
      transaction: inputValue?.transaction?.map((item) => {
        return {
          name: item?.name,
          Status: item?.Status,
        };
      }),
    };

    createCategory(formData).then((res) => {
      if (res?.data) {
        toast.success('Berhasil menambahkan data kategori');
        handleClose();
      } else {
        toast.error(res?.error?.data?.message || res?.error?.data?.messages?.info?.[0]);
      }
    });
  };

  const handleUpdate = () => {
    let formData = {
      ...inputValue,
      _id: idSelected,
      transaction: inputValue?.transaction?.map((item) => {
        return {
          name: item?.name,
          Status: item?.Status,
        };
      }),
    };

    updateCategory(formData).then((res) => {
      if (res?.data) {
        toast.success('Berhasil menyimpan perubahan data kategori');
        handleClose();
      } else {
        toast.error(res?.error?.data?.message || res?.error?.data?.messages?.info?.[0]);
      }
    });
  };

  return (
    <Modal open={open} disableEscapeKeyDown>
      <Box sx={style}>
        <Stack
          direction="column"
          style={{
            margin: '32px',
            width: '100%',
            maxWidth: 660,
            backgroundColor: 'white',
            borderRadius: 8,
            maxHeight: 'calc(100% - 64px)',
          }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ flex: '0 0 auto', padding: '16px 24px' }}>
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Form pembuatan kategori</Typography>

            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Stack>

          <Stack
            direction="column"
            style={{
              flex: '1 1 auto',
              overflow: 'auto',
              padding: '24px',
              borderTop: '1px solid #CCCCCC',
              borderBottom: '1px solid #CCCCCC',
            }}
            gap={3}>
            <TextField
              select
              label="Tipe user"
              value={inputValue?.user}
              onChange={(e) => setInputValue((prevVal) => ({ ...prevVal, user: e.target.value, code: '', coa: '' }))}
              color="secondary">
              <MenuItem value="USER">User</MenuItem>
              <MenuItem value="HYPPE">Hyppe</MenuItem>
            </TextField>

            <Stack direction="row" gap={2}>
              <TextField
                select
                fullWidth
                label="Code"
                placeholder="Masukan code"
                value={inputValue?.code}
                onChange={(e) =>
                  setInputValue((prevVal) => ({
                    ...prevVal,
                    code: e.target.value,
                    coa: categories?.find((item) => item?.code === e.target.value)?.coa,
                  }))
                }
                SelectProps={{ MenuProps: { style: { height: 300 } } }}
                color="secondary">
                {inputValue?.user !== '' ? (
                  categories
                    ?.filter((item) => item?.type === inputValue?.user)
                    ?.map((item, key) => (
                      <MenuItem key={key} value={item?.code}>
                        {item?.code} ({item?.coa})
                      </MenuItem>
                    ))
                ) : (
                  <MenuItem value="" disabled>
                    Pilih tipe user terlebih dahulu
                  </MenuItem>
                )}
              </TextField>
              <TextField
                fullWidth
                label="Coa"
                placeholder="Masukan coa"
                value={inputValue?.coa}
                onChange={(e) => setInputValue((prevVal) => ({ ...prevVal, coa: e.target.value }))}
                color="secondary"
                disabled
              />
            </Stack>

            <Autocomplete
              multiple
              id="tags-filled"
              options={[]}
              value={inputValue?.type}
              freeSolo
              onChange={(e, val) => setInputValue((prevVal) => ({ ...prevVal, type: val }))}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => <Chip variant="outlined" label={option} {...getTagProps({ index })} />)
              }
              renderInput={(params) => <TextField {...params} label="Tipe" placeholder="Masukan Tipe" color="secondary" />}
            />

            <Stack direction="column" gap={1} mt={-2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography style={{ fontWeight: 'bold' }}>Transaksi</Typography>
                <Button
                  color="secondary"
                  onClick={() => {
                    setInputValue((prevVal) => ({
                      ...prevVal,
                      transaction: [...inputValue?.transaction, { id: tempKey, name: '', Status: '' }],
                    }));
                    setTempKey(tempKey + 1);
                  }}>
                  Tambah
                </Button>
              </Stack>

              {inputValue?.transaction?.length >= 1 ? (
                inputValue?.transaction?.map((item, key) => (
                  <Stack key={key} direction="row" alignItems="center" gap={1}>
                    <TextField
                      fullWidth
                      label="Nama"
                      placeholder="Masukan nama transaksi"
                      color="secondary"
                      value={item?.name}
                      onChange={(e) => {
                        const newArray = inputValue?.transaction?.map((da) => {
                          if (da?.id === item?.id) {
                            return {
                              ...da,
                              name: e.target.value,
                            };
                          } else {
                            return da;
                          }
                        });

                        setInputValue((prevVal) => ({ ...prevVal, transaction: [...newArray] }));
                      }}
                    />
                    <TextField
                      select
                      fullWidth
                      label="Status"
                      placeholder="Masukan status transaksi"
                      color="secondary"
                      value={item?.Status}
                      onChange={(e) => {
                        const newArray = inputValue?.transaction?.map((da) => {
                          if (da?.id === item?.id) {
                            return {
                              ...da,
                              Status: e.target.value,
                            };
                          } else {
                            return da;
                          }
                        });

                        setInputValue((prevVal) => ({ ...prevVal, transaction: [...newArray] }));
                      }}>
                      <MenuItem value="Kredit">Credit</MenuItem>
                      <MenuItem value="Debet">Debet</MenuItem>
                    </TextField>
                    <IconButton
                      style={{ width: 40, height: 40 }}
                      onClick={() => {
                        setInputValue((prevVal) => ({
                          ...prevVal,
                          transaction: inputValue?.transaction?.filter((nd) => nd?.id !== item?.id),
                        }));
                      }}>
                      <Delete style={{ fontSize: 20 }} />
                    </IconButton>
                  </Stack>
                ))
              ) : (
                <Typography style={{ fontSize: 14 }}>Tidak ada data</Typography>
              )}
            </Stack>
          </Stack>

          <Stack direction="column" style={{ flex: '0 0 auto', padding: '15px 24px' }}>
            <LoadingButton
              loading={loadingCreate || loadingUpdate}
              variant="contained"
              color="secondary"
              onClick={() => (type === 'update' ? handleUpdate() : handleCreate())}
              disabled={checkDisabled()}>
              {type === 'update' && 'Simpan'}
              {type !== 'update' && 'Tambah'}
            </LoadingButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalCreateCategory;
