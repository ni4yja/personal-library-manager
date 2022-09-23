<script setup>
import { ref } from 'vue'
import { useBooksStore } from '../stores/books'
import BookColumn from './BookColumn.vue'

const bookStore = useBooksStore()
const sortByYear = ref(false)

</script>

<template>
  <div class="bookshelf">
    <div class="row u-center">
      <button class="btn-link" @click="sortByYear = !sortByYear">Sort by year</button>
    </div>
    <div v-if="sortByYear" class="row">
      <BookColumn v-for="book in bookStore.booksByYear" :key="book.id" :book="book" />
    </div>
    <div v-else class="row">
      <BookColumn v-for="book in bookStore.books" :key="book.id" :book="book" />
    </div>
  </div>

</template>