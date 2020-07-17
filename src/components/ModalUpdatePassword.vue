<template>
  <form @submit.prevent class="container-modal">
    <h2>Change Password</h2>
    <input
      class="input"
      type="password"
      v-model="password"
      placeholder="New Password"
      required
    />
    <input
      class="input"
      type="password"
      v-model="repeatPassword"
      placeholder="Confirm Password"
      required
    />
    <transition name="down" mode="out-in">
      <span class="error" v-show="error">{{ error }}</span>
    </transition>
    <transition name="down" mode="out-in">
      <span class="error" v-show="errorMessage">{{ errorMessage }}</span>
    </transition>
    <button @click="submitForm">Change Password</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ModalUpdatePassword',
  props: ['id'],
  data() {
    return {
      password: '',
      repeatPassword: '',
      error: ''
    }
  },
  methods: {
    ...mapActions(['updatePassword']),
    submitForm() {
      if (this.password === this.repeatPassword) {
        this.updatePassword({ id: this.id, password: this.password })
        this.$emit('closeModal')
      }
    }
  },
  watch: {
    repeatPassword() {
      if (this.repeatPassword !== this.password)
        this.error = 'Passwords do not match'
      else this.error = ''
      setTimeout(() => (this.error = ''), 4000)
    }
  },
  computed: mapGetters(['errorMessage'])
}
</script>

<style lang="scss" scoped></style>
