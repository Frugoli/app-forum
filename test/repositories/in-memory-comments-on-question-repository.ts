import { PaginationParams } from '@/core/repositories/pagination-params'
import { CommentsOnQuestionRepository } from '@/domain/forum/application/repositories/comments-on-question-repository'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment'

export class InMemoryCommentsOnQuestionRepository
  implements CommentsOnQuestionRepository
{
  public items: QuestionComment[] = []

  async findById(id: string) {
    const commentOnQuestion = this.items.find(
      (item) => item.id.toString() === id,
    )

    if (!commentOnQuestion) {
      throw new Error('Comment on question not found')
    }

    return commentOnQuestion
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
