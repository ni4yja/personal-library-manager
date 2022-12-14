<script setup>
import { ref } from 'vue'
import { useBooksStore } from '../stores/books'
import BookColumn from './BookColumn.vue'
import LoaderIcon from '../icons/LoaderIcon.vue'

const bookStore = useBooksStore()
const sortByYear = ref(false)
const showLoader = ref(false)

const sortWithDelay = () => {
  showLoader.value = true
  setTimeout(() => {
    sortByYear.value = !sortByYear.value
    showLoader.value = false
  }, 500)
}

const undoRemoving = () => {
  bookStore.returnBook(bookStore.deletedBook)
  bookStore.isBookDeleted = false
}
</script>

<template>
  <div class="bookshelf">
    <div class="row u-center">
      <button
        v-if="bookStore.books.length > 1"
        class="btn-link sort-button"
        @click="sortWithDelay()"
      >
        Sort by year
        <LoaderIcon v-if="showLoader" />
      </button>
    </div>
    <div v-if="sortByYear" class="row">
      <transition-group name="fade">
        <BookColumn
          v-for="book in bookStore.booksByYear"
          :key="book.id"
          :book="book"
        />
      </transition-group>
    </div>
    <div v-if="!sortByYear" class="row">
      <transition-group name="fade">
        <BookColumn
          v-for="book in bookStore.newestFirst"
          :key="book.id"
          :book="book"
        />
      </transition-group>
    </div>
    <div v-if="bookStore.isBookDeleted" class="toast">
      <p>The book was removed successfully.</p>
      <button class="btn mb-0" @click="undoRemoving()">Undo</button>
    </div>
  </div>
</template>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.06) translate(30px, 0);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.fade-leave-active {
  position: absolute;
}

@keyframes rotating {
  from {
    -webkit-transform: rotate(0deg);
  }

  to {
    -webkit-transform: rotate(360deg);
  }
}

.bookshelf .toast {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  position: sticky;
  bottom: 0.5rem;
  left: 0;
  right: 0;
  z-index: 100;
}

.sort-button {
  position: relative;
  min-width: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sort-button svg {
  position: absolute;
  right: 20px;
  animation: rotating 2s linear infinite;
}
</style>
