<template>
  <div class="container-modal">
    <h2>Update Information</h2>
    <input
      class="input"
      type="text"
      v-model="name"
      placeholder="Name"
      required
    />
    <input
      class="input"
      type="text"
      v-model="email"
      placeholder="E-mail"
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
      <span class="error" v-show="error">{{ error }}</span>
    </transition>
    <button @click="submitForm">Update Info</button>
  </div>
</template>

<script>
export default {
  name: 'ModalUpdateInfo',
  data() {
    return {
      name: '',
      email: '',
      wage: '',
      error: ''
    }
  },
  methods: {
    submitForm() {
      console.log('update info')
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
