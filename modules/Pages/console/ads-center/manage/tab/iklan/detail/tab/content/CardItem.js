import CmtList from '@coremat/CmtList';
import CmtProgressBar from '@coremat/CmtProgressBar';
import { Typography, makeStyles } from '@material-ui/core';
import { Lens } from '@material-ui/icons';
import { Box, Card, CircularProgress, Divider, Grid, Stack } from '@mui/material';
import { formatCurrency } from 'helpers/stringHelper';
import { isEmpty } from 'lodash';
import React from 'react';
import ScrollBar from 'react-perfect-scrollbar';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const useStyles = makeStyles((theme) => ({
  tooltip: {
    position: 'relative',
    borderRadius: 6,
    padding: '4px 12px',
    backgroundColor: 'rgb(40, 40, 40)',
    color: theme.palette.common.white,
  },
}));

const CardItem = ({ title, description, type, size = 'small', height = 150, amount, isLoading, data, column = 1 }) => {
  const classes = useStyles();
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
        <Typography style={{ padding: '18px 20px', fontWeight: 'bold', fontSize: size === 'small' ? 16 : 20 }}>
          {title || 'Title Here'}
        </Typography>
        {size === 'small' && <Divider flexItem />}
        <Box height={height}>
          {isLoading ? (
            <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height="100%">
              <CircularProgress color="secondary" size={28} />
            </Stack>
          ) : (
            <>
              {type === 'number' && (
                <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height="100%" gap="4px">
                  <Typography style={{ color: '#3F3F3FDE', fontSize: 32, fontWeight: 'bold' }}>{amount || 0}</Typography>
                  <Typography style={{ color: '#737373' }}>{description || 'Description Here'}</Typography>
                </Stack>
              )}
              {type === 'progress' && (
                <>
                  {isEmpty(data) ? (
                    <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height="100%">
                      <Typography style={{ width: 224, textAlign: 'center', color: '#666666' }}>
                        Anda akan melihat metrik {title || ''} audiens di sini.
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack direction="column" width="100%" height="100%" style={{ padding: '18px 20px' }}>
                      <ScrollBar style={{ height: height }}>
                        <CmtList
                          data={data}
                          renderRow={(item, index) => <ProgressIndicator key={index} item={item} />}
                          sx={{ display: 'grid', gridTemplateColumns: `repeat(${column}, 1fr)`, gap: 12 }}
                        />
                      </ScrollBar>
                    </Stack>
                  )}
                </>
              )}
              {type === 'pie' && (
                <>
                  {isEmpty(data) ? (
                    <Stack direction="column" alignItems="center" justifyContent="center" width="100%" height="100%">
                      <Typography style={{ width: 224, textAlign: 'center', color: '#666666' }}>
                        Anda akan melihat metrik {title || ''} audiens di sini.
                      </Typography>
                    </Stack>
                  ) : (
                    <Stack
                      direction="column"
                      justifyContent="center"
                      position="relative"
                      gap="30px"
                      height="100%"
                      width="100%">
                      <ResponsiveContainer height={200} width="100%">
                        <PieChart margin={{}}>
                          <Pie
                            data={data.map((item) => {
                              return {
                                name: item?.name,
                                value: item?.count,
                                persen: item?.persentase,
                              };
                            })}
                            innerRadius={60}
                            outerRadius={90}
                            fill="#8884d8"
                            paddingAngle={3}
                            dataKey="value">
                            {data.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={
                                  entry?.name === 'Laki-laki'
                                    ? '#455DD8'
                                    : entry?.name === 'Perempuan'
                                    ? '#AB22AF'
                                    : '#0795F4'
                                }
                              />
                            ))}
                          </Pie>
                          <Tooltip
                            labelStyle={{ color: 'black' }}
                            wrapperStyle={{ zIndex: 100 }}
                            cursor={false}
                            content={(data) => {
                              return data.payload[0] ? (
                                <Box className={classes.tooltip}>
                                  {data.payload?.[0]?.payload?.name}: {data.payload?.[0]?.payload?.persen?.toFixed(0)}%
                                </Box>
                              ) : null;
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <Stack direction="row" gap={2} justifyContent="center" alignItems="center">
                        <Stack direction="row" alignItems="center" gap="8px">
                          <Lens style={{ color: '#AB22AF', fontSize: 12 }} />
                          <Typography variant="caption">Perempuan</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap="8px">
                          <Lens style={{ color: '#455DD8', fontSize: 12 }} />
                          <Typography variant="caption">Laki-laki</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" gap="8px">
                          <Lens style={{ color: '#0795F4', fontSize: 12 }} />
                          <Typography variant="caption">Lainnya</Typography>
                        </Stack>
                      </Stack>
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
