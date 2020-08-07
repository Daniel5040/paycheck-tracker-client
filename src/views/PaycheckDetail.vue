<template>
  <div class="container">
    <div class="back">
      <span @click="back" class="material-icons orange">arrow_back</span>
    </div>
    <BasePaycheckInfo :paycheck="paycheck">
      <h2 class="title orange">Your latest paycheck</h2>
    </BasePaycheckInfo>
    <h2 class="orange mb">Days worked</h2>
    <span class="text" v-if="!workdayList.length">No workdays yet</span>
    <BaseWorkdaysInfo @deleteDay="deleteDay" :workdays="workdayList" v-else />
  </div>
</template>

<script>
import BasePaycheckInfo from '@/components/BasePaycheckInfo'
import BaseWorkdaysInfo from '@/components/BaseWorkdaysInfo'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PaycheckDetail',
  components: {
    BasePaycheckInfo,
    BaseWorkdaysInfo
  },
  data() {
    return {
      paycheck: {}
    }
  },
  methods: {
    ...mapActions(['getWorkdayList']),
    deleteDay() {
      const id = this.$route.params.id
      this.getWorkdayList(id)
      this.paycheck = this.paycheckList.find(element => element._id === id)
    },
    back() {
      this.$router.push({ name: 'Paychecks' })
    }
  },
  computed: mapGetters(['workdayList', 'paycheckList']),
  beforeMount() {
    const id = this.$route.params.id
    this.getWorkdayList(id)
    this.paycheck = this.paycheckList.find(element => element._id === id)
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 0;
}
.back {
  display: flex;
  justify-content: flex-start;
  margin-top: 10px;
  margin-bottom: -25px;

  .material-icons {
    font-size: 40px;
  }
}
</style>
