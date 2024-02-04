import { makeQuestion } from 'test/factories/make-question'
import { InMemoryCommentsOnQuestionRepository } from 'test/repositories/in-memory-comments-on-question-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryCommentsOnQuestionRepository: InMemoryCommentsOnQuestionRepository
let sut: CommentOnQuestionUseCase

describe('Comment On Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    inMemoryCommentsOnQuestionRepository =
      new InMemoryCommentsOnQuestionRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryCommentsOnQuestionRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Test Comment On Question',
    })

    expect(inMemoryCommentsOnQuestionRepository.items[0].content).toEqual(
      'Test Comment On Question',
    )
  })
})
