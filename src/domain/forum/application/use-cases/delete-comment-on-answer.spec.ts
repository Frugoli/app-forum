import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeCommentOnAnswer } from 'test/factories/make-comment-on-answer'
import { InMemoryCommentsOnAnswerRepository } from 'test/repositories/in-memory-comments-on-answer-repository'
import { DeleteCommentOnAnswerUseCase } from './delete-comment-on-answer'

let inMemoryCommentsOnAnswerRepository: InMemoryCommentsOnAnswerRepository
let sut: DeleteCommentOnAnswerUseCase

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryCommentsOnAnswerRepository =
      new InMemoryCommentsOnAnswerRepository()

    sut = new DeleteCommentOnAnswerUseCase(inMemoryCommentsOnAnswerRepository)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeCommentOnAnswer()

    await inMemoryCommentsOnAnswerRepository.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString(),
    })

    expect(inMemoryCommentsOnAnswerRepository.items).toHaveLength(0)
  })

  it('should be able to delete another user answer comment', async () => {
    const answerComment = makeCommentOnAnswer({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryCommentsOnAnswerRepository.create(answerComment)

    const result = await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
