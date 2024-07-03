/* eslint-disable @typescript-eslint/no-unused-vars */
import { FetchQuestionsAnswersUseCase } from './fetch-questions-answers'
import { makeAnswer } from 'test/factories/make-answer'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionsAnswersUseCase
describe('Fetch Question Answers', async () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionsAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    const question = makeQuestion()

    for (let i = 0; i < 3; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: question.id }),
      )
    }

    const result = await sut.execute({
      page: 1,
      questionId: question.id.toString(),
    })

    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated answers', async () => {
    const question = makeQuestion()

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswersRepository.create(
        makeAnswer({ questionId: question.id }),
      )
    }

    const result = await sut.execute({
      page: 2,
      questionId: question.id.toString(),
    })

    expect(result.value?.answers).toHaveLength(2)
  })
})
