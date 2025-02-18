const getAttendances = async () => {
  const response = await API.get<GetAttendancesResponse>('/attendances/list')
  return response.data
}

const getAttendancesByEmployeeId = async (employeeId: string) => {
  const response = await API.get<GetAttendancesByEmployeeIdResponse>(
    `/attendances/employee/${employeeId}`
  )
  return response.data
}

const deleteAttendance = async (attendanceId: string) =>
  await API.delete(`/attendances/${attendanceId}`)