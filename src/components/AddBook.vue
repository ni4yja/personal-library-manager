<script setup>
import { useBooksStore } from '../stores/books'
import { ref } from 'vue'
import { object, string, number } from 'yup'

const bookStore = useBooksStore()
const bookInfo = ref({
  author: '',
  title: '',
  cover: '',
  year: null
})

const errors = ref({
  author: '',
  title: '',
  year: null
})

const addBookFormSchema = object().shape({
  author: string().required(),
  title: string().required(),
  year: number()
})

const validate = (field) => {
  addBookFormSchema
    .validateAt(field, bookInfo.value)
    .then(() => {
      errors.value[field] = "";
    })
    .catch(err => {
      errors.value[field] = err.message;
    });
}

const registerBook = () => {
  addBookFormSchema
    .validate(bookInfo.value, { abortEarly: false })
    .then(() => {
      errors.value = {};
      bookStore.addNewBook(bookInfo.value)

      bookInfo.value = {
        author: '',
        title: '',
        cover: '',
        year: null
      }
    })
    .catch(err => {
      err.inner.forEach(error => {
        errors.value[error.path] = error.message;
      });
    });
}
</script>

<template>
  <div class="row u-center pb-2">
    <div class="col-10">
      <form @submit.prevent="registerBook">
        <div class="form-group">
          <div class="form-field">
            <input type="text" class="form-group-input" :class="{ 'input-error' : errors.author }" placeholder="Author"
              v-model="bookInfo.author" @blur="validate('author')" @keypress="validate('author')" />
            <p class="hint text-danger"><em>{{ errors.author }}</em></p>
          </div>
          <div class="form-field">
            <input type="text" class="form-group-input" :class="{ 'input-error' : errors.title }" placeholder="Title"
              v-model="bookInfo.title" @blur="validate('title')" @keypress="validate('title')" />
            <p class="hint text-danger"><em>{{ errors.title }}</em></p>
          </div>
          <div class="form-field">
            <input type="text" class="form-group-input" :class="{ 'input-error' : errors.year }" placeholder="Year"
              v-model="bookInfo.year" @blur="validate('year')" @keypress="validate('year')" />
            <p class="hint text-danger"><em>{{ errors.year }}</em></p>
          </div>
          <button class="form-group-btn btn-dark">Add a book</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form-group {
  align-items: baseline;
}

.form-field {
  width: 100%;
}
</style>
