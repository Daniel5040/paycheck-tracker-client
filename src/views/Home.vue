<template>
  <div class="container">
    <h1 class="title">{{ userInfo.name | possession }} Home</h1>
    <span class="text">
      Hey welcome back! Let's take a look at your latest paycheck information
    </span>
    <BasePaycheckInfo :paycheck="paycheckActive">
      <h2 class="title orange">Your latest paycheck</h2>
    </BasePaycheckInfo>
    <BaseWorkdaysInfo :workdays="workdayActive" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      return name.slice(-1) === 's' ? `${name}'` : `${name}'s`
    }
  },
  computed: mapGetters(['userInfo', 'paycheckActive', 'workdayActive'])
}
</script>
