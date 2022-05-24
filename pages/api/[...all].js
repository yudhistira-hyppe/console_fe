import httpProxyMiddleware from 'next-http-proxy-middleware';
import { REST_API_URL } from 'authentication/auth-provider/config';

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
  },
};

export default (req, res) =>
  httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target: REST_API_URL,
    // In addition, you can use the `pathRewrite` option provided by `next-http-proxy-middleware`
    pathRewrite: [
      {
        patternStr: '^/api',
        replaceStr: '/v2/api',
        //replaceStr: ''
      },
    ],
  });
