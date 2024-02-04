export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

/**
 * Make some property optional on type
 *
 * @example
 * static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: new Date(),
      },
      id,
    )

    return question
  }
  ```

  Quero que a data de criação seja opcional para que seja criada automaticamente
  Isso faz com que eu não seja obrigado a informar a data na hora da criação!
 **/
