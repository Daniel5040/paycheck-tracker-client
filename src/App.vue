<template>
  <div id="app">
    <NavBar v-show="isLoggedIn" />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    NavBar
  },
  methods: mapActions(['getUserInfo', 'getPaychecks', 'getWorkdays']),
  computed: mapGetters(['isLoggedIn', 'userInfo', 'paycheckActive']),
  async created() {
    const email = localStorage.getItem('email')
    if (this.isLoggedIn) {
      await this.getUserInfo(email)
      await this.getPaychecks(this.userInfo.id)
      if (this.paycheckActive !== undefined)
        this.getWorkdays(this.paycheckActive._id)
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-align: center;
  text-decoration: none;
  font-family: Roboto, sans-serif;
}

h1,
h2,
h3,
h4,
p,
input,
button {
  color: $text-color;
}

body {
  margin-bottom: 55px;
  background: $primary-color;
}

button {
  font-size: 1rem;
  padding: 15px 40px;
  background-color: $secondary-color;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  margin: 10px 0;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    background-color: lighten($secondary-color, 10%);
  }

  &:focus {
    outline: none;
  }
}

.disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;

  &:hover {
    background-color: #ccc;
  }
}

.orange {
  color: $secondary-color;
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 8%;
  margin-top: 100px;

  .title {
    margin-bottom: 20px;
  }
}

.container-modal {
  display: flex;
  flex-direction: column;
  padding: 30px 50px;
  width: 75%;
}

.cards {
  margin-top: 100px;
  display: flex;
  flex-wrap: wrap;

  .text {
    color: $secondary-color;
    font-size: 13px;
  }
}

.modal-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 98;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  background: $primary-color;
  border: 1px solid darken($accent-color, 10%);
  border-radius: 16px;
}

.input {
  font-size: 0.9rem;
  background: transparent;
  border: none;
  border-bottom: 1px solid darken($accent-color, 30%);
  outline: none;
  text-align: left;
  padding: 15px 5px;
  padding-bottom: 5px;
  margin: 10px 0;
  transition: all 0.3s ease 0s;

  &:focus {
    border-bottom: 1px solid $secondary-color;
  }
}

.input-error {
  border-bottom: 1px solid #d8000c;
}

.text {
  color: $text-color;
}

.error {
  color: #d8000c;
  text-align: left;
  font-size: 14px;

  &.form-title {
    text-align: center;
  }
}

.swap {
  color: $secondary-color;
  cursor: pointer;
}

.vdatetime-popup {
  background: $primary-color !important;
  color: $text-color !important;
  border: 1px solid $accent-color;
}

.vdatetime-calendar__month__day--selected > span > span,
.vdatetime-calendar__month__day--selected:hover > span > span {
  background: $secondary-color !important;
}

.vdatetime-calendar__month__day:hover > span > span {
  background: $secondary-color !important;
}

.vdatetime-popup__actions__button {
  color: $secondary-color !important;
}

.vdatetime-popup__header {
  background: $secondary-color !important;
}

// Transitions
.down-enter-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-in;
  -webkit-transition-timing-function: ease-in;
  -o-transition-timing-function: ease-in;
  transition-timing-function: ease-in;
}

.down-leave-active {
  -moz-transition-duration: 0.3s;
  -webkit-transition-duration: 0.3s;
  -o-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -moz-transition-timing-function: ease-out;
  -webkit-transition-timing-function: ease-out;
  -o-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
}

.down-enter-to,
.down-leave {
  max-height: 300px;
  overflow: hidden;
}

.down-enter,
.down-leave-to {
  overflow: hidden;
  max-height: 0;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-leave-to {
  opacity: 0;
}
</style>
