//# Default IP and Stream for sanbox equaly
// export const DEFAULT_IP = `sandbox.hyppe.id`;
// export const DEFAULT_STREAM_IP = `sandbox.hyppe.id`;
export const DEFAULT_IP = process.env.NEXT_PUBLIC_API_BASE_URL.split('/');
export const DEFAULT_STREAM_IP = process.env.NEXT_PUBLIC_API_BASE_URL.split('/');

export const MODE = `DEV`;
//export const DEFAULT_IP = `virtserver.swaggerhub.com`;
//export const DEFAULT_STREAM_IP = `virtserver.swaggerhub.com`;

export const SOCKET_IO_URL = `${DEFAULT_IP[0]}//${DEFAULT_IP[2]}`;
export const STREAM_URL = `${DEFAULT_STREAM_IP[0]}//${DEFAULT_STREAM_IP[2]}`;
//export const REST_API_URL = `https://${DEFAULT_IP}/jaykeren/HyppeConsole/1.0.0`;
export const REST_API_URL = `${DEFAULT_IP[0]}//${DEFAULT_IP[2]}`;
