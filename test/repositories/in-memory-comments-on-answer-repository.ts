import { PaginationParams } from '@/core/repositories/pagination-params'
import { commentsOnAnswerRepository } from '@/domain/forum/application/repositories/comments-on-answer-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryCommentsOnAnswerRepository
  implements commentsOnAnswerRepository
{
  public items: AnswerComment[] = []

  async findById(id: string) {
    const answerComment = this.items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      throw new Error('Answer comment not found')
    }

    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answers = this.items
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answerComment: AnswerComment) {
    this.items.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.items.splice(itemIndex, 1)
  }
}
