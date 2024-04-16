import { Typography } from '@material-ui/core';
import { Close, Delete } from '@material-ui/icons';
import { LoadingButton } from '@mui/lab';
import { Box, Button, IconButton, Modal, Stack, TextField } from '@mui/material';
import { useCreateCOAMutation, useGetDetailCOAQuery, useUpdateCOAMutation } from 'api/console/utilitas/transaction';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
};

const ModalCreateCOA = ({ open, handleClose, idSelected, type }) => {
  const [inputValue, setInputValue] = useState({
    coa: '',
    subCoa: [],
  });
  const [tempKey, setTempKey] = useState(1);
  const [subTempKey, setSubTempKey] = useState(1);
  const [createCOA, { isLoading: loadingCreate }] = useCreateCOAMutation();
  const [updateCOA, { isLoading: loadingUpdate }] = useUpdateCOAMutation();
  const { data: details, isLoading: loadingDetail } =
    type === 'update' ? useGetDetailCOAQuery(idSelected) : { data: {}, isLoading: false };

  useEffect(() => {
    if (type === 'update') {
      setInputValue({
        coa: details?.data?.coa,
        subCoa: details?.data?.subCoa?.map((item, key) => {
          return {
            id: `saved-${key + 1}`,
            name: item?.name,
            Detail: item?.Detail?.map((child, cKey) => {
              return {
                ...child,
                id: `saved-child-${cKey + 1}`,
              };
            }),
          };
        }),
      });
    }
  }, [loadingDetail]);

  const checkDisabled = () => {
    let disabled = false;

    if (
      !inputValue?.coa ||
      inputValue?.subCoa < 1 ||
      inputValue?.subCoa?.map((item) => item?.name).includes('') ||
      inputValue?.subCoa
        ?.map((item) => item?.Detail?.map((child) => child?.name).flat(1))
        .flat(1)
        .includes('') ||
      inputValue?.subCoa
        ?.map((item) => item?.Detail?.map((child) => child?.value).flat(1))
        .flat(1)
        .includes('')
    ) {
      disabled = true;
    }

    return disabled;
  };

  const handleCreate = () => {
    let formData = {
      ...inputValue,
      subCoa: inputValue?.subCoa?.map((item) => {
        return {
          name: item?.name,
          Detail: item?.Detail?.map((child) => {
            return {
              name: child?.name,
              value: Number(child?.value || 0),
              Desc: child?.Desc || '',
            };
          }),
        };
      }),
    };

    createCOA(formData).then((res) => {
      if (res?.data) {
        toast.success('Berhasil menambahkan data COA');
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
      subCoa: inputValue?.subCoa?.map((item) => {
        return {
          name: item?.name,
          Detail: item?.Detail?.map((child) => {
            return {
              name: child?.name,
              value: Number(child?.value || 0),
              Desc: child?.Desc || '',
            };
          }),
        };
      }),
    };

    updateCOA(formData).then((res) => {
      if (res?.data) {
        toast.success('Berhasil menyimpan perubahan COA');
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
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>Form pembuatan COA</Typography>

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
              label="Nama COA"
              value={inputValue?.coa}
              placeholder="Masukkan nama COA"
              onChange={(e) => setInputValue((prevVal) => ({ ...prevVal, coa: e.target.value }))}
              color="secondary"
            />

            <Stack direction="column" gap={1} mt={-2}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography style={{ fontWeight: 'bold' }}>Sub data</Typography>
                <Button
                  color="secondary"
                  onClick={() => {
                    setInputValue((prevVal) => ({
                      ...prevVal,
                      subCoa: [...inputValue?.subCoa, { id: tempKey, name: '', Detail: [] }],
                    }));
                    setTempKey(tempKey + 1);
                  }}>
                  Tambah
                </Button>
              </Stack>

              <Stack direction="column" gap={4}>
                {inputValue?.subCoa?.length >= 1 ? (
                  inputValue?.subCoa?.map((item, key) => (
                    <Stack key={key} direction="column" gap={1}>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <TextField
                          fullWidth
                          label="Nama Sub COA"
                          placeholder="Masukan nama sub COA"
                          color="secondary"
                          value={item?.name}
                          onChange={(e) => {
                            const newArray = inputValue?.subCoa?.map((da) => {
                              if (da?.id === item?.id) {
                                return {
                                  ...da,
                                  name: e.target.value,
                                };
                              } else {
                                return da;
                              }
                            });

                            setInputValue((prevVal) => ({ ...prevVal, subCoa: [...newArray] }));
                          }}
                        />
                        <IconButton
                          style={{ width: 40, height: 40 }}
                          onClick={() => {
                            setInputValue((prevVal) => ({
                              ...prevVal,
                              subCoa: inputValue?.subCoa?.filter((nd) => nd?.id !== item?.id),
                            }));
                          }}>
                          <Delete style={{ fontSize: 20 }} />
                        </IconButton>
                      </Stack>

                      <Stack direction="column" gap={1} ml={3}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                          <Typography style={{ fontWeight: 'bold' }}>Detail</Typography>
                          <Button
                            color="secondary"
                            onClick={() => {
                              let newSub = inputValue?.subCoa;
                              const indexSub = inputValue?.subCoa?.findIndex((sub) => sub?.id === item?.id);

                              newSub[indexSub].Detail = [
                                ...newSub[indexSub].Detail,
                                { id: `sub-${item?.id}-${subTempKey}`, name: '', value: '', Desc: '' },
                              ];

                              setSubTempKey(subTempKey + 1);
                              setInputValue((prevVal) => ({
                                ...prevVal,
                                subCoa: [...newSub],
                              }));
                            }}>
                            Tambah Detail
                          </Button>
                        </Stack>

                        <Stack direction="column" gap={2}>
                          {item?.Detail?.length >= 1 ? (
                            item?.Detail?.map((child, key) => (
                              <Stack key={key} direction="row" alignItems="center" gap={1}>
                                <TextField
                                  fullWidth
                                  label="Nama"
                                  placeholder="Masukan nama transaksi"
                                  color="secondary"
                                  value={child?.name}
                                  onChange={(e) => {
                                    let newSub = inputValue?.subCoa;
                                    const indexSub = inputValue?.subCoa?.findIndex((sub) => sub?.id === item?.id);

                                    newSub[indexSub].Detail = newSub[indexSub].Detail?.map((detail) => {
                                      if (detail?.id === child?.id) {
                                        return { ...detail, name: e.target.value };
                                      } else {
                                        return { ...detail };
                                      }
                                    });

                                    setInputValue((prevVal) => ({
                                      ...prevVal,
                                      subCoa: [...newSub],
                                    }));
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="Nilai"
                                  placeholder="Masukan nilai detail"
                                  color="secondary"
                                  value={child?.value}
                                  onChange={(e) => {
                                    let newSub = inputValue?.subCoa;
                                    const indexSub = inputValue?.subCoa?.findIndex((sub) => sub?.id === item?.id);

                                    newSub[indexSub].Detail = newSub[indexSub].Detail?.map((detail) => {
                                      if (detail?.id === child?.id) {
                                        return { ...detail, value: e.target.value };
                                      } else {
                                        return { ...detail };
                                      }
                                    });

                                    setInputValue((prevVal) => ({
                                      ...prevVal,
                                      subCoa: [...newSub],
                                    }));
                                  }}
                                  inputProps={{
                                    onKeyPress: (event) => {
                                      if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                      }
                                    },
                                    maxLength: 8,
                                  }}
                                />
                                <TextField
                                  fullWidth
                                  label="Deksripsi"
                                  placeholder="Masukan deskripsi"
                                  color="secondary"
                                  value={child?.Desc}
                                  onChange={(e) => {
                                    let newSub = inputValue?.subCoa;
                                    const indexSub = inputValue?.subCoa?.findIndex((sub) => sub?.id === item?.id);

                                    newSub[indexSub].Detail = newSub[indexSub].Detail?.map((detail) => {
                                      if (detail?.id === child?.id) {
                                        return { ...detail, Desc: e.target.value };
                                      } else {
                                        return { ...detail };
                                      }
                                    });

                                    setInputValue((prevVal) => ({
                                      ...prevVal,
                                      subCoa: [...newSub],
                                    }));
                                  }}
                                />
                                <IconButton
                                  style={{ width: 40, height: 40 }}
                                  onClick={() => {
                                    let newSub = inputValue?.subCoa;
                                    const indexSub = inputValue?.subCoa?.findIndex((sub) => sub?.id === item?.id);

                                    newSub[indexSub].Detail = newSub[indexSub].Detail.filter(
                                      (detail) => detail?.id !== child?.id,
                                    );

                                    setInputValue((prevVal) => ({
                                      ...prevVal,
                                      subCoa: [...newSub],
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
                    </Stack>
                  ))
                ) : (
                  <Typography style={{ fontSize: 14 }}>Tidak ada data</Typography>
                )}
              </Stack>
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

export default ModalCreateCOA;
