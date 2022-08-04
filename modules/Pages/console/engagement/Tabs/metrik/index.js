const Metrik = () => {
  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={4} md={4}>
          <PenggunaBaru title="Pengguna Baru" secondaryTitle="Bulan ini" amount="330" />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <PenggunaAktif title="Pengguna Aktif" secondaryTitle="Bulan ini" amount="10.254" />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Gender />
        </Grid>
        <Grid item xs={12} sm={8} md={8}>
          <center style={{ background: 'purple', height: '40vh', width: '100%', color: '#FFFFFF' }}>
            map here (i'll make it later) because it taking time and discuss
          </center>
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <ApplicationInstalled />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          {/*  NOTED : the heck is happend, i cant make it modular, 
              when i export the component the error is 'main is undefined' seriously i dont know why */}
          {/* please give it a try */}
          {/* <SesiGraph /> */}

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
                <CartesianGrid strokeDasharray="0" />
                <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: 'black' }} cursor={false} />
                <defs>
                  <linearGradient id="color18" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="1%" stopColor="rgba(212, 90, 216, 0.2)" stopOpacity={1} />
                    <stop offset="95%" stopColor="white" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="pv"
                  type="monotone"
                  strokeWidth={2}
                  stackId="2"
                  stroke="rgba(171, 34, 175, 1)"
                  fill="url(#color18)"
                  fillOpacity={1}
                />
                {/* <Area type="monotone" dataKey="pv" stroke="rgba(171, 34, 175, 1)" fill="rgba(171, 34, 175, 1)" /> */}
                {/* <Brush /> */}
              </AreaChart>
            </ResponsiveContainer>
          </CmtAdvCard>
        </Grid>

        <Grid item xs={12} sm={12} md={12}>
          <EngagementGraph />
        </Grid>

        <Grid item xs={12} sm={8} md={8}>
          <ComingSoon title="Akan Hadir" />
        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <ComingSoon title="Statik Store" />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ComingSoon title="Lalu Lintas" />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <ComingSoon title="Kepuasaan Pelanggan" />
        </Grid>
      </Grid>
    </>
  );
};

export default Metrik;
