import { useAuth } from 'authentication';
import { STREAM_URL } from 'authentication/auth-provider/config';
import moment from 'moment';

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
  let formatted = indonesianCurrency?.format(price);
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
    result = moment(formattedDate).locale('id').startOf('hour').fromNow().replace(' yang ', ' ');
  }
  return result;
};

export const formatRoles = (roles) => {
  const result = roles
    .map((role) => {
      switch (role) {
        case 'ROLE_USER':
          return 'Basic';
        case 'ROLE_PREMIUM':
          return 'Premium';
        default:
          return role;
      }
    })
    .join(', ');
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

export const formatNumber = (number) => {
  const unitlist = ['', 'K+', 'M+', 'G+', 'T+', 'P+', 'E+'];
  let sign = Math.sign(number);
  let unit = 0;

  while (Math.abs(number) > 1000) {
    unit = unit + 1;
    number = Math.floor(Math.abs(number) / 100) / 10;
  }

  return `${sign * Math.abs(number)}${unitlist[unit] || ''}`;
};

export const formatPostType = (postType) => {
  switch (postType) {
    case 'pict':
      return 'HyppePict';
    case 'vid':
      return 'HyppeVid';
    case 'diary':
      return 'HyppeDiary';
    case 'story':
      return 'HyppeStory';
    default:
      return postType;
  }
};

export const maskCharacterExceptLastN = (str, mask, n = 1) => {
  return [...str].reduce((acc, curr, index) => (index < str.length - n ? acc + mask : acc + curr), '');
};

export const capitalizeWord = (word) => {
  return word.toLowerCase().replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
};

export const capitalizeEachWord = (string) => {
  return string
    .split(' ')
    .filter((word) => word)
    .map((word) => capitalizeWord(word))
    .join(' ');
};
