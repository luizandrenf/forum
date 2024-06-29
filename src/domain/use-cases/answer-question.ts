import { Answer } from "../entities/answer"

interface AnswerQuestionUseCaseRequest{
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase{
  execute({questionId, instructorId, content} : AnswerQuestionUseCaseRequest){
    const answer = new Answer({
        content,
        questionId,
        authorId: instructorId,
      })

    return answer
  }
}