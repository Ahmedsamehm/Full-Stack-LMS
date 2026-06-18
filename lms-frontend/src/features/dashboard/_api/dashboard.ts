import api from '#/lib/axios'

export async function getDashboardData() {
  const { data } = await api.get('/dashboard/data')
  return data
}
