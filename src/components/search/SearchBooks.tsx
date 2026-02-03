import React, { useState } from 'react'
import { actions } from 'astro:actions'
import type { ProcessedBook } from '@/types/book'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

function SearchBooks() {
  const [query, setQuery] = useState('')
  const [books, setBooks] = useState<ProcessedBook[]>([])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { error, data } = await actions.searchBooks({ q: query })

    if (error) {
      console.error(error)
      alert('Error searching for books')
    }
    if (data) {
      setBooks(data as unknown as ProcessedBook[])
      console.log(data)
    }
  }

  return (
    <>
      <form className='grid gap-2 max-w-lg' onSubmit={handleSubmit}>
        <Input
          type='search'
          name='q'
          placeholder='Search for a book'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button type='submit'>Search</Button>
      </form>
      <div className='grid grid-cols-4 gap-4'>
        {books.map((book) => (
          <div key={book.id} className='grid gap-2'>
            <h2>{book.title}</h2>
            <p>{book.author}</p>
            {book.cover.url ? (
              <img
                src={book.cover.url}
                alt={book.title}
                width={book.cover.width}
                height={book.cover.height}
                className='h-60'
              />
            ) : (
              <div className='h-60 bg-gray-200'></div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchBooks
