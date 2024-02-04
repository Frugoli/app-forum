import { Either, right } from '@/core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { CommentsOnQuestionRepository } from '../repositories/comments-on-question-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionId: string
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentsUseCase {
  constructor(
    private commentsOnQuestionRepository: CommentsOnQuestionRepository,
  ) {}

  async execute({
    questionId,
    page,
  }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments =
      await this.commentsOnQuestionRepository.findManyByQuestionId(questionId, {
        page,
      })

    return right({
      questionComments,
    })
  }
}
