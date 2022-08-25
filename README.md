# Next.js example

## How to use

Download the example [or clone the repo](https://github.com/mui-org/material-ui):

```sh
curl https://codeload.github.com/mui-org/material-ui/tar.gz/master | tar -xz --strip=2  material-ui-master/examples/nextjs
cd nextjs
```

Install it and run:

```sh
npm install
npm run dev
```

or:

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/mui-org/material-ui/tree/master/examples/nextjs)

## The idea behind the example

[Next.js](https://github.com/zeit/next.js) is a framework for server-rendered React apps.

## Troubleshooting

### `Warning: Prop className did not match.`

If you get this warning, please make sure that you configure `getInitialProps` in `pages/_document.js` correctly. Check the code in this example for more details.

      {/*  <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <XAxis dataKey="month" hide />
        <Tooltip labelStyle={{ color: 'black' }} itemStyle={{ color: '#4D95F3' }} cursor={false} />
        <defs>
          <linearGradient id="color1" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor="#fde6e9" stopOpacity={1} />
            <stop offset="90%" stopColor="#FFFFFF" stopOpacity={1} />
          </linearGradient>
          <linearGradient id="color2" x1="0" y1="0" x2="1" y2="0" gradientTransform="rotate(90)">
            <stop offset="5%" stopColor="#1CACCE44" stopOpacity={1} />
            <stop offset="95%" stopColor="#1CACCE01" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          dataKey="budget"
          type="monotone"
          strokeWidth={2}
          stackId="1"
          stroke="#E36978"
          fill="url(#color1)"
          fillOpacity={1}
        />
        <Area
          dataKey="growth"
          type="monotone"
          strokeWidth={2}
          stackId="2"
          stroke="#E36978"
          fill="url(#color2)"
          fillOpacity={1}
        />
  </AreaChart>*/}