import GridContainer from '@jumbo/components/GridContainer';
import PageContainer from '@jumbo/components/PageComponents/layouts/PageContainer';
import {
  Card,
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  FormControlLabel,
  CardHeader,
  CardContent,
  Button,
  Link,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { Grid } from '@material-ui/core';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormLabel } from '@mui/material';
import Ckeditor from 'react-ckeditor-component/lib/ckeditor';
import { Stack } from '@mui/system';
import Head from 'next/head';
import Breadcrumbs from 'modules/Pages/console/help-center/bantuan-pengguna/BreadCrumb';
import { useRouter } from 'next/router';
import BackIconNav from '@material-ui/icons/ArrowBackIos';

const breadcrumbs = [
  { label: 'Home', link: '/console' },
  { label: 'Monetisasi', link: '/console/monetize' },
  { label: 'Voucher', link: '/console/monetize/voucher' },
  { label: 'Buat Voucher', isActive: true },
];

const VoucherFormComponent = () => {
  const router = useRouter();
  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
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

  const onBackHandler = () => {
    router.push('/console/help-center/bantuan-pengguna');
  };

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
        <Card style={{ padding: 25 }}>
          <GridContainer style={{ marginBottom: '1em' }}>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Nama Voucher
                </InputLabel>
                <BootstrapInput placeholder="Tulis Nama Voucher" id="bootstrap-input" />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Kode Voucher
                </InputLabel>
                <BootstrapInput placeholder="Tulis Kode Voucher" id="bootstrap-input" />
                <FormHelperText>Penamaan kode voucher disarankan lebih dari 5 karakter</FormHelperText>
              </FormControl>
            </Grid>
          </GridContainer>

          <GridContainer style={{ marginBottom: '1em' }}>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Jumlah Kredit
                </InputLabel>
                <BootstrapInput placeholder="Tulis Jumlah Kredit" id="bootstrap-input" />
                <FormHelperText>1 kredit = Rp 1.500,-</FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Jumlah Bonus Kredit
                </InputLabel>
                <BootstrapInput placeholder="Tulis Jumlah Bonus" id="bootstrap-input" />
                <FormHelperText>1 kredit = Rp 0,-</FormHelperText>
              </FormControl>
            </Grid>
          </GridContainer>

          <GridContainer style={{ marginBottom: '1em' }}>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <InputLabel shrink htmlFor="bootstrap-input">
                  Jumlah Stok Voucher
                </InputLabel>
                <BootstrapInput placeholder="Tulis Jumlah Voucher" id="bootstrap-input" />
                <FormHelperText>Jumlah voucher dapat disesuaikan dengan kebutuhan</FormHelperText>
              </FormControl>
            </Grid>
          </GridContainer>

          <GridContainer style={{ marginBottom: '1em' }}>
            <Grid item xs={12} md={6} sm={6}>
              <FormControl variant="standard" style={{ width: '100%' }}>
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup row>
                  <FormControlLabel control={<Radio />} label={'30 Hari'} />
                  <FormControlLabel control={<Radio />} label={'60 Hari'} />
                  <FormControlLabel control={<Radio />} label={'90 Hari'} />
                  <FormControlLabel
                    control={<Radio />}
                    label={<BootstrapInput placeholder="Masukkan Jumlah Hari" id="bootstrap-input" />}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
          </GridContainer>
        </Card>

        <Card style={{ marginTop: '2em' }}>
          <CardHeader title={'Syarat Dan Ketentuan'} />
          <CardContent>
            <Ckeditor
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
            <Button variant="contained" color="primary">
              Simpan
            </Button>
          </div>
          <div>
            <Button>Batal</Button>
          </div>
        </Stack>
      </PageContainer>
    </>
  );
};

export default VoucherFormComponent;
