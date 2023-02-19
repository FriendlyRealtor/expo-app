import moment from 'moment';

let monthLabel = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const date = new Date();
date.getTime() / 1000;

export const setMonthLabel = (obj = []) => {
  monthLabel = obj;
};

export const getMonthLabel = index => {
  return monthLabel[index - 1];
};

export const getMonthLabels = () => monthLabel;

export const timeFormat = timeStamp => {
  if (moment(timeStamp).isValid()) {
    if (moment().diff(moment.unix(timeStamp), 'days') === 0) {
      return moment.unix(timeStamp, ['hh:mm']).format('h:mm a'); // 3:20 pm
    } else if (moment().diff(moment.unix(timeStamp), 'days') < 7) {
      return moment.unix(timeStamp).format('ddd'); // Tue, Wed etc
    } else {
      return moment.unix(timeStamp).format('D MMM'); // 20 Jan
    }
  }
  return ' ';
};

export const getUnixTimeStamp = () => {
  return moment().unix();
};
