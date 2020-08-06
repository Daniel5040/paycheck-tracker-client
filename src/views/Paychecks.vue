<template>
  <div class="container">
    <h1 class="title">Paycheck List</h1>
    <div class="dates">
      <div>
        <p class="text">Start date</p>
        <datetime
          type="date"
          v-model.trim="start"
          :input-style="input"
        ></datetime>
      </div>
      <div>
        <p class="text">End date</p>
        <datetime
          type="date"
          v-model.trim="end"
          :input-style="input"
        ></datetime>
      </div>
    </div>
  </div>
</template>

<script>
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

export default {
  name: 'Paychecks',
  components: {
    Datetime
  },
  data() {
    return {
      start: '',
      end: '',
      input: {
        width: '100px',
        'font-size': '0.9rem',
        background: 'transparent',
        border: 'none',
        'border-bottom': '1px solid #414a53',
        outline: 'none',
        padding: '15px 5px',
        'padding-bottom': '5px',
        margin: '0'
      }
    }
  },
  methods: {
    btn() {
      const today = new Date()
      const year = today.getFullYear()
      const month =
        today.getMonth() < 10
          ? `0${today.getMonth() + 1}`
          : today.getMonth() + 1
      const day =
        today.getDate() < 10 ? `0${today.getDate() + 1}` : today.getDate() + 1
      const newDate = `${year}-${month}-${day}T00:00:00.000Z`
      console.log(this.start)
      console.log(newDate)
    },
    addZero(date) {
      return date < 10 ? `0${date + 1}` : date + 1
    }
  },
  beforeMount() {
    // list only three months at first
    const today = new Date()
    const year = today.getFullYear()
    const startMonth = this.addZero(today.getMonth() - 2)
    const endMonth = this.addZero(today.getMonth() + 1)
    const start = `${year}-${startMonth}-02T00:00:00.000Z`
    const end = `${year}-${endMonth}-02T00:00:00.000Z`
    this.start = start
    this.end = end
  }
}
</script>

<style lang="scss" scoped>
.text {
  color: darken($text-color, 10%);
}

.dates {
  display: flex;
  justify-content: space-between;
}
</style>
