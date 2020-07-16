<template>
  <div class="container">
    <input
      class="input"
      type="text"
      v-model="name"
      placeholder="Name"
      required
    />
    <input
      class="input"
      type="email"
      v-model="email"
      placeholder="E-mail"
      required
    />
    <input
      class="input"
      type="password"
      v-model="password"
      placeholder="Password"
      required
    />
    <input
      class="input"
      type="text"
      v-model="wage"
      placeholder="Wage"
      required
    />
    <transition name="down" mode="out-in">
      <span class="error" v-show="error">{{ error }}</span>
    </transition>
    <button @click="submitForm">Sign Up</button>
    <span>Already have an account?</span>
    <span class="swap" @click="$emit('swap')">Login</span>
  </div>
</template>

<script>
import { UserService } from '@/service'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      wage: '',
      error: ''
    }
  },
  methods: {
    async submitForm() {
      const submitData = {
        name: this.name,
        email: this.email,
        password: this.password,
        wage: +this.wage
      }

      try {
        const registerRes = await UserService.register(submitData)
        const registerData = registerRes.data

        const loginRes = await UserService.login({
          email: registerData.email,
          password: registerData.password
        })
        const loginData = loginRes.data

        localStorage.setItem('user-token', loginData.data.token)
        localStorage.setItem('user-email', this.email)
        this.$router.push('/')
      } catch (error) {
        this.error = error.response.data.error
        setTimeout(() => (this.error = ''), 4000)
      }
    },
    clearForm() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.repeat_password = ''
      this.wage = ''
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 20%;
}
</style>
