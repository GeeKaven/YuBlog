import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

export function formatDate(date?: dayjs.ConfigType, template?: string) {
  return dayjs(date).format(template)
}

export function getDate(date?: dayjs.ConfigType) {
  return dayjs(date).date()
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function getMonthName(date?: dayjs.ConfigType) {
  return MONTHS[dayjs(date).month()]
}

export function getYear(date?: dayjs.ConfigType) {
  return dayjs(date).year()
}
