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
    )}; expires=${tempDate.toUTCString()}; SameSite=None; Secure; path=/;`;
  });
};

export const deleteAllCookies = () => {
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
  }
};
