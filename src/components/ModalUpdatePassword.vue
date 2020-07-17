<template>
  <div class="container-modal">
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
    <button @click="submitForm">Change Password</button>
  </div>
</template>

<script>
export default {
  name: 'ModalUpdatePassword',
  data() {
    return {
      password: '',
      repeatPassword: '',
      error: ''
    }
  },
  methods: {
    submitForm() {
      console.log('change password')
      this.$emit('closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.container-modal {
  margin: 0;
  padding: 30px 50px;
}
</style>
