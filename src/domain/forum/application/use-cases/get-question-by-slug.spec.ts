/* eslint-disable @typescript-eslint/no-unused-vars */
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase
describe('Find Question By Slug', async () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to find a question', async () => {
    const questionCreated = Question.create({
      authorId: new UniqueEntityId(),
      title: 'Any Title',
      slug: Slug.create('any-title'),
      content: 'any-content',
    })

    await inMemoryQuestionsRepository.create(questionCreated)

    const { question } = await sut.execute({
      slug: 'any-title',
    })

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual('any-title')
  })
})
