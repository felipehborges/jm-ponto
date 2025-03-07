import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import type { CreateDayOffProps, GetDaysOffResponse } from './types'

export async function GET() {
  const daysOff = await prisma.holiday.findMany();
  console.log(daysOff)
  return NextResponse.json({ result: daysOff });
}

export async function getDaysOff() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/daysoff`, {
    method: 'GET',
    cache: 'no-store'
  });
  console.log(response)
  if (!response.ok) throw new Error('Falha ao buscar dias de folga');
  return response.json();
}


async function createDayOff(dayOffProps: CreateDayOffProps) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/daysoff/create`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dayOffProps)
    }
  )

  if (!response.ok) throw new Error('Falha ao criar dia de folga')

  return response.json()
}

async function deleteDayOff(dayOffId: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/daysoff/delete/${dayOffId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) throw new Error('Falha ao deletar dia de folga')

  return response.json()
}

export const apiDaysOff = {
  getDaysOff,
  createDayOff,
  deleteDayOff
}
