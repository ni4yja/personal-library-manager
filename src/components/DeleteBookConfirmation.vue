<script setup>
import { useBooksStore } from '../stores/books'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  isModalOpen: Boolean,
  book: Object
})

const emit = defineEmits(['hideModal'])

const closeModal = () => {
  emit('hideModal')
}

const bookStore = useBooksStore()

const removeBook = (book) => {
  if (router.currentRoute.value.name !== 'Home') {
    bookStore.deleteBook(book.id)
    router.push({ name: 'Home' })
  }
  bookStore.deleteBook(book.id)
  bookStore.isBookDeleted = true
  bookStore.deletedBook = book
  setTimeout(() => {
    bookStore.isBookDeleted = false
  }, 5000)
}
</script>

<template>
  <div
    v-if="isModalOpen"
    class="modal"
    :class="{ 'modal--visible shown': isModalOpen }"
  >
    <a
      class="modal-overlay close-btn"
      aria-label="Close"
      @click="closeModal()"
    ></a>
    <div class="modal-content">
      <div class="modal-header">
        <a
          class="u-pull-right close-btn mb-0"
          aria-label="Close"
          @click="closeModal()"
        >
          <span class="icon">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="times"
              class="svg-inline--fa fa-times fa-w-11 fa-wrapper"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
            >
              <path
                fill="currentColor"
                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
              ></path>
            </svg>
          </span>
        </a>
      </div>
      <div class="modal-body">Are you sure you want to delete this book?</div>
      <div class="modal-footer">
        <button @click="closeModal()" class="btn-link btn-success mr-4">
          Keep it in my library
        </button>
        <button @click="removeBook(book)" class="btn-link btn-danger">
          Remove it
        </button>
      </div>
    </div>
  </div>
</template>
