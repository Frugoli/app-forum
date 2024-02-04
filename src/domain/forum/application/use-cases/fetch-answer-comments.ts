import { Either, right } from '@/core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { commentsOnAnswerRepository } from '../repositories/comments-on-answer-repository'

interface FetchAnswerCommentsUseCaseRequest {
  answerId: string
  page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private commentsOnAnswerRepository: commentsOnAnswerRepository) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments =
      await this.commentsOnAnswerRepository.findManyByAnswerId(answerId, {
        page,
      })

    return right({
      answerComments,
    })
  }
}
