<template>
  <form @submit.prevent class="container-modal">
    <span class="error form-title" v-if="error">{{ error }}</span>
    <h2>Add Workday</h2>
    <datetime
      placeholder="Start Date"
      type="date"
      v-model.trim="$v.start.$model"
      :input-style="input"
      @blur="$v.start.$touch()"
      :class="{ 'input-error': $v.start.$error, date: $v.start.$error }"
    ></datetime>
    <div class="error" v-if="$v.start.$error">
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
    <div class="error" v-if="$v.end.$error">
      <span v-if="!$v.end.required">Field is required</span>
    </div>
    <input
      class="input"
      placeholder="Credit Total"
      type="text"
      v-model.trim="$v.credit.$model"
      @blur="$v.credit.$touch()"
      :class="{ 'input-error': $v.credit.$error }"
    />
    <div class="error" v-if="$v.credit.$error">
      <span v-if="!$v.credit.required">Field is required</span>
    </div>
    <input
      class="input"
      placeholder="Cash Total"
      type="text"
      v-model.trim="$v.cash.$model"
      @blur="$v.cash.$touch()"
      :class="{ 'input-error': $v.cash.$error }"
    />
    <div class="error" v-if="$v.cash.$error">
      <span v-if="!$v.cash.required">Field is required</span>
    </div>
    <span class="error" v-show="workdayError">{{ workdayError }}</span>
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
  name: 'CreateAddWorkday',
  components: {
    datetime: Datetime
  },
  data() {
    return {
      start: '',
      end: '',
      credit: '',
      cash: '',
      error: null,
      input: {
        'font-size': '0.9rem',
        background: 'transparent',
        border: 'none',
        'border-bottom': '1px solid #414a53',
        outline: 'none',
        padding: '15px 5px',
        'padding-bottom': '5px',
        margin: '10px 0'
      }
    }
  },
  validations: {
    start: { required },
    end: { required },
    credit: { required },
    cash: { required }
  },
  methods: {
    ...mapActions(['createWorkday']),
    submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = 'Please fill the form correctly'
      } else {
        console.log(this.start, this.end, this.credit, this.cash)
      }
    }
  },
  computed: mapGetters(['workdayError'])
}
</script>

<style lang="scss" scoped>
.date {
  border: 0;
}
</style>
