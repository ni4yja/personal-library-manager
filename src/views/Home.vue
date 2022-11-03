<script setup>
import { ref } from 'vue'
import AddBook from '../components/AddBook.vue'
import BookList from '../components/BookList.vue'
import Footer from '../components/Footer.vue'
import QuestionIcon from '../icons/QuestionIcon.vue'
import BooksIcon from '../icons/BooksIcon.vue'
import gsap from 'gsap'

const isInfoBtnShow = ref(false)
const main = ref()
const sidebar = ref()

const openSidebar = async () => {
  const mainWidth = main.value.clientWidth

  await gsap.to(`#main-container`, {
    width: mainWidth - 300
  })

  await gsap.fromTo(
    `#sidebar-container`,
    {
      width: 0,
      opacity: 0
    },
    {
      width: 300,
      opacity: 1
    }
  )

  isInfoBtnShow.value = true
}

const closeSidebar = async () => {
  const mainWidth = main.value.clientWidth
  const windowWidth = window.innerWidth

  gsap.fromTo(
    `#sidebar-container`,
    {
      width: 300,
      opacity: 1
    },
    {
      width: 0,
      opacity: 0
    }
  )

  await gsap.fromTo(
    `#main-container`,
    {
      width: mainWidth - 300
    },
    {
      width: windowWidth
    }
  )

  isInfoBtnShow.value = false
}
</script>

<template>
  <div class="home">
    <div id="main-container" ref="main" class="main">
      <div class="hero">
        <div class="hero-body">
          <div class="content">
            <h4 class="title headline-4 w-60p">
              Who borrowed my book this time?
            </h4>
            <h5 class="subtitle w-60p">
              In this simple personal library manager you can register your
              book, rate it and leave a comment.
            </h5>
            <div class="buttons-container">
              <div class="logo">
                <BooksIcon />
              </div>
              <div class="action-items">
                <button
                  v-if="!isInfoBtnShow"
                  @click="openSidebar()"
                  class="outline btn-transparent text-danger"
                >
                  <QuestionIcon />
                </button>
                <button
                  v-if="isInfoBtnShow"
                  @click="closeSidebar()"
                  class="outline btn-transparent text-danger"
                >
                  <QuestionIcon />
                </button>
              </div>
            </div>
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
    <div id="sidebar-container" ref="sidebar" class="sidebar">ehehe</div>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  position: relative;
  align-items: stretch;
}

.main {
  width: 100%;
  z-index: 10;
}

.hero {
  background-image: url('../assets/hero.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 100% 0;
  background-color: #ced4d8;
}

.sidebar {
  opacity: 0;
  position: absolute;
  right: 0;
  color: red;
  background: purple;
  min-height: 100vh;
  height: 100%;
  width: 300px;
  z-index: 0;
}
</style>
