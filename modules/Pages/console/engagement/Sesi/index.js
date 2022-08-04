import { AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Area, Brush } from 'recharts';
import CmtAdvCard from '@coremat/CmtAdvCard';
import CmtCardHeader from '@coremat/CmtCard/CmtCardHeader';
import { Button, Stack } from '@mui/material';
import { ButtonGroup } from '@material-ui/core';

const data = [
  { name: 'Page A', uv: 4000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

const SesiGraph = () => {
  return (
    <>
      <CmtAdvCard>
        <CmtCardHeader
          titleProps={{
            variant: 'h4',
            component: 'div',
          }}
          title={
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <div>Sesi</div>
              <div>
                <ButtonGroup size="small" aria-label="small button group">
                  <Button key="one">
                    <span style={{ fontSize: '10px' }}>Harian</span>
                  </Button>
                  <Button key="two">
                    <span style={{ fontSize: '10px' }}>Mingguan</span>
                  </Button>
                  <Button key="three">
                    <span style={{ fontSize: '10px' }}>Bulanan</span>
                  </Button>
                  <Button key="three">
                    <span style={{ fontSize: '10px' }}>Rentang</span>
                  </Button>
                </ButtonGroup>
              </div>
            </Stack>
          }
        />

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} syncId="anyId" margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
            <Area type="monotone" dataKey="pv" stroke="rgba(171, 34, 175, 1)" fill="rgba(171, 34, 175, 1)" />
            {/* <Brush /> */}
          </AreaChart>
        </ResponsiveContainer>
      </CmtAdvCard>
    </>
  );
};

export default SesiGraph;
