import { defineAction } from 'astro:actions'
import { BooksTable, db } from 'astro:db'
import { z } from 'astro:schema'

export const saveBook = defineAction({
  accept: 'json',
  input: z.object({
    title: z.string(),
    author: z.string(),
    cover: z.object({
      url: z.string().nullable(),
      width: z.number(),
      height: z.number(),
    }),
  }),
  handler: async ({ title, author, cover }) => {
    try {
      const [insertedBook] = await db
        .insert(BooksTable)
        .values({
          title,
          author,
          cover,
        })
        .returning()

      return insertedBook
    } catch (error) {
      console.error(error)
    }
  },
})
