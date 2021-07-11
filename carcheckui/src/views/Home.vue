<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HomePage homemsg="Car Service History"/>
  </div>
</template>

<script>

import HomePage from '@/components/HomePage.vue'

export default {
  name: 'Home',
  components: {
    HomePage
  }
}
</script>
