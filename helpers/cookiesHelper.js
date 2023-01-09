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
  var cookies = document.cookie.split('; ');
  for (var c = 0; c < cookies.length; c++) {
    var d = window.location.hostname.split('.');
    while (d.length > 0) {
      var cookieBase =
        encodeURIComponent(cookies[c].split(';')[0].split('=')[0]) +
        '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' +
        d.join('.') +
        ' ;path=';
      var p = location.pathname.split('/');
      document.cookie = cookieBase + '/';
      while (p.length > 0) {
        document.cookie = cookieBase + p.join('/');
        p.pop();
      }
      d.shift();
    }
  }
};
