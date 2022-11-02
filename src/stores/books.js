import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { v4 as uuid } from 'uuid'

export const useBooksStore = defineStore({
  id: 'main',
  state: () => ({
    books: useStorage('bookList', []),
    isBookDeleted: false,
    deletedBook: {}
  }),
  actions: {
    addNewBook(book) {
      this.books = [
        ...this.books,
        {
          ...book,
          id: uuid(),
          slug: book.title.toLowerCase().replace(/\s/g, '-'),
          time: new Date().getTime(),
          rating: [
            {
              isActive: false,
              index: 0
            },
            {
              isActive: false,
              index: 1
            },
            {
              isActive: false,
              index: 2
            },
            {
              isActive: false,
              index: 3
            },
            {
              isActive: false,
              index: 4
            }
          ]
        }
      ]
    },
    addBookCover(book, url) {
      this.books = this.books.map((selectedBook) => {
        if (selectedBook.id === book.id) {
          return { ...selectedBook, cover: url }
        }
        return selectedBook
      })
      return this.books
    },
    addBookNote(book, note) {
      this.books = this.books.map((selectedBook) => {
        if (selectedBook.id === book.id) {
          return { ...selectedBook, note: note }
        }
        return selectedBook
      })
      return this.books
    },
    addRating(book, star) {
      this.books = this.books.map((selectedBook) => {
        let updatedRating
        if (selectedBook.id === book.id) {
          updatedRating = selectedBook.rating.map((bookStar) => {
            bookStar.isActive = bookStar.index <= star.index
            return bookStar
          })
          return { ...selectedBook, rating: updatedRating }
        }
        return selectedBook
      })
      return this.books
    },
    deleteBook(id) {
      this.books = this.books.filter((book) => book.id !== id)
    },
    returnBook(book) {
      this.books = [
        ...this.books,
        {
          ...book
        }
      ]
    }
  },
  getters: {
    booksByYear(state) {
      const sortable = [...state.books]
      return sortable.sort((a, b) => b.year - a.year)
    },
    newestFirst(state) {
      const sortable = [...state.books]
      return sortable.sort((a, b) => b.time - a.time)
    }
  }
})
