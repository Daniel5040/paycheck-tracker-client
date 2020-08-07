<template>
  <form @submit.prevent class="container-modal">
    <span class="error form-title" v-if="error">{{ error }}</span>
    <h2>Add Paycheck</h2>
    <datetime
      placeholder="Start Date"
      type="date"
      v-model.trim="$v.start.$model"
      :input-style="input"
      @blur="$v.start.$touch()"
      :class="{ 'input-error': $v.start.$error, date: $v.start.$error }"
    ></datetime>
    <div class="error" v-if="$v.start.$error && start">
      <span v-if="!$v.start.required">Field is required</span>
    </div>
    <datetime
      placeholder="End Date"
      type="date"
      v-model.trim="$v.end.$model"
      :input-style="input"
      @blur="$v.end.$touch()"
      :class="{ 'input-error': $v.end.$error, date: $v.end.$error }"
    ></datetime>
    <div class="error" v-if="$v.end.$error && end">
      <span v-if="!$v.end.required">Field is required</span>
    </div>
    <span class="error" v-show="paycheckError">{{ paycheckError }}</span>
    <button
      :disabled="$v.$invalid"
      :class="{ disabled: $v.$invalid }"
      @click="submitForm"
    >
      Create
    </button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

export default {
  name: 'CreateAddPaycheck',
  components: {
    datetime: Datetime
  },
  props: ['id'],
  data() {
    return {
      start: '',
      end: '',
      error: null,
      input: {
        'font-size': '0.9rem',
        background: 'transparent',
        border: 'none',
        'border-bottom': '1px solid #414a53',
        outline: 'none',
        padding: '15px 5px',
        'padding-bottom': '5px',
        margin: '10px 0',
        'text-align': 'start'
      }
    }
  },
  validations: {
    start: { required },
    end: { required }
  },
  methods: {
    ...mapActions(['createPaycheck', 'getPaychecks', 'logoutWorkday']),
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = 'Please fill the form correctly.'
      } else {
        const data = {
          start: this.start,
          end: this.end,
          user: this.id
        }
        await this.createPaycheck(data)
        setTimeout(() => (this.error = null), 500)
        if (!this.paycheckError) {
          this.getPaychecks(this.id)
          this.logoutWorkday()
          this.$emit('closeModal')
        }
      }
    }
  },
  computed: mapGetters(['paycheckError'])
}
</script>

<style lang="scss" scoped>
.date {
  border: 0;
}
</style>
