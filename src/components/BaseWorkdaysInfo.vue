<template>
  <div>
    <div class="box" v-for="workday in workdays" :key="workday._id">
      <div class="row">
        <div class="col">
          <span class="text left">Credit</span>
          <span class="text left">${{ workday.credit | money }}</span>
        </div>
        <div class="col">
          <span class="text right">Period</span>
          <span class="text right">
            {{ workday.start | day }},
            {{ workday.start | hour }}
            -
            {{ workday.end | hour }}
          </span>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <span class="text left">Cash</span>
          <span class="text left">${{ workday.cash | money }}</span>
        </div>
        <button
          class="small-btn"
          @click="deleteBtn(workday._id, workday.paycheck)"
        >
          delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  name: 'BaseWorkdaysInfo',
  props: ['workdays'],
  methods: {
    ...mapActions([
      'deleteWorkday',
      'getWorkdays',
      'updatePaycheck',
      'getPaychecks'
    ]),
    async deleteBtn(id, paycheck) {
      const option = confirm('Are you sure?')
      if (option) {
        await this.deleteWorkday(id)
        await this.updatePaycheck({
          userId: this.userInfo.id,
          paycheckId: paycheck
        })
        await this.getPaychecks(this.userInfo.id)
        this.$emit('deleteDay')
      }
    }
  },
  computed: mapGetters(['userInfo']),
  filters: {
    day(date) {
      return moment(date).format('MMM Do')
    },
    hour(date) {
      return moment(date).format('h:mm')
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
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  border: 1px solid darken($accent-color, 20%);
  border-radius: 16px;
  padding: 0 15px;
  margin: 25px 0;

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
}
</style>
