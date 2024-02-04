import { Either, left, right } from '@/core/either'
import { NotAllowedError } from '@/core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { CommentsOnQuestionRepository } from '../repositories/comments-on-question-repository'

interface DeleteCommentOnQuestionUseCaseRequest {
  authorId: string
  questionCommentId: string
}

type DeleteCommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  object
>

export class DeleteCommentOnQuestionUseCase {
  constructor(
    private commentOnQuestionRepository: CommentsOnQuestionRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId,
  }: DeleteCommentOnQuestionUseCaseRequest): Promise<DeleteCommentOnQuestionUseCaseResponse> {
    const questionComment =
      await this.commentOnQuestionRepository.findById(questionCommentId)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (questionComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.commentOnQuestionRepository.delete(questionComment)

    return right({})
  }
}
