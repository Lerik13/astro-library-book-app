import { z } from 'astro/zod'
import { defineAction } from 'astro:actions'
import type { BookResponse, CoverResponse } from '@/types/book'

export const searchBooks = defineAction({
  accept: 'json',
  input: z.object({
    q: z.string().min(3).max(30),
  }),
  handler: async ({ q }) => {
    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(q)}&limit=10`
      )

      if (!res.ok) {
        throw new Error('Failed to fetch books')
      }

      const data = (await res.json()) as BookResponse
      const books = []
      for (const book of data.docs) {
        const coverRes = await fetch(
          `https://covers.openlibrary.org/b/id/${book.cover_i}.json`
        )
        const imgData = {
          source_url: null,
          width: 0,
          height: 0,
        } as CoverResponse
        if (coverRes.ok) {
          const coverData = (await coverRes.json()) as CoverResponse
          imgData.source_url = coverData.source_url
          imgData.width = coverData.width
          imgData.height = coverData.height
        }

        books.push({
          title: book.title,
          author:
            typeof book.author_name === 'string'
              ? book.author_name
              : book.author_name.join(', '),
          cover: {
            url: imgData.source_url,
            width: imgData.width,
            height: imgData.height,
          },
          id: book.key,
        })
      }
      return books
    } catch (error) {
      console.error(error)
    }
  },
})
