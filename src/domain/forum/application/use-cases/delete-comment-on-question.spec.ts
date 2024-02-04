import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { makeCommentOnQuestion } from 'test/factories/make-comment-on-question'
import { InMemoryCommentsOnQuestionRepository } from 'test/repositories/in-memory-comments-on-question-repository'
import { DeleteCommentOnQuestionUseCase } from './delete-comment-on-question'

let inMemoryCommentsOnQuestionRepository: InMemoryCommentsOnQuestionRepository
let sut: DeleteCommentOnQuestionUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryCommentsOnQuestionRepository =
      new InMemoryCommentsOnQuestionRepository()

    sut = new DeleteCommentOnQuestionUseCase(
      inMemoryCommentsOnQuestionRepository,
    )
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeCommentOnQuestion()

    await inMemoryCommentsOnQuestionRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString(),
    })

    expect(inMemoryCommentsOnQuestionRepository.items).toHaveLength(0)
  })

  it('should be able to delete another user question comment', async () => {
    const questionComment = makeCommentOnQuestion({
      authorId: new UniqueEntityId('author-1'),
    })

    await inMemoryCommentsOnQuestionRepository.create(questionComment)

    const result = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
