export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNextPage: boolean
}

export interface PaginationParams {
  page?: number
  limit?: number
}

export interface ApiResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  success: boolean
  statusCode: number
  message: string
  data: T[]
  meta: PaginationMeta
}
