<template>
  <form @submit.prevent class="container-modal">
    <h2>Update Information</h2>
    <input
      class="input"
      type="text"
      v-model="user.name"
      placeholder="Name"
      required
    />
    <input
      class="input"
      type="text"
      v-model="user.wage"
      placeholder="Wage"
      required
    />
    <input
      class="input"
      type="password"
      v-model="password"
      placeholder="Password"
    />
    <transition name="down" mode="out-in">
      <span class="error" v-show="error">{{ error }}</span>
    </transition>
    <transition name="down" mode="out-in">
      <span class="error" v-show="errorMessage">{{ errorMessage }}</span>
    </transition>
    <button @click="submitForm">Update Info</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ModalUpdateInfo',
  data() {
    return {
      user: {},
      password: '',
      error: ''
    }
  },
  methods: {
    ...mapActions(['updateInfo']),
    submitForm() {
      if (this.password.length > 3) {
        const data = {
          name: this.user.name,
          wage: this.user.wage,
          password: this.password
        }
        this.updateInfo({ id: this.user.id, data })
        this.$emit('closeModal')
      } else {
        this.error = 'Password required'
        setTimeout(() => (this.error = ''), 4000)
      }
    }
  },
  computed: mapGetters(['errorMessage', 'userInfo']),
  beforeMount() {
    this.user = this.userInfo
  }
}
</script>

<style lang="scss" scoped></style>
