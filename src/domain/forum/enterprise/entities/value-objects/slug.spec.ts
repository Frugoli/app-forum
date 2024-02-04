import { Slug } from './slug'

it('should be able to create a new slug from text', () => {
  const slug = Slug.createFromText('Exemplo de pergunta e algum texto')

  expect(slug.value).toEqual('exemplo-de-pergunta-e-algum-texto')
})
