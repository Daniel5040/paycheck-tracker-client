<template>
  <nav class="nav">
    <router-link
      v-for="(link, index) in links"
      :key="index"
      :to="link.link"
      class="nav-link"
      @click.native="active = index"
    >
      <span
        class="material-icons md-40 nav-icon text"
        v-bind:class="{ 'active-link': checkActive(index) }"
        >{{ link.name }}</span
      >
    </router-link>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        { name: 'home', link: { name: 'Home' } },
        { name: 'format_list_bulleted', link: { name: 'Paychecks' } },
        { name: 'add_circle', link: { name: 'Create' } },
        { name: 'settings', link: { name: 'Settings' } }
      ],
      active: -1
    }
  },
  methods: {
    checkActive(index) {
      return this.active === index ? true : false
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  background: $primary-color;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 55px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  display: flex;
  overflow-x: auto;
  border-top: 1px solid darken($accent-color, 20%);

  .nav-link {
    color: $accent-color;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    min-width: 50px;
    -webkit-tap-highlight-color: transparent;
    transition: background 0.1s ease-in-out;

    &:hover {
      span {
        color: $secondary-color;
      }
    }
  }
}

.active-link {
  color: $secondary-color !important;
}

.material-icons.md-40 {
  font-size: 40px;
}

@media only screen and (min-width: 1080px) {
  .nav {
    bottom: auto;
    top: 0;
    border: 0;
    border-bottom: 1px solid darken($accent-color, 20%);
  }
}
</style>
