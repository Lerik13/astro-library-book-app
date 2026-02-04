import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { db, BooksTable, eq } from 'astro:db'

export const removeBook = defineAction({
  accept: 'json',
  input: z.object({
    id: z.number(),
  }),
  handler: async ({ id }) => {
    try {
      await db.delete(BooksTable).where(eq(BooksTable.id, id))
      return { success: true }
    } catch (error) {
      console.error(error)
      return { success: false }
    }
  },
})
