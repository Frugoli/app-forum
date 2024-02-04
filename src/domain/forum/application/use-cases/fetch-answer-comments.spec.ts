import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeCommentOnAnswer } from 'test/factories/make-comment-on-answer'
import { InMemoryCommentsOnAnswerRepository } from 'test/repositories/in-memory-comments-on-answer-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

let inMemoryCommentsOnAnswerRepository: InMemoryCommentsOnAnswerRepository
let sut: FetchAnswerCommentsUseCase // system under testing

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryCommentsOnAnswerRepository =
      new InMemoryCommentsOnAnswerRepository()

    sut = new FetchAnswerCommentsUseCase(inMemoryCommentsOnAnswerRepository)
  })

  it('should be able to fetch recent answers comments', async () => {
    await inMemoryCommentsOnAnswerRepository.create(
      makeCommentOnAnswer({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )

    await inMemoryCommentsOnAnswerRepository.create(
      makeCommentOnAnswer({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )

    await inMemoryCommentsOnAnswerRepository.create(
      makeCommentOnAnswer({
        answerId: new UniqueEntityId('answer-1'),
      }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCommentsOnAnswerRepository.create(
        makeCommentOnAnswer({
          answerId: new UniqueEntityId('answer-1'),
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
