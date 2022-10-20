<script setup>
import { ref } from 'vue'
import { useBase64, useDropZone } from '@vueuse/core'
import { useBooksStore } from '../stores/books'
import DeleteModal from './DeleteBookConfirmation.vue'
import DeleteBookConfirmation from './DeleteBookConfirmation.vue';

const props = defineProps({
  book: Object
})
const bookStore = useBooksStore()

const addCover = (book, cover) => bookStore.addBookCover(book, cover)

const dropZoneRef = ref()
const file = ref()
const { base64: url } = useBase64(file)

const onDrop = (files) => {
  if (!files) return
  file.value = files[0]
  addCover(props.book, url)
}

const onFileChange = (e) => {
  file.value = e.target.files[0]
  addCover(props.book, url)
}

const { isOverDropZone } = useDropZone(dropZoneRef, onDrop)

const isModalOpen = ref(false)

const openModal = () => {
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}
</script>

<template>
  <div class="col-4 col-md-3 col-sm-6">
    <DeleteBookConfirmation :book="book" :isModalOpen="isModalOpen" @hide-modal="closeModal" />
    <div class="card">
      <div class="card__container" ref="dropZoneRef" :class="{ border: isOverDropZone }">
        <img v-if="book.cover" :src="book.cover" alt="book cover" />
        <div v-if="!book.cover" class="no-cover__container">
          <p>Drag and drop an image here or click the button</p>
          <input type="file" accept="image/*" @input="onFileChange" />
        </div>
      </div>
      <div class="content pl-2 pr-2">
        <p>Author: {{ book.author }}</p>
        <p>Title: {{ book.title }}</p>
        <p>Year: {{ book.year }}</p>
        <div class="card__action-bar u-center">
          <router-link :to="`/book-view/${book.slug}`">
            <button class="btn-link outline">View</button>
          </router-link>
          <router-link :to="`/book-edit/${book.slug}`">
            <button class="btn-link outline">Edit</button>
          </router-link>
          <a href="#confirm-delete" class="btn btn-link btn-danger" @click="openModal()">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bookshelf .card .card__container {
  background-color: #ced4d9;
  height: 21rem;
}

.bookshelf .card .card__container.border {
  border: 4px solid #99154b;
}

.bookshelf .card .card__container img {
  width: 100%;
  height: inherit;
  object-fit: cover;
}

.bookshelf .no-cover__container {
  position: absolute;
  height: 100%;
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
