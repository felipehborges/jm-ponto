import type { GetReportProps } from './types'

async function getReportPdf(props: GetReportProps) {
  const response = await fetch(
    `${process.env.BASE_URL}/report/pdf/${props.initialDate}/${props.finalDate}/${props.rfid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    }
  )

  if (!response.ok) throw new Error('Failed to fetch report')

  return response.json()
}

async function getReportHttp(props: GetReportProps) {
  const response = await fetch(
    `${process.env.BASE_URL}/report/${props.initialDate}/${props.finalDate}/${props.rfid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    }
  )

  if (!response.ok) throw new Error('Failed to fetch report')

  return response.json()
}

export const apiReports = {
  getReportPdf,
  getReportHttp
}
