<template>
  <form @submit.prevent class="container">
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
      <span class="error" v-show="errorMessage">{{ errorMessage }}</span>
    </transition>
    <button @click="submitForm">Sign Up</button>
    <span>Already have an account?</span>
    <span class="swap" @click="$emit('swap')">Login</span>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      wage: ''
    }
  },
  methods: {
    ...mapActions(['register', 'clearError', 'getUserInfo']),
    async submitForm() {
      const user = {
        name: this.name,
        email: this.email,
        password: this.password,
        wage: this.wage ? +this.wage : null
      }
      await this.register(user)
      if (!this.errorMessage) {
        this.clearForm()
        this.getUserInfo(user.email)
        this.$router.push({ name: 'Home' })
      } else {
        setTimeout(() => this.clearError(), 4000)
      }
    },
    clearForm() {
      this.name = ''
      this.email = ''
      this.password = ''
      this.repeat_password = ''
      this.wage = ''
    }
  },
  computed: mapGetters(['errorMessage'])
}
</script>

<style scoped></style>
