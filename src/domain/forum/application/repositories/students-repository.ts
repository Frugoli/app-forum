/* eslint-disable semi */
// eslint-disable-next-line prettier/prettier
import { Student } from '../../enterprise/entities/student';

export abstract class QuestionsRepository {
  abstract findByEmail(email: string): Promise<Student | null>
  abstract create(student: Student): Promise<void>
}
