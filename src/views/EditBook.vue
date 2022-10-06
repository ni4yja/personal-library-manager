<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBooksStore } from '../stores/books'
import Footer from '../components/Footer.vue'

const route = useRoute()
const bookStore = useBooksStore()
const book = computed(() => {
  return bookStore.books.find(book => book.slug === route.params.slug)
})

let note = ref('')

const addNote = (book, note) => {
  bookStore.addBookNote(book, note)
  note = ''
}

</script>

<template>
  <div>
    <div class="hero bg-gray-700" style="z-index: 0;">
    <img v-if="book.cover" :src="book.cover" alt="book cover" class="book-cover">
    <div class="hero-body">
      <div class="content">
        <h5 class="subtitle text-white">{{ book.author }}</h5>
        <h2 class="title text-gray-300">{{ book.title }}</h2>
        <h5 class="subtitle text-gray-300">{{ book.year }}</h5>
      </div>
    </div>
  </div>
  <div class="row u-center">
    <div class="col-8">
      <div v-if="book.note" class="content pt-6">
        <h5 class="subtitle">Note: {{ book.note }}</h5>
      </div>
      <div v-if="!book.note" class="content pt-6">
        <form @submit.prevent="addNote(book, note)">
          <textarea v-model="note"></textarea>
          <input type="submit" class="btn-primary pull-right" />
        </form>
      </div>
    </div>
  </div>
  <Footer />
  </div>
</template>

<style>
.hero {
  position: relative;
  height: 400px;
}

.book-cover {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
</style>