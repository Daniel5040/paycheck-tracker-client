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
    <span class="orange m10" v-if="!paychecks.length">
      No paychecks available yet
    </span>
    <div v-else class="m10">
      <span class="orange">
        Double click or tap a paycheck to see detailed information
      </span>
      <PaycheckList
        v-for="paycheck in paychecks"
        :key="paycheck._id"
        :paycheck="paycheck"
        @dblclick.native="click(paycheck._id)"
        @deletePaycheck="deletePaycheck"
      />
    </div>
  </div>
</template>

<script>
import PaycheckList from '@/components/PaycheckList'
import { mapGetters, mapActions } from 'vuex'
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

export default {
  name: 'Paychecks',
  components: {
    Datetime,
    PaycheckList
  },
  data() {
    return {
      start: '',
      end: '',
      paychecks: [],
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
    ...mapActions(['getPaychecks']),
    addZero(date) {
      return date < 10 ? `0${date + 1}` : date + 1
    },
    click(id) {
      this.$router.push({ path: `/paychecks/detail/${id}` })
    },
    filterPaychecks() {
      let paychecks = []
      const start = new Date(this.start).getTime()
      const end = new Date(this.end).getTime()

      this.paycheckList.forEach(paycheck => {
        const paycheckstart = new Date(paycheck.start).getTime()
        if (paycheckstart >= start && paycheckstart <= end)
          paychecks.push(paycheck)
      })

      return paychecks
    },
    deletePaycheck() {
      setTimeout(() => {
        this.paychecks = this.filterPaychecks()
        this.getPaychecks(this.userInfo.id)
      }, 500)
    }
  },
  computed: mapGetters(['paycheckList', 'userInfo']),
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
    setTimeout(() => (this.paychecks = this.filterPaychecks()), 500)
  },
  watch: {
    start() {
      this.paychecks = this.filterPaychecks()
    },
    end() {
      this.paychecks = this.filterPaychecks()
    }
  }
}
</script>

<style lang="scss" scoped>
.text {
  color: darken($text-color, 10%);
}

.m10 {
  margin-top: 15px;
}

.dates {
  display: flex;
  justify-content: space-between;
}
</style>
