<template>
  <form @submit.prevent class="container-modal">
    <span class="error form-title" v-if="error">{{ error }}</span>
    <h2>Update Information</h2>
    <input
      class="input"
      type="text"
      v-model.trim="$v.user.name.$model"
      placeholder="Name"
      @blur="$v.user.name.$touch()"
      :class="{ 'input-error': $v.user.name.$error }"
    />
    <div class="error" v-if="$v.user.name.$error">
      <span v-if="!$v.user.name.required">Name is required</span>
      <span v-if="!$v.user.name.minLength">
        Name must be at least
        {{ $v.user.name.$params.minLength.min }} characters long
      </span>
      <span v-if="!$v.user.name.alpha">
        Name cannot contain special characters or numbers
      </span>
    </div>
    <input
      class="input"
      type="number"
      step=".01"
      v-model.trim="$v.user.wage.$model"
      placeholder="Wage (hourly)"
      @blur="$v.user.wage.$touch()"
      :class="{ 'input-error': $v.user.wage.$error }"
    />
    <div class="error" v-if="$v.user.wage.$error">
      <span v-if="!$v.user.wage.required">Wage is required</span>
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
    <span class="error" v-show="userError">{{ userError }}</span>
    <button
      :disabled="$v.$invalid"
      :class="{ disabled: $v.$invalid }"
      @click="submitForm"
    >
      Update
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required, minLength, alpha } from 'vuelidate/lib/validators'

export default {
  name: 'SettingsUpdateInfo',
  data() {
    return {
      user: {},
      password: '',
      error: null
    }
  },
  validations: {
    user: {
      name: { required, minLength: minLength(3), alpha },
      wage: { required }
    },
    password: { required }
  },
  methods: {
    ...mapActions(['updateInfo', 'updatePaycheck', 'getPaychecks']),
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = 'Please fill the form correctly'
      } else {
        const data = {
          name: this.user.name,
          wage: this.user.wage,
          password: this.password
        }
        await this.updateInfo({ id: this.user.id, data })
        setTimeout(() => (this.error = null), 500)
        if (!this.userError) {
          await this.updatePaycheck({
            userId: this.user.id,
            paycheckId: this.paycheckActive._id
          })
          this.getPaychecks(this.user.id)
          this.$emit('closeModal')
        }
      }
    }
  },
  computed: mapGetters(['userError', 'userInfo', 'paycheckActive']),
  beforeMount() {
    this.user = this.userInfo
  }
}
</script>

<style lang="scss" scoped></style>
