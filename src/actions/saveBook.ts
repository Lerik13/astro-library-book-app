import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { db, BooksTable } from 'astro:db'

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
      const bookInsert = await db.insert(BooksTable).values({
        title,
        author,
        cover,
      })
      return { success: true }
    } catch (error) {
      console.error(error)
    }
  },
})
