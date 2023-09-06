/**
 * 
 * @param template - '{$1}-{$2}-{$3}'
 * @param parts - [year, month, day]
 * @returns - 'year-month-day'
 */
export default function format(template: string, parts: any[]): string {
  return parts.reduce((acc, part, index) => {
    return String(acc).replace(`{$${index + 1}}`, `${part}`)
  }, template)
}