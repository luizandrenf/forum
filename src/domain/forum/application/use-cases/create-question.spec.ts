/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase
describe('Create Question', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: 'any-author',
      title: 'Hello World',
      content: 'Firts steps in programming',
    })

    expect(question.content).toEqual('Firts steps in programming')
    expect(inMemoryQuestionsRepository.items[0].content).toEqual(
      'Firts steps in programming',
    )
  })
})
