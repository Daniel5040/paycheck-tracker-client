<template>
  <div class="container">
    <h1 class="title">{{ userInfo.name | possession }} Home</h1>
    <span class="text">
      Hey welcome back! Let's take a look at your latest paycheck information
    </span>
    <HomePaycheckInfo />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HomePaycheckInfo from '@/components/HomePaycheckInfo'

export default {
  name: 'Home',
  components: {
    HomePaycheckInfo
  },
  filters: {
    possession(name) {
      return name.slice(-1) === 's' ? `${name}'` : `${name}'s`
    }
  },
  computed: mapGetters(['userInfo'])
}
</script>
