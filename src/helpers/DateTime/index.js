import _ from 'lodash';

export function isValidDate(date) {
  if (!date) {
    return false;
  }

  let testedDate = date;
  if (!_.isDate(date)) {
    testedDate = new Date(date);
  }
  if (_.isNaN(testedDate.valueOf())) {
    return false;
  }
  return true;
}

export function getTimeFromDate(date) {
  if (!_.isDate(date)) {
    throw new Error('date must be an instance of Date');
  }

  const hours = `0${date.getHours()}`.substr(-2);
  const mins = `0${date.getMinutes()}`.substr(-2);
  return `${hours}:${mins}`;
}
