import type { GetReportProps, GetReportResponse } from './types'

async function getReportPdf(props: GetReportProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/report/pdf/${props.initialDate}/${props.finalDate}/${props.rfid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    }
  )

  if (!response.ok) throw new Error('Erro ao gerar o relatório')

  return response.json()
}

async function getReportHttp(
  props: GetReportProps
): Promise<GetReportResponse> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/report/${props.initialDate}/${props.finalDate}/${props.rfid}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    }
  )

  if (!response.ok) throw new Error('Erro ao gerar o relatório')

  return response.json()
}

export const apiReports = {
  getReportPdf,
  getReportHttp
}
