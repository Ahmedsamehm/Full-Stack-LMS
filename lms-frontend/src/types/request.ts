import type { RequestType, RequestStatus } from './enums'

export interface Request {
  id: string
  type: RequestType
  courseId: string
  requestedBy: string
  status: RequestStatus
  createdAt: string
}
