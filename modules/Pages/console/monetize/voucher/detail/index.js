import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import {
  Card,
  FormControl,
  InputLabel,
  FormHelperText,
  FormControlLabel,
  CardHeader,
  CardContent,
  Button,
  Link,
  Typography,
  makeStyles,
  Divider,
} from '@material-ui/core';
import React from 'react';
import { Grid } from '@material-ui/core';
import { alpha } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Ckeditor from 'react-ckeditor-component/lib/ckeditor';
import { Stack } from '@mui/system';
import Head from 'next/head';
import Breadcrumbs from 'modules/Pages/console/help-center/bantuan-pengguna/BreadCrumb';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { ModalCreateVoucher } from '../../components';
import { useCreateVoucherMutation, useUpdateVoucherMutation } from 'api/console/monetize/voucher';
import { TextField } from '@mui/material';
import numberWithCommas from 'modules/Components/CommonComponent/NumberWithCommas/NumberWithCommas';
import { toast, Toaster } from 'react-hot-toast';

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    color: '#151B26',
    fontWeight: 'bold',
  },
  requiredMark: {
    color: 'red',
  },
  optionalText: {
    color: 'rgba(115, 115, 115, 1)',
    fontSize: '14px',
  },
  inputForm: {
    marginTop: 56,
    borderRadius: 4,
    position: 'relative',
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '80%',
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

const VoucherFormComponent = ({ data }) => {
  const breadcrumbs = [
    { label: 'Monetisasi', link: '/monetize' },
    { label: 'Kelola Voucher', link: '/monetize/voucher' },
    { label: data ? 'Ubah Voucher' : 'Buat Voucher', isActive: true },
  ];
  const [val, setVal] = React.useState({
    nameAds: data?.nameAds || '',
    codeVoucher: data?.codeVoucher || '',
    creditValue: data?.creditValue || '',
    creditPromo: data?.creditPromo || '',
    qty: data?.qty || '',
    expiredDay:
      data?.expiredDay === 30
        ? data?.expiredDay?.toString()
        : data?.expiredDay === 60
        ? data?.expiredDay?.toString()
        : data?.expiredDay === 90
        ? data?.expiredDay?.toString()
        : 'other' || '',
    otherExpired: data?.expiredDay || '',
    amount: data?.amount || 0,
    description: data?.description || '',
  });
  const [showModal, setShowModal] = React.useState(false);
  const [addVoucher] = useCreateVoucherMutation();
  const [updateVoucher] = useUpdateVoucherMutation();
  const router = useRouter();
  const classes = useStyles();
  const access = localStorage.getItem('access') ? JSON.parse(localStorage.getItem('access')) : [];

  const onExpChange = (event) => {
    setVal((prevVal) => {
      return { ...prevVal, expiredDay: event.target.value };
    });
  };

  const onInputChange = (event) => {
    event.preventDefault();
    setVal((prevVal) => {
      return { ...prevVal, [event.target.name]: event.target.value };
    });
  };

  const onCkeditorChange = (event) => {
    const newContent = event.editor.getData();
    setVal((prevVal) => {
      return { ...prevVal, description: newContent };
    });
  };

  const onConfirm = () => {
    const bodyData = {
      ...val,
      expiredDay: val?.expiredDay === 'other' ? val.otherExpired : Number(val.expiredDay),
      amount: val.creditValue * 1500,
      isActive: true,
      creditValue: Number(val?.creditValue),
      creditPromo: Number(val?.creditPromo) || 0,
    };

    data
      ? updateVoucher({
          id: data?._id,
          data: {
            ...val,
            expiredDay: val?.expiredDay === 'other' ? val.otherExpired : Number(val.expiredDay),
            amount: val?.creditValue * 1500,
            isActive: data.isActive,
            creditValue: Number(val?.creditValue),
            creditPromo: Number(val?.creditPromo) || 0,
          },
        }).then((res) => {
          if (res?.error) {
            toast.error(res?.error?.data?.message);
          } else {
            router.push('/monetize/voucher');
            toast.success('Berhasil memperbarui voucher');
          }
        })
      : addVoucher(bodyData).then((res) => {
          if (res?.error) {
            toast.error(res?.error?.data?.message);
          } else {
            router.push('/monetize/voucher');
            toast.success('Berhasil membuat voucher');
          }
        });
    setShowModal(false);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <Head>
        <title key="title">Console:: Hyype Console</title>
      </Head>

      <Stack direction={'column'} spacing={2} mb={3}>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <Stack
          direction={'row'}
          mt={1}
          mb={3}
          onClick={() => router.push('/monetize/voucher')}
          gap="5px"
          style={{ width: 'fit-content', cursor: 'pointer' }}>
          <Stack direction={'column'} justifyContent={'center'}>
            <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '12px', fontWeight: 'bold' }} />
          </Stack>
          <Typography variant="h1" style={{ fontSize: 20, color: 'black' }}>
            Kembali
          </Typography>
        </Stack>
      </Stack>

      <PageContainer>
        <Card style={{ padding: 25, paddingTop: 0 }}>
          <GridContainer>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel htmlFor="bootstrap-input" className={classes.inputLabel}>
                  Nama Voucher<span className={classes.requiredMark}>*</span>
                </InputLabel>
                <input
                  name="nameAds"
                  placeholder="Tulis Nama Voucher"
                  id="bootstrap-input"
                  className={classes.inputForm}
                  value={val?.nameAds}
                  onChange={onInputChange}
                  disabled={
                    data || data
                      ? !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                      : !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel htmlFor="bootstrap-input" className={classes.inputLabel}>
                  Kode Voucher<span className={classes.requiredMark}>*</span>
                </InputLabel>
                <input
                  name="codeVoucher"
                  placeholder="Tulis Kode Voucher"
                  id="bootstrap-input"
                  className={classes.inputForm}
                  value={val?.codeVoucher}
                  onChange={onInputChange}
                  disabled={
                    data || data
                      ? !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                      : !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces
                  }
                />
                <FormHelperText>Penamaan kode voucher disarankan lebih dari 5 karakter</FormHelperText>
              </FormControl>
            </Grid>
          </GridContainer>

          <GridContainer>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel htmlFor="bootstrap-input" className={classes.inputLabel}>
                  Jumlah Kredit<span className={classes.requiredMark}>*</span>
                </InputLabel>
                <input
                  name="creditValue"
                  type="number"
                  placeholder="Tulis Jumlah Kredit"
                  id="bootstrap-input"
                  className={classes.inputForm}
                  value={val?.creditValue}
                  onChange={onInputChange}
                  disabled={
                    data
                      ? !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                      : !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces
                  }
                />
                <FormHelperText>
                  1 kredit = Rp 1.500,-. Harga voucher = Rp {numberWithCommas(val?.creditValue * 1500)}{' '}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel htmlFor="bootstrap-input" className={classes.inputLabel}>
                  Jumlah Bonus Kredit<span className={classes.optionalText}>{` (Jika ada)`}</span>
                </InputLabel>
                <input
                  name="creditPromo"
                  type="number"
                  placeholder="Tulis Jumlah Bonus"
                  id="bootstrap-input"
                  className={classes.inputForm}
                  value={val?.creditPromo}
                  onChange={onInputChange}
                  disabled={
                    data
                      ? !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                      : !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces
                  }
                />
                <FormHelperText>1 kredit = Rp 0,-</FormHelperText>
              </FormControl>
            </Grid>
          </GridContainer>

          <GridContainer>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel htmlFor="bootstrap-input" className={classes.inputLabel}>
                  Jumlah Stok Voucher<span className={classes.requiredMark}>*</span>
                </InputLabel>
                <input
                  name="qty"
                  type="number"
                  placeholder="Tulis Jumlah Voucher"
                  id="bootstrap-input"
                  className={classes.inputForm}
                  value={val?.qty}
                  onChange={onInputChange}
                  disabled={
                    data
                      ? !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                      : !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces
                  }
                />
                <FormHelperText>Jumlah voucher dapat disesuaikan dengan kebutuhan</FormHelperText>
              </FormControl>
            </Grid>
          </GridContainer>

          <GridContainer style={{ marginBottom: '1em' }}>
            <Grid item xs={12} md={8} sm={8}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <div className="mb-2">
                  <InputLabel htmlFor="bootstrap-input" className={classes.inputLabel}>
                    Masa Berlaku Voucher<span className={classes.requiredMark}>*</span>
                  </InputLabel>
                </div>
                <RadioGroup row style={{ marginTop: 50 }}>
                  <FormControlLabel
                    onChange={onExpChange}
                    checked={val?.expiredDay === '30'}
                    value="30"
                    control={
                      <Radio
                        color="secondary"
                        disabled={
                          data
                            ? !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                            : !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces
                        }
                      />
                    }
                    label={'30 Hari'}
                  />
                  <FormControlLabel
                    onChange={onExpChange}
                    checked={val?.expiredDay === '60'}
                    value="60"
                    control={
                      <Radio
                        color="secondary"
                        disabled={
                          data
                            ? !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                            : !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces
                        }
                      />
                    }
                    label={'60 Hari'}
                  />
                  <FormControlLabel
                    onChange={onExpChange}
                    checked={val?.expiredDay === '90'}
                    value="90"
                    control={
                      <Radio
                        color="secondary"
                        disabled={
                          data
                            ? !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                            : !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces
                        }
                      />
                    }
                    label={'90 Hari'}
                  />
                  <FormControlLabel
                    onChange={onExpChange}
                    value="other"
                    checked={val?.expiredDay === 'other'}
                    control={
                      <Radio
                        color="secondary"
                        disabled={
                          data
                            ? !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                            : !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces
                        }
                      />
                    }
                    label={
                      <TextField
                        placeholder="Masukkan Jumlah Hari"
                        id="bootstrap-input"
                        size="small"
                        value={val?.otherExpired}
                        onChange={(e) => setVal({ ...val, otherExpired: Number(e.target.value) })}
                        disabled={
                          val?.expiredDay !== 'other' || data
                            ? !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                            : !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces
                        }
                        color="secondary"
                      />
                    }
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </GridContainer>
        </Card>

        <Card style={{ marginTop: '2em' }}>
          <CardHeader
            title={
              <Stack spacing={2}>
                <Typography style={{ fontWeight: 'bold', fontSize: 'large' }}>
                  Syarat dan Ketentuan<span className={classes.requiredMark}>*</span>
                </Typography>
                <Divider />
              </Stack>
            }
          />
          <CardContent style={{ opacity: data ? 0.3 : 1, position: 'relative' }}>
            {data && (
              <div style={{ height: '100%', width: '100%', zIndex: 1, background: 'transparent', position: 'absolute' }} />
            )}
            <Ckeditor
              content={val?.description}
              events={{
                change: onCkeditorChange,
              }}
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
              }}
            />
          </CardContent>
        </Card>

        <Stack direction="row" mt={3} spacing={3}>
          <Button
            variant="contained"
            color="primary"
            // disabled={!val?.name || !val?.kode || !val?.kredit || !val?.stok || !val?.exp || (!val?.sdk && !data)}>
            onClick={() => (data ? onConfirm() : setShowModal(true))}
            disabled={
              data
                ? !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.updateAcces
                : !access.find((item) => item?.nameModule === 'monetize_manage_voucher')?.acces?.createAcces
            }>
            Simpan
          </Button>
          <Button onClick={() => router.back()}>Batal</Button>
        </Stack>
      </PageContainer>
      <ModalCreateVoucher showModal={showModal} onConfirm={onConfirm} onCancel={onCancel} />

      <Toaster />
    </>
  );
};

export default VoucherFormComponent;
