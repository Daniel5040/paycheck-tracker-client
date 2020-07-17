<template>
  <div class="container-modal">
    <h2>Delete Account</h2>
    <span class="text">Are you sure?</span>
    <span class="text">There is no coming back from this</span>
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
    <button @click="submitForm">Delete Account</button>
  </div>
</template>

<script>
export default {
  name: 'ModalDeleteAccount',
  data() {
    return {
      email: '',
      error: ''
    }
  },
  methods: {
    submitForm() {
      console.log('delete account')
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-modal {
  margin: 0;
  padding: 30px 50px;

  .text {
    font-size: 13px;
  }
}
</style>
