import { Notification } from '../../enterprise/entities/notification'

export interface NotificationRepository {
  create(notification: Notification): Promise<void>
  findById(id: string): Promise<Notification | null>
  persist(notification: Notification): Promise<void>
}
