<template>
  <div>
    <label>Email</label>
    <input type="email" v-model="email" required />
    <label>Password</label>
    <input type="password" v-model="password" required />
    <button @click="submitForm">Submit</button>
    <div v-show="error">{{ error }}</div>
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

<style scoped></style>
