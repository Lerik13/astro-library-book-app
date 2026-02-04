import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { db, BooksTable, eq } from 'astro:db'

export const getMyBooks = defineAction({
  handler: async () => {
    try {
      return await db.select().from(BooksTable)
    } catch (error) {
      console.error(error)
      return { success: false }
    }
  },
})
