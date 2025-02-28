import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// // 2099-12-31T10:00:00.000Z -> 31/12/2099
// export function formatDate(dateString: string): string {
//   const date = new Date(dateString);
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0");
//   const day = String(date.getDate()).padStart(2, "0");
//   return `${day}/${month}/${year}`;
// }

// 2099-12-31T10:00:00.000Z -> 31/12
export function formatDayMonth(dateString: string): string {
  const date = new Date(dateString)
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${day}/${month}`
}

const currentDate = new Date()
export const today = currentDate.toLocaleString('pt-BR', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
})

// 2099-12-31T10:00:00.000Z -> 31/12/2099
export function convertISOToFormattedDate(isoDateString: string): string {
  const date = new Date(isoDateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${day}/${month}/${year}`
}

// 2099-12-31T10:00:00.000Z -> 00:00
export function convertISOToFormattedTime(dateString: string): string {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }
  const hours = String(date.getHours() + 3).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${hours}:${minutes}`
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function formatSeconds(seconds: any) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const sec = seconds % 60
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}
