<template>
  <div>
    <h1 class="title">Paycheck Tracker</h1>
    <hr />
    <LoginModule class="module" @swap="login = !login" v-if="login" />
    <RegisterModule class="module" @swap="login = !login" v-else />
  </div>
</template>

<script>
import LoginModule from '@/components/LoginModule.vue'
import RegisterModule from '@/components/RegisterModule'

export default {
  name: 'LoginPage',
  components: {
    LoginModule,
    RegisterModule
  },
  data() {
    return {
      login: true
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 3em;
  font-family: 'Pacifico', cursive;
  line-height: 1.5em;
  color: $text-color;
  margin-top: 20vh;
  margin-bottom: -1vh;
  text-shadow: -2px -2px 0 $secondary-color, 2px -2px 0 $secondary-color,
    -2px 2px 0 $secondary-color, 2px 2px 0 $secondary-color;
}

hr {
  width: 37vw;
  height: 3px;
  margin: 0 auto;
  background-color: $text-color;
  border: 1px solid $secondary-color;
}
</style>
