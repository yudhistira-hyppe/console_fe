import { STREAM_URL } from 'authentication/auth-provider/config';
import { useAuth } from 'authentication';

function isStringMatch(str, tester) {
  const reg = new RegExp('^/api/' + tester + '/', 's');
  const isMatch = str.match(reg);
  return isMatch != null ? true : false;
}

export const getFileExtension = (filename) => {
  const reg = new RegExp('^/console/' + tester + '/', 's');
  const isMatch = str.match(reg);
  return isMatch != null ? true : false;
};

export const getMediaUri = (item) => {
  const { authUser } = useAuth();
  const authToken = '?x-auth-token=' + authUser.token + '&x-auth-user=' + authUser.user.email;
  const mediaUri = item.mediaType === 'video' ? item.mediaThumbEndpoint : item.mediaEndpoint;
  const httpUri = STREAM_URL + mediaUri + authToken;
  return httpUri;
};

export const formatCurrency = (price) => {
  let indonesianCurrency = Intl.NumberFormat('id-ID');
  let formatted = indonesianCurrency.format(price);
  return formatted;
};

export const fromatDate = (dateString) => {
  const [Y, M, D, h, m, s] = dateString.split(/[- :]/);
  const dateParsed = D + '/' + M + '/' + Y;
  return dateParsed;
};

export const fromatDateObject = (d) => {
  return d.format('YYYY-MM-DD HH:mm:ss');
};

export const formatDateString = (date) => {
  let result = date;
  const formattedDate = new Date(date);
  if (!Number.isNaN(formattedDate.getTime())) {
    result = formattedDate.toLocaleDateString('id');
  }
  return result;
};

export const formatDateTimeString = (date) => {
  let result = date;
  const formattedDate = new Date(date);
  if (!Number.isNaN(formattedDate.getTime())) {
    result = formattedDate.toLocaleString('id');
  }
  return result;
};

export const formatGender = (gender) => {
  let formattedGender = gender.replace(/\s/g, '').toLowerCase();
  if (formattedGender.includes('perempuan') || formattedGender.includes('female')) {
    formattedGender = 'Perempuan';
  } else if (formattedGender.includes('laki-laki') || formattedGender.includes('male')) {
    formattedGender = 'Laki - Laki';
  }
  return formattedGender;
};

export const getDateBeforeToday = (dayBefore) => {
  return new Date(Date.now() - dayBefore * 24 * 60 * 60 * 1000);
};

export const dateRange = (startDate, endDate, steps = 1) => {
  const dateArray = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    dateArray.push(new Date(currentDate).toLocaleDateString());
    currentDate.setUTCDate(currentDate.getUTCDate() + steps);
  }

  return dateArray;
};

export const getMonthName = (monthNumber, typeName = 'long') => {
  return new Date(monthNumber.toString()).toLocaleString('id', { month: typeName });
};
