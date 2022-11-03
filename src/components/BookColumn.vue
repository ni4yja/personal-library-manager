<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBase64, useDropZone } from '@vueuse/core'
import { useBooksStore } from '../stores/books'
import DeleteBookConfirmation from './DeleteBookConfirmation.vue'
import useModal from '../helpers/modal.js'
import StarIcon from '../icons/StarIcon.vue'

const router = useRouter()

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

const { isModalOpen, openModal, closeModal } = useModal()

const openDetails = (book) => {
  router.push({ path: `/book-view/${book.slug}` })
}

const setRating = (book, star) => {
  bookStore.addRating(book, star)
}
</script>

<template>
  <div class="col-4 col-md-3 col-sm-6">
    <DeleteBookConfirmation
      :book="book"
      :isModalOpen="isModalOpen"
      @hide-modal="closeModal"
    />
    <div class="card">
      <div
        class="card__container"
        ref="dropZoneRef"
        :class="{ border: isOverDropZone }"
      >
        <img v-if="book.cover" :src="book.cover" alt="book cover" />
        <div v-if="!book.cover" class="no-cover__container">
          <p>Drag and drop an image here or click the button</p>
          <input type="file" accept="image/*" @input="onFileChange" />
        </div>
      </div>
      <div class="content pl-2 pr-2">
        <div class="u-center rating">
          <button
            v-for="star in book.rating"
            :index="star.index"
            @click="setRating(book, star)"
            :class="{ 'text-success': star.isActive }"
            class="outline btn-transparent"
          >
            <StarIcon />
          </button>
        </div>
        <p><strong>Author:</strong> {{ book.author }}</p>
        <p><strong>Title:</strong> {{ book.title }}</p>
        <p><strong>Year:</strong> {{ book.year }}</p>
        <div class="card__action-bar u-center">
          <button class="btn-link outline" @click="openDetails(book)">
            View
          </button>
          <router-link :to="`/book-edit/${book.slug}`">
            <button class="btn-link outline">Edit</button>
          </router-link>
          <button class="btn btn-link btn-danger" @click="openModal()">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.bookshelf .card {
  z-index: 1;
}

.bookshelf .card .card__container {
  background-color: #ced4d9;
  height: 21rem;
}

.bookshelf .card .card__container.border {
  border: 4px solid #5e5cc6;
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
