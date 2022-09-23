<script setup>
import AddBook from '../components/AddBook.vue'
import BookList from '../components/BookList.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <div>
    <div class="hero bg-pink-800">
    <div class="hero-body">
      <div class="content">
        <h4 class="title headline-4 u-text-center text-white">Your Personal Library Manager</h4>
        <h5 class="subtitle u-text-center text-pink-100">
          This is a Vue 3 demo project (Composition API in action) to test the power of Pinia and VueUse libraries.
        </h5>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <AddBook />
      <BookList />
    </div>
  </div>
  <Footer />
  </div>
</template>

<style scoped>
</style>