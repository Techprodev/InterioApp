<template>
  <div class="hello">
    <h1>Login component </h1>
    <input type="email" name="email" v-model="email" placeholder="enter email" />
    <br><br>
    <input type="password" name="password" v-model="password" placeholder="enter password" />
    <br><br>
    <div class="error" v-html="error"></div>
    <button @click="login">Login</button>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        await AuthService.login({
          email: this.email,
          password: this.password
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
.error {
  color: red;
}
</style>
