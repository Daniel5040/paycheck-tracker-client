<template>
  <form @submit.prevent class="container login">
    <span class="error form-title" v-if="error">{{ error }}</span>
    <input
      class="input"
      type="email"
      v-model.trim="$v.email.$model"
      placeholder="E-mail"
      @blur="$v.email.$touch()"
      :class="{ 'input-error': $v.email.$error }"
    />
    <div class="error" v-if="$v.email.$error">
      <span v-if="!$v.email.required">Email is required</span>
      <span v-if="!$v.email.email">Invalid email</span>
    </div>
    <input
      class="input"
      type="password"
      v-model.trim="$v.password.$model"
      placeholder="Password"
      @blur="$v.password.$touch()"
      :class="{ 'input-error': $v.password.$error }"
    />
    <div class="error" v-if="$v.password.$error">
      <span v-if="!$v.password.required">Password is required</span>
    </div>
    <span class="error" v-if="userError">{{ userError }}</span>
    <button
      :disabled="$v.$invalid"
      :class="{ disabled: $v.$invalid }"
      @click="submitForm"
    >
      Login
    </button>
    <span class="text">Don't have an account?</span>
    <span class="swap" @click="$emit('swap')">Sign up</span>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  validations: {
    email: { required, email },
    password: { required }
  },
  methods: {
    ...mapActions(['login', 'getUserInfo', 'getPaychecks', 'getWorkdays']),
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = 'Please fill the form correctly.'
      } else {
        await this.login({ email: this.email, password: this.password })
        setTimeout(() => (this.error = null), 500)
        if (!this.userError) {
          await this.getUserInfo(this.email)
          await this.getPaychecks(this.userInfo.id)
          this.getWorkdays(this.paycheckActive._id)
          this.$router.push({ name: 'Home' })
        }
      }
    }
  },
  computed: mapGetters(['userError', 'userInfo', 'paycheckActive'])
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: 150px !important;
}
</style>
