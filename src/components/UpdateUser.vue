<template>
  <div>
    <div>
      <label>Name</label>
      <input v-model="name" required />
      <label>Hourly Wage</label>
      <input v-model="wage" required />
      <label>Password</label>
      <input type="password" v-model="password" required />
      <label>Confirm Password</label>
      <input type="password" v-model="repeat_password" required />
      <button @click="submitInfo">Submit</button>
      <div v-show="infoError">{{ infoError }}</div>
    </div>
    <div>
      <label>New Password</label>
      <input type="password" v-model="newPassword" required />
      <label>Confirm Password</label>
      <input type="password" v-model="repeat_newPassword" required />
      <button @click="submitPassword">Submit</button>
      <div v-show="passwordError">{{ passwordError }}</div>
    </div>
    <button @click="deleteAccount">Delete Account</button>
  </div>
</template>

<script>
import { UserService } from '@/service'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      password: '',
      repeat_password: '',
      newPassword: '',
      repeat_newPassword: '',
      wage: '',
      id: '',
      infoError: '',
      passwordError: ''
    }
  },
  methods: {
    async submitInfo() {
      const submitData = {
        name: this.name,
        password: this.password,
        wage: +this.wage
      }

      try {
        await UserService.updateInfo(
          this.id,
          submitData,
          localStorage.getItem('user-token')
        )

        this.clearForm()
      } catch (error) {
        this.infoError = error.response.data.error
        setTimeout(() => (this.infoError = ''), 4000)
      }
    },
    async submitPassword() {
      const submitData = { password: this.newPassword }

      try {
        await UserService.updatePassword(
          this.id,
          submitData,
          localStorage.getItem('user-token')
        )

        this.clearForm()
      } catch (error) {
        console.log(error.response.data.error)
        this.passwordError = error.response.data.error
        setTimeout(() => (this.passwordError = ''), 4000)
      }
    },
    async deleteAccount() {
      const isSure = confirm('Are you sure?')

      if (isSure) {
        try {
          await UserService.delete(this.id, localStorage.getItem('user-token'))

          localStorage.removeItem('user-token')
          localStorage.removeItem('user-email')
          this.$router.push('/login')
        } catch (error) {
          console.log(error.response.data.error)
        }
      }
    },
    clearForm() {
      this.password = ''
      this.repeat_password = ''
    }
  },
  async created() {
    try {
      const res = await UserService.getInfo(
        localStorage.getItem('user-email'),
        localStorage.getItem('user-token')
      )
      const data = res.data

      this.name = data.name
      this.wage = data.wage
      this.id = data.id
    } catch (error) {
      console.log(error.response.data)
    }
  }
}
</script>

<style scoped></style>
