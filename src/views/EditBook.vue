<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBooksStore } from '../stores/books'
import Footer from '../components/Footer.vue'
import EditorJS from '@editorjs/editorjs'
import TrashIcon from '../icons/TrashIcon.vue'
import BooksIcon from '../icons/BooksIcon.vue'
import useModal from '../helpers/modal.js'
import DeleteBookConfirmation from '../components/DeleteBookConfirmation.vue'

const route = useRoute()
const bookStore = useBooksStore()
const book = computed(() => {
  return bookStore.books.find((book) => book.slug === route.params.slug)
})

const editor = new EditorJS({
  holder: 'editorjs',
  placeholder: 'Let`s write an awesome story!'
})

const saveNote = (book) =>
  editor
    .save()
    .then((outputData) => {
      let noteArr = []
      return outputData?.blocks.forEach((item) => {
        noteArr.push(item.data.text)
        console.log('Article data: ', noteArr)
        bookStore.addBookNote(book, noteArr.join(' '))
      })
    })
    .catch((error) => {
      console.log('Saving failed: ', error)
    })

const { isModalOpen, openModal, closeModal } = useModal()
</script>

<template>
  <div>
    <div class="hero bg-gray-700" style="z-index: 0">
      <img v-if="book?.cover" :src="book?.cover" alt="book cover" class="book-cover" />
      <div class="hero-body">
        <div class="content">
          <h5 class="subtitle text-white">{{ book?.author }}</h5>
          <h2 class="title text-gray-300">{{ book?.title }}</h2>
          <h5 class="subtitle text-gray-300">{{ book?.year }}</h5>
          <div class="buttons-container">
            <div class="logo">
              <router-link :to="'/'">
                <button class="outline btn-transparent text-light">
                  <BooksIcon />
                </button>
              </router-link>
            </div>
            <div class="action-items">
              <a href="#confirm-delete" class="outline btn-transparent text-danger delete" @click="openModal()">
                <TrashIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="book?.note" class="row u-center">
      <div class="col-8">
        <div class="content pt-6">
          <h5 class="subtitle">Note: {{ book?.note }}</h5>
        </div>
      </div>
    </div>
    <div class="row u-center">
      <div class="col-8">
        <div id="editorjs"></div>
        <button @click="saveNote(book)" class="btn-success">Save</button>
      </div>
    </div>
    <Footer />
    <DeleteBookConfirmation :book="book" :isModalOpen="isModalOpen" @hide-modal="closeModal" />
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
