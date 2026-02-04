import { useState } from 'react'
import { Button } from '../ui/button'
import SearchBooks from './SearchBooks'
import type { ProcessedBook } from '@/types/book'

type BooksClientProps = {
  books: ProcessedBook[]
}

export default function BooksClient({ books }: BooksClientProps) {
  const [list, setList] = useState<ProcessedBook[]>(books)

  return (
    <>
      <SearchBooks
        onBookAdded={(newBook) => setList((prev) => [newBook, ...prev])}
      />

      <div className='grid gap-4'>
        <h2 className='text-2xl font-bold'>My Books</h2>

        <div className='grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4'>
          {list.map((book) => (
            <div
              key={book.id}
              className='relative grid gap-2 border rounded-md p-4 shadow-md hover:shadow-lg focus-within:shadow-lg hover:scale-105 focus-within:scale-105 transition-all'
            >
              {book.cover?.url && (
                <img src={book.cover?.url} alt={book.title} />
              )}
              <h2>{book.title}</h2>
              <p>{book.author}</p>

              <a
                href={`/book/${book.id}`}
                aria-label='View Book'
                className='absolute inset-0'
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
