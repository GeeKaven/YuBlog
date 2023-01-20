import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjs.extend(localizedFormat)

export function formatDate(date?: dayjs.ConfigType, template?: string) {
  return dayjs(date).format(template)
}