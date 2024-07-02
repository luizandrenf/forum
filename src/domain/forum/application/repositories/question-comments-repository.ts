import { QuestionComment } from '../../enterprise/entities/question-comment'

export interface QuestionCommentsRepository {
  findById(commentId: string): Promise<QuestionComment | null>
  delete(questionComment: QuestionComment): Promise<void>
  create(questionComment: QuestionComment): Promise<void>
}
