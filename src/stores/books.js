import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { v4 as uuid } from 'uuid'

export const useBooksStore = defineStore({
  id: 'main',
  state: () => ({
    books: useStorage('bookList', [])
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
        }
      ];
    },
    addBookCover(book, url) {
      this.books = this.books.map(object => {
        if (object.id === book.id) {

          return {...object, cover: url };
        }
        return object;
      });
      return this.books;
    },
    addBookNote(book, note) {
      this.books = this.books.map(object => {
        if (object.id === book.id) {

          return {...object, note: note };
        }
        return object;
      });
      return this.books;
    },
    deleteBook(id) {
      this.books = this.books.filter(book => book.id !== id)
    }
  },
  getters: {
    booksByYear(state) {
      const sortable = [...state.books]
      return sortable.sort((a, b) => {
        return a.year.localeCompare(b.year)
      })
    },
    newestFirst(state) {
      const sortable = [...state.books]
      return sortable.sort((a, b) => b.time - a.time);
    }
  },
})