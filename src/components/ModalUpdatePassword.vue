<template>
  <form @submit.prevent class="container-modal">
    <span class="error form-title" v-if="error">{{ error }}</span>
    <h2>Change Password</h2>
    <input
      class="input"
      type="password"
      v-model.trim="$v.password.$model"
      placeholder="New Password"
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
      type="password"
      v-model.trim="$v.repeatPassword.$model"
      placeholder="Confirm Password"
      @blur="$v.repeatPassword.$touch()"
      :class="{ 'input-error': $v.repeatPassword.$error }"
    />
    <div class="error" v-if="$v.repeatPassword.$error">
      <span v-if="!$v.repeatPassword.required">Password is required</span>
      <span
        v-if="!$v.repeatPassword.sameAsPassword && $v.repeatPassword.required"
      >
        Passwords do not match
      </span>
    </div>
    <span class="error" v-show="errorMessage">{{ errorMessage }}</span>
    <button
      :disabled="$v.$invalid"
      :class="{ disabled: $v.$invalid }"
      @click="submitForm"
    >
      Change Password
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  name: 'ModalUpdatePassword',
  props: ['id'],
  data() {
    return {
      password: '',
      repeatPassword: '',
      same: false,
      error: null
    }
  },
  validations: {
    password: { required, minLength: minLength(8) },
    repeatPassword: {
      required,
      sameAsPassword: sameAs(function() {
        return this.password
      })
    }
  },
  methods: {
    ...mapActions(['updatePassword']),
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = 'Please fill the form correctly'
      } else {
        await this.updatePassword({ id: this.id, password: this.password })
        setTimeout(() => (this.error = null), 500)
        if (!this.errorMessage) {
          this.$emit('closeModal')
        }
      }
    }
  },
  computed: mapGetters(['errorMessage'])
}
</script>

<style lang="scss" scoped></style>
