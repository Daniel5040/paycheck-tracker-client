<template>
  <div class="current-paycheck">
    <slot></slot>
    <div class="container-top">
      <div class="paycheck">
        <h1 class="money">${{ (paycheck.credit + paycheck.cash) | money }}</h1>
        <h3 class="orange">NET PAY</h3>
      </div>
      <div class="hours">
        <h1>
          {{ (paycheck.hours + paycheck.overtime) | decimal }}
        </h1>
        <h3 class="orange">HOURS WORKED</h3>
      </div>
    </div>
    <div class="mt">
      <div class="container-bottom row">
        <p>Days:</p>
        <p class="right">{{ paycheck.days }}</p>
      </div>
      <div class="container-bottom row">
        <p>Hourly ({{ paycheck.hours }} @ {{ +userInfo.wage | money }})</p>
        <p class="right">${{ hourly | money }}</p>
      </div>
      <div class="container-bottom row">
        <p>
          Overtime ({{ paycheck.overtime }} @
          {{ (+userInfo.wage * 1.5) | money }})
        </p>
        <p class="right">${{ overtime | money }}</p>
      </div>
      <div class="container-bottom row">
        <p>Credit tips</p>
        <p class="right">${{ credit | money }}</p>
      </div>
      <div class="container-bottom row">
        <p>Cash tips</p>
        <p class="right">${{ paycheck.cash | money }}</p>
      </div>
    </div>
    <p class="mt">
      Pay Period: {{ paycheck.start | formatDate }} -
      {{ paycheck.end | formatDate }},
      {{ paycheck.end | year }}
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'HomePaycheckInfo',
  props: ['paycheck'],
  filters: {
    decimal(number) {
      return Math.round((number + Number.EPSILON) * 100) / 100
    },
    money(number) {
      let newNum = number.toFixed(2)
      let counter = 0
      for (let i = newNum.length - 4; i > 0; i--) {
        if (counter === 2) {
          newNum = newNum.slice(0, i) + ',' + newNum.slice(i)
          counter = 0
        }
        counter++
      }
      return newNum
    },
    formatDate(date) {
      return moment(date).format('MMM D')
    },
    year(date) {
      return moment(date).format('YYYY')
    }
  },
  computed: {
    ...mapGetters(['userInfo']),
    hourly() {
      return this.paycheck.hours * +this.userInfo.wage
    },
    overtime() {
      return this.paycheck.overtime * (+this.userInfo.wage * 1.5)
    },
    credit() {
      const hourly = this.paycheck.hours * +this.userInfo.wage
      const overtime = this.paycheck.overtime * (+this.userInfo.wage * 1.5)
      return this.paycheck.credit - hourly - overtime
    }
  }
}
</script>

<style lang="scss" scoped>
.current-paycheck {
  margin-top: 50px;
  margin-bottom: 25px;
  border: 1px solid darken($accent-color, 20%);
  border-radius: 16px;
  padding: 25px 15px;

  .mt {
    margin-top: 20px;
  }

  .row {
    padding: 5px 0;
    border-bottom: 1px solid darken($accent-color, 30%);
  }

  .container-bottom {
    display: flex;
    justify-content: space-between;
  }

  .container-top {
    display: flex;
    justify-content: space-around;

    .money {
      color: #85bb65;
    }

    .paycheck {
      padding-right: 25px;
    }

    .hours {
      padding-left: 10px;
      border-left: 1px solid darken($accent-color, 30%);
    }
  }

  h1,
  h2,
  h3,
  p {
    text-align: start;
  }

  .right {
    text-align: end;
  }
}
</style>
