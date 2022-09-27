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
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Ckeditor from 'react-ckeditor-component/lib/ckeditor';
import { Stack } from '@mui/system';
import Head from 'next/head';
import Breadcrumbs from 'modules/Pages/console/help-center/bantuan-pengguna/BreadCrumb';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';
import { ModalCreateVoucher } from '../../components';

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
}));

const VoucherFormComponent = ({ data }) => {
  const breadcrumbs = [
    { label: 'Home', link: '/console' },
    { label: 'Monetisasi', link: '/console/monetize' },
    { label: 'Voucher', link: '/console/monetize/voucher' },
    { label: data ? 'Ubah Voucher' : 'Buat Voucher', isActive: true },
  ];
  const [val, setVal] = React.useState({
    name: null,
    kode: null,
    kredit: null,
    bonus: null,
    stok: null,
    exp: null,
    sdk: null,
  });
  const [showModal, setShowModal] = React.useState(false);
  const router = useRouter();
  const classes = useStyles();
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(7),
    },
    '& .MuiInputBase-input': {
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

  const onExpChange = (event) => {
    setVal({
      ...val,
      exp: event.target.value,
    });
  };

  const onInputChange = (event) => {
    event.preventDefault();
    setVal({
      ...val,
      [event.target.name]: event.target.value,
    });
  };

  const onCkeditorChange = (event) => {
    const newContent = event.editor.getData();
    setVal({
      ...val,
      sdk: newContent,
    });
  };

  const onBackHandler = () => {
    router.push('/console/monetize/voucher');
  };

  const onConfirm = () => {
    setShowModal(false);
  };

  const onCancel = () => {
    setShowModal(false);
  }
 
  return (
    <>
      <Head>
        <title key="title">Console:: Hyype Console</title>
      </Head>

      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <Stack mb={3} mt={1}>
        <Link href="/" onClick={onBackHandler} style={{ cursore: 'pointer' }}>
          <Stack direction={'row'}>
            <Stack direction={'column'} justifyContent={'center'}>
              <BackIconNav fontSize="small" style={{ color: 'black', fontSize: '15px', fontWeight: 'bold' }} />
            </Stack>
            <Stack>
              <Typography variant="h1" style={{ color: 'black' }}>
                Kembali
              </Typography>
            </Stack>
          </Stack>
        </Link>
      </Stack>

      <PageContainer>
        <Card style={{ padding: 25, paddingTop: 0 }}>
          <GridContainer>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel htmlFor="bootstrap-input" className={classes.inputLabel}>
                  Nama Voucher<span className={classes.requiredMark}>*</span>
                </InputLabel>
                <BootstrapInput
                  name="name"
                  placeholder="Tulis Nama Voucher"
                  id="bootstrap-input"
                  value={val?.name}
                  onChange={onInputChange}
                  readOnly={data}
                  disabled={data}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel htmlFor="bootstrap-input" className={classes.inputLabel}>
                  Kode Voucher<span className={classes.requiredMark}>*</span>
                </InputLabel>
                <BootstrapInput
                  name="voucher"
                  placeholder="Tulis Kode Voucher"
                  id="bootstrap-input"
                  value={val?.kode}
                  onChange={onInputChange}
                  readOnly={data}
                  disabled={data}
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
                <BootstrapInput
                  name="kredit"
                  placeholder="Tulis Jumlah Kredit"
                  id="bootstrap-input"
                  value={val?.kredit}
                  onChange={onInputChange}
                />
                <FormHelperText>1 kredit = Rp 1.500,-</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel htmlFor="bootstrap-input" className={classes.inputLabel}>
                  Jumlah Bonus Kredit<span className={classes.optionalText}>{` (Jika ada)`}</span>
                </InputLabel>
                <BootstrapInput
                  name="bonus"
                  placeholder="Tulis Jumlah Bonus"
                  id="bootstrap-input"
                  value={val?.bonus}
                  onChange={onInputChange}
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
                <BootstrapInput
                  name="stok"
                  placeholder="Tulis Jumlah Voucher"
                  id="bootstrap-input"
                  value={val?.stock}
                  onChange={onInputChange}
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
                <RadioGroup row className="mt-8">
                  <FormControlLabel
                    onChange={onExpChange}
                    checked={val?.exp === '30'}
                    value="30"
                    control={<Radio />}
                    label={'30 Hari'}
                  />
                  <FormControlLabel
                    onChange={onExpChange}
                    checked={val?.exp === '60'}
                    value="60"
                    control={<Radio />}
                    label={'60 Hari'}
                  />
                  <FormControlLabel
                    onChange={onExpChange}
                    checked={val?.exp === '90'}
                    value="90"
                    control={<Radio />}
                    label={'90 Hari'}
                  />
                  <FormControlLabel
                    onChange={onExpChange}
                    value="other"
                    control={<Radio />}
                    label={
                      <BootstrapInput
                        placeholder="Masukkan Jumlah Hari"
                        id="bootstrap-input"
                        disabled={val?.exp !== 'other'}
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
          <CardContent>
            <Ckeditor
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
          <div>
            <Button
              variant="contained"
              color="primary"
              // disabled={!val?.name || !val?.kode || !val?.kredit || !val?.stok || !val?.exp || (!val?.sdk && !data)}>
              onClick={() => setShowModal(true)}>
              Simpan
            </Button>
          </div>
          <div>
            <Button onClick={() => setShowModal(false)}>Batal</Button>
          </div>
        </Stack>
      </PageContainer>
      <ModalCreateVoucher showModal={showModal} onConfirm={onConfirm} onCancel={onCancel} />
    </>
  );
};

export default VoucherFormComponent;
