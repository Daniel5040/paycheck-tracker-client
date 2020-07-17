<template>
  <form @submit.prevent class="container">
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
      <span class="error" v-show="errorMessage">{{ errorMessage }}</span>
    </transition>
    <button @click="submitForm">Login</button>
    <span>Don't have an account?</span>
    <span class="swap" @click="$emit('swap')">Sign up</span>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['login', 'clearError']),
    async submitForm() {
      const user = {
        email: this.email,
        password: this.password
      }
      await this.login(user)
      if (!this.errorMessage) {
        this.clearForm()
        this.$router.push({ name: 'Home' })
      } else {
        setTimeout(() => this.clearError(), 4000)
      }
    },
    clearForm() {
      this.email = ''
      this.password = ''
    }
  },
  computed: mapGetters(['errorMessage'])
}
</script>

<style lang="scss" scoped></style>
