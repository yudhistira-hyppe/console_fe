//# Default IP and Stream for sanbox equaly
// export const DEFAULT_IP = `sandbox.hyppe.id`;
// export const DEFAULT_STREAM_IP = `sandbox.hyppe.id`;
export const DEFAULT_IP = process.env.NEXT_PUBLIC_API_BASE_URL;
export const DEFAULT_STREAM_IP = process.env.NEXT_PUBLIC_API_BASE_URL;

export const MODE = `DEV`;
//export const DEFAULT_IP = `virtserver.swaggerhub.com`;
//export const DEFAULT_STREAM_IP = `virtserver.swaggerhub.com`;

export const SOCKET_IO_URL = DEFAULT_IP.replace('/v5/api', '');
export const STREAM_URL = DEFAULT_STREAM_IP.replace('/v5/api', '');
//export const REST_API_URL = `https://${DEFAULT_IP}/jaykeren/HyppeConsole/1.0.0`;
export const REST_API_URL = DEFAULT_IP.replace('/v5/api', '');
