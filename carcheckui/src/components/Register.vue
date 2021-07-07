<template>
  <div class="hello">
    <h1>Register component </h1>
    <input type="email" name="email" v-model="email" placeholder="enter email" />
    <br><br>
    <input type="password" name="password" v-model="password" placeholder="enter password" />
    <br><br>
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async register () {
      await AuthService.register({
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
