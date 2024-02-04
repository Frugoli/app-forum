import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { makeCommentOnQuestion } from 'test/factories/make-comment-on-question'
import { InMemoryCommentsOnQuestionRepository } from 'test/repositories/in-memory-comments-on-question-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'

let inMemoryCommentsOnQuestionRepository: InMemoryCommentsOnQuestionRepository
let sut: FetchQuestionCommentsUseCase // system under testing

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryCommentsOnQuestionRepository =
      new InMemoryCommentsOnQuestionRepository()

    sut = new FetchQuestionCommentsUseCase(inMemoryCommentsOnQuestionRepository)
  })

  it('should be able to fetch recent questions comments', async () => {
    await inMemoryCommentsOnQuestionRepository.create(
      makeCommentOnQuestion({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    await inMemoryCommentsOnQuestionRepository.create(
      makeCommentOnQuestion({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    await inMemoryCommentsOnQuestionRepository.create(
      makeCommentOnQuestion({
        questionId: new UniqueEntityId('question-1'),
      }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCommentsOnQuestionRepository.create(
        makeCommentOnQuestion({
          questionId: new UniqueEntityId('question-1'),
        }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
