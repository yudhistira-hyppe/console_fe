export const getAllCookies = () => {
  if (document.cookie) {
    return document.cookie
      .split(';')
      .map((item) => item.trim())
      .reduce((obj, cookie) => {
        const keyAndValue = cookie.includes('p_h5_upload_u') ? [null, null] : cookie.split('=');
        return { ...obj, [keyAndValue[0]]: JSON.parse(keyAndValue[1]) };
      }, {});
  }
  return null;
};

export const createCookies = (keyAndValueCookies) => {
  const date = new Date();
  Object.keys(keyAndValueCookies).forEach((key) => {
    let tempDate = new Date();
    tempDate.setTime(date.getTime() + keyAndValueCookies[key]['expirationHour'] * 60 * 60 * 1000);
    document.cookie = `${key}=${JSON.stringify(
      keyAndValueCookies[key]['value'],
    )}; expires=${tempDate.toUTCString()}; SameSite=None; Secure`;
  });
};

export const deleteAllCookies = () => {
  document.cookie.split(';').forEach((c) => {
    document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=; expires=${new Date().toUTCString()}; SameSite=None; Secure`);
  });
};
