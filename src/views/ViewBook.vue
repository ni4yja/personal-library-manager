<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useBooksStore } from '../stores/books'
import Footer from '../components/Footer.vue'
import AddNoteIcon from '../icons/AddNoteIcon.vue'
import TrashIcon from '../icons/TrashIcon.vue'
import BooksIcon from '../icons/BooksIcon.vue'
import useModal from '../helpers/modal.js'
import DeleteBookConfirmation from '../components/DeleteBookConfirmation.vue'
import StarIcon from '../icons/StarIcon.vue'

const route = useRoute()
const bookStore = useBooksStore()
const book = computed(() => {
  return bookStore.books.find((book) => book.slug === route.params.slug)
})

const { isModalOpen, openModal, closeModal } = useModal()
</script>

<template>
  <div>
    <div class="hero bg-gray-700" style="z-index: 0">
      <img
        v-if="book?.cover"
        :src="book?.cover"
        alt="book cover"
        class="book-cover"
      />
      <div class="hero-body">
        <div class="content">
          <h5 class="subtitle text-white">{{ book?.author }}</h5>
          <h2 class="title text-gray-300">{{ book?.title }}</h2>
          <h5 class="subtitle text-gray-300">{{ book?.year }}</h5>
          <div class="rating u-flex">
            <StarIcon
              v-for="star in book?.rating"
              :index="star.index"
              :class="{ 'text-success': star.isActive }"
            />
          </div>
          <div class="buttons-container">
            <div class="logo">
              <router-link :to="'/'">
                <button class="outline btn-transparent text-light">
                  <BooksIcon />
                </button>
              </router-link>
            </div>
            <div class="action-items">
              <router-link :to="`/book-edit/${book?.slug}`">
                <button class="outline btn-transparent text-success">
                  <AddNoteIcon />
                </button>
              </router-link>
              <a
                href="#confirm-delete"
                class="outline btn-transparent text-danger delete"
                @click="openModal()"
              >
                <TrashIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row u-center">
      <div class="col-8">
        <div v-if="!book?.note" class="pt-4">
          <p class="text-xl">
            <em
              >Books can be easily lost. You can borrow one to a friend for a
              few days, and then it simply disappears. You can easily remember
              the name of the book, but not your friend's name. Leave a small
              note here, and this unpleasant situation will not happen in the
              future. Or not. Just give it a try.</em
            >
          </p>
          <router-link :to="`/book-edit/${book?.slug}`">
            <button class="btn-link outline">Add a note</button>
          </router-link>
        </div>
        <div v-if="book?.note" class="content pt-6">
          <h5 class="subtitle">Note: {{ book?.note }}</h5>
        </div>
      </div>
    </div>
    <Footer />
    <DeleteBookConfirmation
      :book="book"
      :isModalOpen="isModalOpen"
      @hide-modal="closeModal"
    />
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

.buttons-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  display: flex;
  justify-content: space-between;
}

.action-items {
  display: flex;
}

.action-items .delete {
  padding: 0.7rem;
}
</style>
