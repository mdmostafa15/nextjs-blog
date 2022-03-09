//dependencies
import { format, parseISO } from 'date-fns'
// date fonmating
export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'LLLL d, yyyy')}</time>
}
