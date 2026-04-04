/**
 * Format current date and time in Indian Standard Time (IST, UTC+5:30) - Chennai timezone
 * @returns Formatted string: "DD-MMM-YYYY, HH:MM:SS IST"
 */
export function getChennaiDateTime(): string {
  const now = new Date()
  const istOptions: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }

  const formatter = new Intl.DateTimeFormat('en-IN', istOptions)
  const parts = formatter.formatToParts(now)

  const padZero = (val: string) => val.padStart(2, '0')

  let day = '01'
  let month = 'Jan'
  let year = '2026'
  let hour = '00'
  let minute = '00'
  let second = '00'

  for (const part of parts) {
    if (part.type === 'day') day = padZero(part.value)
    if (part.type === 'month') month = part.value
    if (part.type === 'year') year = part.value
    if (part.type === 'hour') hour = padZero(part.value)
    if (part.type === 'minute') minute = padZero(part.value)
    if (part.type === 'second') second = padZero(part.value)
  }

  return `${day}-${month}-${year}, ${hour}:${minute}:${second} IST`
}
