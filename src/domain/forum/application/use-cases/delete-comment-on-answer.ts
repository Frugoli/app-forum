import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { commentsOnAnswerRepository } from '../repositories/comments-on-answer-repository'

interface DeleteCommentOnAnswerUseCaseRequest {
  authorId: string
  answerCommentId: string
}

type DeleteCommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteCommentOnAnswerUseCase {
  constructor(private commentOnAnswerRepository: commentsOnAnswerRepository) {}

  async execute({
    authorId,
    answerCommentId,
  }: DeleteCommentOnAnswerUseCaseRequest): Promise<DeleteCommentOnAnswerUseCaseResponse> {
    const answerComment =
      await this.commentOnAnswerRepository.findById(answerCommentId)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.commentOnAnswerRepository.delete(answerComment)

    return right(null)
  }
}
