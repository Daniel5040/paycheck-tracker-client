<template>
  <div class="container">
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
    <transition name="down" mode="out-in">
      <span class="error" v-show="error">{{ error }}</span>
    </transition>
    <button @click="submitForm">Login</button>
    <span>Don't have an account?</span>
    <span class="swap" @click="$emit('swap')">Sign up</span>
  </div>
</template>

<script>
import { UserService } from '@/service'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async submitForm() {
      const submitData = {
        email: this.email,
        password: this.password
      }

      try {
        const res = await UserService.login(submitData)
        const data = res.data

        localStorage.setItem('user-token', data.data.token)
        localStorage.setItem('user-email', this.email)
        this.clearForm()
        this.$router.push('/')
      } catch (error) {
        this.error = error.response.data.error
        setTimeout(() => (this.error = ''), 4000)
      }
    },
    clearForm() {
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style lang="scss" scoped></style>
