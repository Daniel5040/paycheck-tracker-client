<template>
  <div class="container">
    <h1 class="title">{{ userInfo.name | possession }} Home</h1>
    <span class="text m10" v-if="paycheckActive === undefined">
      No active paycheck available yet
    </span>
    <div v-else>
      <span class="text">
        Hey welcome back! Let's take a look at your latest paycheck information
      </span>
      <BasePaycheckInfo :paycheck="paycheckActive">
        <h2 class="title orange">Your latest paycheck</h2>
      </BasePaycheckInfo>
    </div>
    <h2 class="orange mb">Days worked</h2>
    <span class="text m10" v-if="!workdayActive.length">
      No workdays available yet
    </span>
    <BaseWorkdaysInfo @deleteDay="deleteDay" :workdays="workdayActive" v-else />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BasePaycheckInfo from '@/components/BasePaycheckInfo'
import BaseWorkdaysInfo from '@/components/BaseWorkdaysInfo'

export default {
  name: 'Home',
  components: {
    BasePaycheckInfo,
    BaseWorkdaysInfo
  },
  filters: {
    possession(name) {
      if (name !== undefined)
        return name.slice(-1) === 's' ? `${name}'` : `${name}'s`
    }
  },
  methods: {
    ...mapActions(['getWorkdays', 'getPaychecks']),
    deleteDay() {
      this.getWorkdays(this.paycheckActive._id)
    }
  },
  computed: mapGetters(['userInfo', 'paycheckActive', 'workdayActive']),
  created() {
    if (this.paycheckActive !== undefined)
      this.getWorkdays(this.paycheckActive._id)
  }
}
</script>

<style lang="scss" scoped>
.m10 {
  margin: 10px 0;
}
</style>
