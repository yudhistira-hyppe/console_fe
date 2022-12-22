import React from 'react';
import { Typography, Stack, Avatar, Card } from '@mui/material';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  cardRoot: {
    height: '40%',
  },
  cardHeader: {
    height: '15%',
    padding: '2em',
  },
  historyListContainer: {
    height: 200,
    overflowY: 'auto',
    padding: '1em 2em 0',
  },
  textPrimaryBold: {
    fontWeight: 'bold',
    color: '#AB22AF',
  },
}));

const dummyData = [
  {
    user: '@ikeaindonesia ',
    title: 'Iklan diajukan',
    date: '31/08/2022-13:00 WIB',
    desc: 'mengajukan permohonan pemasangan iklan dari Hyppe Business',
  },
  {
    user: '@paramita ',
    title: 'Iklan diajukan',
    date: '31/08/2022-13:00 WIB',
    desc: 'telah menyetujui penjadwalan iklan di Hyppe Console',
  },
  {
    user: null,
    title: 'Iklan diajukan',
    date: '31/08/2022-13:00 WIB',
    desc: 'Iklan telah ditayangkan sesuai jadwal dari sistem Hyppe Console',
  },
  {
    user: null,
    title: 'Iklan diajukan',
    date: '31/08/2022-13:00 WIB',
    desc: 'Kredit iklan telah habis digunakan dari sistem Hyppe Console',
  },
  {
    user: '@ikeaindonesia ',
    title: 'Iklan diajukan',
    date: '31/08/2022-13:00 WIB',
    desc: 'mengajukan permohonan pemasangan iklan dari Hyppe Business',
  },
  {
    user: '@paramita ',
    title: 'Iklan diajukan',
    date: '31/08/2022-13:00 WIB',
    desc: 'telah menyetujui penjadwalan iklan di Hyppe Console',
  },
  {
    user: null,
    title: 'Iklan diajukan',
    date: '31/08/2022-13:00 WIB',
    desc: 'Iklan telah ditayangkan sesuai jadwal dari sistem Hyppe Console',
  },
  {
    user: null,
    title: 'Iklan diajukan',
    date: '31/08/2022-13:00 WIB',
    desc: 'Kredit iklan telah habis digunakan dari sistem Hyppe Console',
  },
];

const HistoryItem = ({ item }) => (
  <Stack direction="row" spacing={2} mb={2}>
    <Stack direction="column" justifyContent="center">
      <Avatar src={item?.img} />
    </Stack>

    <div>
      <Stack direction="row" spacing={1}>
        <Stack direction="column" justifyContent="center">
          <Typography fontFamily="Lato" variant="body2">
            {item?.title}
          </Typography>
        </Stack>
        <Stack direction="column" justifyContent="center">
          <Typography fontFamily="Lato" color="rgba(0, 0, 0, 0.38)" variant="body2">
            {item?.date}
          </Typography>
        </Stack>
      </Stack>

      <Typography fontFamily="Lato" variant="caption">
        {item?.user && <span className={`${useStyles().textPrimaryBold} mr-1`}>{item.user}</span>}
        {item?.desc}
      </Typography>
    </div>
  </Stack>
);

const AdsDetailComponent = () => {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.cardRoot}>
        <div className={classes.cardHeader}>
          <Typography fontWeight="bold" fontFamily="Lato" variant="h6">
            Riwayat Iklan
          </Typography>
        </div>

        <div className={classes.historyListContainer}>
          {dummyData.map((el, key) => (
            <HistoryItem item={el} key={key} />
          ))}
        </div>
      </Card>
    </>
  );
};

export default AdsDetailComponent;
