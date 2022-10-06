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
      <transition-group name="fade">
        <BookColumn v-for="book in bookStore.newestFirst" :key="book.id" :book="book" />
      </transition-group>
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
</style>