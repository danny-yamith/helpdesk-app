import moment from 'moment'

export function stringToDate(date: any): Date {
  const res = moment(date, moment.defaultFormat)
    .utc()
    .toDate();

  return res
}