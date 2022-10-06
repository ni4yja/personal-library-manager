<script setup>
import { useBooksStore } from '../stores/books'
import { ref } from 'vue'

const bookStore = useBooksStore()
const bookInfo = ref({
  author: '',
  title: '',
  cover: '',
  year: null
})
const registerBook = () => {
  if (!bookInfo.value.author.trim() || !bookInfo.value.title.trim()) {
    return alert('Please enter an author and a title of your book')
  }
  bookStore.addNewBook(bookInfo.value)

  bookInfo.value = {
    author: '',
    title: '',
    cover: '',
    year: null
  }
}
</script>

<template>
  <div class="row u-center">
    <div class="col-10">
      <form @submit.prevent="registerBook">
        <div class="form-group">
          <input
            type="text"
            class="form-group-input"
            placeholder="Author"
            v-model="bookInfo.author"
          />
          <input
            type="text"
            class="form-group-input"
            placeholder="Title"
            v-model="bookInfo.title"
          />
          <input
            type="text"
            class="form-group-input"
            placeholder="Year"
            v-model="bookInfo.year"
          />
          <button class="form-group-btn btn-dark">Add a book</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
