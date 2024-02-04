import { NotificationRepository } from '@/domain/notification/application/repositories/notification-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationRepository implements NotificationRepository {
  public items: Notification[] = []

  async create(notification: Notification) {
    this.items.push(notification)
  }

  async findById(id: string) {
    const notifications = this.items.find((item) => item.id.toString() === id)

    if (!notifications) {
      throw new Error('Resource not found')
    }

    return notifications
  }

  async persist(notification: Notification) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === notification.id,
    )

    this.items[itemIndex] = notification
  }
}
