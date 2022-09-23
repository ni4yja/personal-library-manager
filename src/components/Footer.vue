<script setup>
import MediumIcon from './MediumIcon.vue'
import GithubIcon from './GithubIcon.vue'
import TwitterIcon from './TwitterIcon.vue'
</script>

<template>
<footer class="footer">
    <h6 class="footer__title text-white uppercase">Follow me</h6>
    <div class="content">
      <div class="divider"></div>
      <div class="row u-center">
        <div class="col-4">
          <ul class="no-bullets u-center">
            <a href="https://ni4yja.medium.com/">
              <li class="footer__list-item u-center px-3"><MediumIcon /></li>
            </a>
            <a href="https://github.com/ni4yja" class="text-white">
              <li class="footer__list-item u-center px-3"><GithubIcon /></li>
            </a>
            <a href="https://twitter.com/ni4yja" class="text-white">
              <li class="footer__list-item u-center px-3"><TwitterIcon /></li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>