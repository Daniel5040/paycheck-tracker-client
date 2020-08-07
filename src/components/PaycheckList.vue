<template>
  <div class="box">
    <div class="row">
      <div class="col">
        <span class="text left">Hours</span>
        <span class="text left">
          {{ (paycheck.hours + paycheck.overtime) | decimal }}
        </span>
      </div>
      <div class="col">
        <span class="text right">Pay period</span>
        <span class="text right">
          {{ paycheck.start | formatDate }} - {{ paycheck.end | formatDate }},
          {{ paycheck.end | year }}
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span class="text left">Net pay</span>
        <span class="text left money">
          ${{ (paycheck.cash + paycheck.credit) | money }}
        </span>
      </div>
      <button class="small-btn" @click="deleteBtn(paycheck._id)">
        delete
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

export default {
  name: 'PaycheckList',
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
  methods: {
    ...mapActions(['deletePaycheck']),
    deleteBtn(id) {
      const option = confirm('Are you sure?')
      if (option) {
        this.deletePaycheck(id)
        this.$emit('deletePaycheck')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid darken($accent-color, 20%);
  border-radius: 16px;
  padding: 0 15px;
  margin-top: 25px;

  .row {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;
  }

  .col {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .left {
    text-align: start;
  }

  .right {
    text-align: end;
  }

  .small-btn {
    padding: 5px 15px;
    margin: 0;
  }

  .money {
    color: #85bb65;
  }
}
</style>
