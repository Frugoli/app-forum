import { Either, left, right } from '@/core/either'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersRepository } from '../repositories/answers-repository'
import { commentsOnAnswerRepository } from '../repositories/comments-on-answer-repository'

interface CommentOnAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    commentAnswer: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private commentOnAnswerRepository: commentsOnAnswerRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const commentAnswer = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })

    await this.commentOnAnswerRepository.create(commentAnswer)

    return right({
      commentAnswer,
    })
  }
}
