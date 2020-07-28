<template>
  <form @submit.prevent>
    <span class="error form-title" v-if="error">{{ error }}</span>
    <div class="dates">
      <div>
        <datetime
          placeholder="Start Date"
          type="date"
          v-model.trim="$v.start.$model"
          :input-style="input"
          @blur="$v.start.$touch()"
          :class="{ 'input-error': $v.start.$error }"
        ></datetime>
        <div class="error" v-if="$v.start.$error">
          <span v-if="!$v.start.required">Field is required</span>
        </div>
      </div>
      <div>
        <datetime
          placeholder="End Date"
          type="date"
          v-model.trim="$v.end.$model"
          :input-style="input"
          @blur="$v.end.$touch()"
          :class="{ 'input-error': $v.end.$error }"
        ></datetime>
        <div class="error" v-if="$v.end.$error">
          <span v-if="!$v.end.required">Field is required</span>
        </div>
      </div>
    </div>
    <button
      :disabled="$v.$invalid"
      :class="{ disabled: $v.$invalid }"
      @click="submit"
    >
      Create
    </button>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

export default {
  name: 'AddPaycheckForm',
  components: {
    datetime: Datetime
  },
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
        margin: '10px 0'
      }
    }
  },
  validations: {
    start: { required },
    end: { required }
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = 'Please fill the form correctly.'
      } else {
        console.log(this.start)
        console.log(this.end)
        this.clearFrom()
      }
    },
    clearFrom() {
      this.start = ''
      this.end = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.dates {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.input-error {
  border: 0;
}

.error {
  text-align: center;
}
</style>
