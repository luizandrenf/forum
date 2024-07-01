/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase
describe('Find Question By Slug', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to find a question', async () => {
    const questionCreated = makeQuestion({
      slug: Slug.create('any-slug'),
    })

    await inMemoryQuestionsRepository.create(questionCreated)

    const { question } = await sut.execute({
      slug: 'any-slug',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(questionCreated.title)
  })
})
