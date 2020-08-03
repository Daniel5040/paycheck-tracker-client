<template>
  <form @submit.prevent class="container-modal">
    <span class="error form-title" v-if="error">{{ error }}</span>
    <h2>Add Workday</h2>
    <datetime
      use12-hour
      placeholder="Start Date"
      type="datetime"
      v-model.trim="$v.start.$model"
      :input-style="input"
      @blur="$v.start.$touch()"
      :class="{ 'input-error': $v.start.$error, date: $v.start.$error }"
    ></datetime>
    <div class="error" v-if="$v.start.$error && start">
      <span v-if="!$v.start.required">Field is required</span>
    </div>
    <datetime
      use12-hour
      placeholder="End Date"
      type="datetime"
      v-model.trim="$v.end.$model"
      :input-style="input"
      @blur="$v.end.$touch()"
      :class="{ 'input-error': $v.end.$error, date: $v.end.$error }"
    ></datetime>
    <div class="error" v-if="$v.end.$error && end">
      <span v-if="!$v.end.required">Field is required</span>
    </div>
    <transition name="down" mode="out-in">
      <div v-show="showTips">
        <input
          class="input"
          placeholder="Credit Total"
          type="text"
          v-model.trim="credit"
        />
        <input
          class="input"
          placeholder="Cash Total"
          type="text"
          v-model.trim="cash"
        />
      </div>
    </transition>
    <div class="tips" @click="showTips = !showTips">
      <span class="text" v-show="!showTips">Any tips? (Cash or Credit)</span>
      <span class="text" v-show="showTips">Close</span>
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
  props: ['id'],
  data() {
    return {
      start: '',
      end: '',
      credit: '',
      cash: '',
      error: null,
      showTips: false,
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
    ...mapActions(['createWorkday', 'updatePaycheck', 'getPaychecks']),
    async submitForm() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.error = 'Please fill the form correctly'
      } else {
        const data = {
          start: this.start,
          end: this.end,
          credit: this.credit ? +this.credit : 0,
          cash: this.cash ? +this.cash : 0,
          paycheck: this.paycheckActive._id,
          user: this.id
        }
        await this.createWorkday(data)
        setTimeout(() => (this.error = null), 500)
        if (!this.workdayError) {
          await this.updatePaycheck({
            userId: this.id,
            paycheckId: this.paycheckActive._id
          })
          this.getPaychecks(this.id)
          this.$emit('closeModal')
        }
      }
    }
  },
  computed: mapGetters(['workdayError', 'paycheckActive'])
}
</script>

<style lang="scss" scoped>
.date {
  border: 0;
}

.text {
  color: $secondary-color;
}

.tips {
  padding: 10px 0;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
</style>
