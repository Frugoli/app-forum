import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notification-repository'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Send a Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()

    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('should be able to create a new notification', async () => {
    const notification = await sut.execute({
      recipientId: 'recipient-1',
      title: 'Notificação',
      content: 'Teste de notificação',
    })

    expect(notification.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items).toHaveLength(1)
    expect(inMemoryNotificationRepository.items).toEqual([
      expect.objectContaining({ title: 'Notificação' }),
    ])
  })
})
