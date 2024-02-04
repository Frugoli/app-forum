import { makeAnswer } from 'test/factories/make-answer'
import { InMemoryAnswerAttachmentsRepository } from 'test/repositories/in-memory-answer-attachments-repository'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryCommentsOnAnswerRepository } from 'test/repositories/in-memory-comments-on-answer-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryCommentsOnAnswerRepository: InMemoryCommentsOnAnswerRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: CommentOnAnswerUseCase

describe('Comment On Answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    inMemoryCommentsOnAnswerRepository =
      new InMemoryCommentsOnAnswerRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryCommentsOnAnswerRepository,
    )
  })

  it('should be able to comment an answer', async () => {
    const answer = makeAnswer()

    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'New Comment On Answer',
    })

    expect(inMemoryCommentsOnAnswerRepository.items[0].content).toEqual(
      'New Comment On Answer',
    )
  })
})
