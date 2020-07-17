<template>
  <form @submit.prevent class="container-modal">
    <h2 class="title">Delete Account</h2>
    <span class="text">Are you sure?</span>
    <span class="text">There is no coming back from this.</span>
    <input
      class="input"
      type="text"
      v-model="email"
      placeholder="Type your E-mail"
      required
    />
    <transition name="down" mode="out-in">
      <span class="error" v-show="error">{{ error }}</span>
    </transition>
    <transition name="down" mode="out-in">
      <span class="error" v-show="errorMessage">{{ errorMessage }}</span>
    </transition>
    <button @click="submitForm">Delete Account</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ModalDeleteAccount',
  props: ['id'],
  data() {
    return {
      email: '',
      error: ''
    }
  },
  methods: {
    ...mapActions(['deleteAccount']),
    submitForm() {
      if (this.email === localStorage.getItem('email')) {
        this.deleteAccount(this.id)
        this.$emit('closeModal')
      } else {
        this.error = 'Incorrect email'
        setTimeout(() => (this.error = ''), 4000)
      }
    }
  },
  computed: mapGetters(['errorMessage'])
}
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 10px;
}

.text {
  font-size: 14px;
}
</style>
