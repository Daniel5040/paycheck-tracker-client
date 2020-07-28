<template>
  <form @submit.prevent class="container register">
    <span class="error form-title" v-if="error">{{ error }}</span>
    <input
      class="input"
      type="text"
      v-model.trim="$v.name.$model"
      placeholder="Name"
      @blur="$v.name.$touch()"
      :class="{ 'input-error': $v.name.$error }"
    />
    <div class="error" v-if="$v.name.$error">
      <span v-if="!$v.name.required">Name is required</span>
      <span v-if="!$v.name.minLength">
        Name must be at least {{ $v.name.$params.minLength.min }} characters
        long
      </span>
      <span v-if="!$v.name.alpha">
        Name cannot contain special characters or numbers
      </span>
    </div>
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
      <span v-if="!$v.password.minLength">
        Password must be at least
        {{ $v.password.$params.minLength.min }} characters long
      </span>
    </div>
    <input
      class="input"
      type="text"
      v-model.trim="$v.wage.$model"
      placeholder="Wage"
      @blur="$v.wage.$touch()"
      :class="{ 'input-error': $v.wage.$error }"
    />
    <div class="error" v-if="$v.wage.$error">
      <span v-if="!$v.wage.required">Wage is required</span>
    </div>
    <span class="error" v-show="errorMessage">{{ errorMessage }}</span>
    <button
      :disabled="$v.$invalid"
      :class="{ disabled: $v.$invalid }"
      @click="submitForm"
    >
      Sign Up
    </button>
    <span class="text">Already have an account?</span>
    <span class="swap" @click="$emit('swap')">Login</span>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, email, minLength, alpha } from 'vuelidate/lib/validators'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      wage: '',
      error: null
    }
  },
  validations: {
    name: { required, minLength: minLength(3), alpha },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    wage: { required }
  },
  methods: {
    ...mapActions(['register', 'getUserInfo']),
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = 'Please fill the form correctly.'
      } else {
        const user = {
          name: this.name,
          email: this.email,
          password: this.password,
          wage: this.wage ? +this.wage : null
        }
        await this.register(user)
        setTimeout(() => (this.error = null), 500)
        if (!this.errorMessage) {
          this.getUserInfo(user.email)
          this.$router.push({ name: 'Home' })
        }
      }
    }
  },
  computed: mapGetters(['errorMessage'])
}
</script>

<style scoped>
.register {
  margin-top: 100px !important;
}
</style>
