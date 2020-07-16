<template>
  <div id="app">
    <NavBar v-show="loggedIn" />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data() {
    return {
      loggedIn: false
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
p,
input,
button,
span {
  color: $text-color;
}

body {
  margin-bottom: 55px;
  background: $primary-color;
}

button {
  padding: 15px 25px;
  background-color: $secondary-color;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
  margin: 10px 0;

  &:hover {
    background-color: lighten($secondary-color, 10%);
  }

  &:focus {
    outline: none;
  }
}

.container {
  display: flex;
  flex-direction: column;
  margin: 0 10%;
}

.input {
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

.error {
  color: #e76c6c;
  text-align: left;
  font-size: 14px;
}

.swap {
  color: $secondary-color;
  cursor: pointer;
}

// Transitions
.down-enter-active {
  transition-duration: 0.3s;
  transition-timing-function: ease-in;
}

.down-leave-active {
  transition-duration: 0.3s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.down-enter-to,
.down-leave {
  max-height: 100px;
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
  transition: opacity 0.5s ease-out;
}

.fade-leave-to {
  opacity: 0;
}
</style>
