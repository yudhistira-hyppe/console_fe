import CmtList from '@coremat/CmtList';
import CmtProgressBar from '@coremat/CmtProgressBar';
import { Typography } from '@material-ui/core';
import { Box, Card, CircularProgress, Divider, Stack } from '@mui/material';
import { formatCurrency } from 'helpers/stringHelper';
import { isEmpty } from 'lodash';
import React from 'react';

const CardItem = ({ title, type, data = [], pengiklan, pendapatan, totalData, isLoading }) => {
  const findStatusAds = (name) => data?.find((item) => item?.name === name);

  const ProgressIndicator = (props) => {
    const { item, ...rest } = props;

    return (
      <Box width={1} {...rest}>
        <CmtProgressBar
          label={
            <Box display="flex" alignItems="center">
              {item?.name || item?.nameType || item?.name_id} | {item?.count || 0}
            </Box>
          }
          labelPos="top-left"
          value={(item?.count / data?.map((item) => item?.count).reduce((a, b) => a + b, 0)) * 100}
          renderValue={(value) => {
            return `${value?.toFixed(2)}%`;
          }}
          containedColor="#8019D8"
          thickness={10}
          onlyContained
        />
      </Box>
    );
  };

  return (
    <Card sx={{ height: '100%', width: '100%' }}>
      <Stack direction="column">
        <Typography style={{ padding: '18px 20px', fontWeight: 'bold' }}>{title || 'Title Here'}</Typography>
        <Divider flexItem />
        <Box height={225}>
          {isLoading ? (
            <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height="100%">
              <CircularProgress color="secondary" size={28} />
            </Stack>
          ) : (
            <>
              {type === 'pengiklan' && (
                <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height="100%" gap="4px">
                  <Typography style={{ color: '#3F3F3FDE', fontSize: 32, fontWeight: 'bold' }}>{pengiklan}</Typography>
                  <Typography style={{ color: '#737373' }}>Total Pengiklan</Typography>
                </Stack>
              )}
              {type === 'pendapatan' && (
                <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height="100%" gap="4px">
                  <Typography style={{ color: '#3F3F3FDE', fontSize: 32, fontWeight: 'bold' }}>
                    Rp{formatCurrency(pendapatan)}
                  </Typography>
                  <Typography style={{ color: '#737373' }}>Total Pendapatan</Typography>
                </Stack>
              )}
              {type === 'iklan' && (
                <>
                  {isEmpty(data) ? (
                    <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height="100%">
                      <Typography style={{ width: '55%', textAlign: 'center', color: '#666666' }}>
                        Belum ada informasi yang bisa ditampilkan.
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack direction="row" width="100%" height="100%" style={{ padding: '8px 20px' }}>
                      <Stack direction="column" width="30%" mt="10px">
                        <Typography style={{ fontSize: 20 }}>{totalData}</Typography>
                        <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>Total Iklan</Typography>
                      </Stack>
                      <Stack direction="column" width="70%">
                        <CmtProgressBar
                          label={
                            <Box display="flex" alignItems="center">
                              Draft | {findStatusAds('DRAFT')?.count || 0}
                            </Box>
                          }
                          labelPos="top-left"
                          value={
                            (findStatusAds('DRAFT')?.count / data?.map((item) => item?.count).reduce((a, b) => a + b, 0) ||
                              0) * 100
                          }
                          renderValue={(value) => {
                            return `${value?.toFixed(2)}%`;
                          }}
                          containedColor="#E6094B"
                          thickness={5}
                          onlyContained
                        />
                        <CmtProgressBar
                          label={
                            <Box display="flex" alignItems="center">
                              Ditinjau | {findStatusAds('UNDER_REVIEW')?.count || 0}
                            </Box>
                          }
                          labelPos="top-left"
                          value={
                            (findStatusAds('UNDER_REVIEW')?.count /
                              data?.map((item) => item?.count).reduce((a, b) => a + b, 0) || 0) * 100
                          }
                          renderValue={(value) => {
                            return `${value?.toFixed(2)}%`;
                          }}
                          containedColor="#FF8C00"
                          thickness={5}
                          onlyContained
                        />
                        <CmtProgressBar
                          label={
                            <Box display="flex" alignItems="center">
                              Aktif | {findStatusAds('ACTIVE')?.count || 0}
                            </Box>
                          }
                          labelPos="top-left"
                          value={
                            (findStatusAds('ACTIVE')?.count / data?.map((item) => item?.count).reduce((a, b) => a + b, 0) ||
                              0) * 100
                          }
                          renderValue={(value) => {
                            return `${value?.toFixed(2)}%`;
                          }}
                          containedColor="#8DCD03"
                          thickness={5}
                          onlyContained
                        />
                        <CmtProgressBar
                          label={
                            <Box display="flex" alignItems="center">
                              Tidak Aktif | {findStatusAds('IN_ACTIVE')?.count || 0}
                            </Box>
                          }
                          labelPos="top-left"
                          value={
                            (findStatusAds('IN_ACTIVE')?.count /
                              data?.map((item) => item?.count).reduce((a, b) => a + b, 0) || 0) * 100
                          }
                          renderValue={(value) => {
                            return `${value?.toFixed(2)}%`;
                          }}
                          containedColor="#7C7C7C"
                          thickness={5}
                          onlyContained
                        />
                      </Stack>
                    </Stack>
                  )}
                </>
              )}
              {type === 'progress' && (
                <>
                  {isEmpty(data) ? (
                    <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height="100%">
                      <Typography style={{ width: '55%', textAlign: 'center', color: '#666666' }}>
                        Belum ada informasi yang bisa ditampilkan.
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack direction="column" width="100%" height="100%" style={{ padding: '18px 20px' }}>
                      <CmtList
                        data={data}
                        renderRow={(item, index) => <ProgressIndicator key={index} item={item} />}
                        sx={{ display: 'flex !important', flexDirection: 'column !important', gap: 12 }}
                      />
                    </Stack>
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default CardItem;
