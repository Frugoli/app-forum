import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const answers = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return answers
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachement = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )

    this.items = questionAttachement
  }
}
