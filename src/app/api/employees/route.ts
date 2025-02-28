import type {
  CreateEmployeeProps,
  GetEmployeeByIdResponse,
  GetEmployeesResponse
} from '@/app/api/employees/types'

async function getEmployees(): Promise<GetEmployeesResponse> {
  const response = await fetch(`${process.env.BASE_URL}/employee/list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-store'
  })

  if (!response.ok) throw new Error('Falha ao buscar os funcionários')

  return response.json()
}

async function getEmployeeById(
  employeeId: string
): Promise<GetEmployeeByIdResponse> {
  const response = await fetch(
    `${process.env.BASE_URL}/employee/${employeeId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    }
  )

  if (!response.ok) throw new Error('Falha ao buscar o funcionário')

  return response.json()
}

async function createEmployee(newEmployee: CreateEmployeeProps) {
  const response = await fetch(`${process.env.BASE_URL}/employee/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEmployee)
  })

  if (!response.ok) throw new Error('Falha ao criar o funcionário')

  return response.json()
}

async function deleteEmployee(employeeId: string) {
  const response = await fetch(
    `${process.env.BASE_URL}/employee/delete/${employeeId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  if (!response.ok) throw new Error('Falha ao remover o funcionário')

  return response.json()
}

export const apiEmployees = {
  getEmployees,
  getEmployeeById,
  createEmployee,
  deleteEmployee
}
