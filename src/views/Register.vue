<template>
  <div>
    <label>Name</label>
    <input v-model="name" required />
    <label>Email</label>
    <input type="email" v-model="email" required />
    <label>Password</label>
    <input type="password" v-model="password" required />
    <label>Confirm Password</label>
    <input type="password" v-model="repeat_password" required />
    <label>Hourly Wage</label>
    <input v-model="wage" required />
    <button @click="submitForm">Submit</button>
    <div v-show="error">{{ error }}</div>
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
      repeat_password: '',
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

<style scoped></style>
