<template>
  <form @submit.prevent class="container-modal">
    <h2 class="title">Delete Account</h2>
    <span class="text">Are you sure?</span>
    <span class="text">There is no coming back from this.</span>
    <span class="error form-title" v-if="error">{{ error }}</span>
    <input
      class="input"
      type="email"
      v-model.trim="$v.email.$model"
      placeholder="Type your E-mail"
      @blur="$v.email.$touch()"
      :class="{ 'input-error': $v.email.$error }"
    />
    <div class="error" v-if="$v.email.$error">
      <span v-if="!$v.email.required">Email is required</span>
      <span v-if="!$v.email.email">Invalid email</span>
    </div>
    <span class="error" v-show="userError">{{ userError }}</span>
    <button
      :disabled="$v.$invalid"
      :class="{ disabled: $v.$invalid }"
      @click="submitForm"
    >
      Delete
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'SettingsDeleteAccount',
  props: ['id'],
  data() {
    return {
      email: '',
      error: null
    }
  },
  validations: {
    email: { required, email }
  },
  methods: {
    ...mapActions(['deleteAccount']),
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = 'Please fill out the form correctly.'
      } else {
        await this.deleteAccount(this.id)
        setTimeout(() => (this.error = null), 500)
        if (!this.userError) {
          this.$emit('closeModal')
        }
      }
    }
  },
  computed: mapGetters(['userError'])
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
