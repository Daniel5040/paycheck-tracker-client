<template>
  <nav class="nav">
    <router-link
      v-for="link in links"
      :key="link.id"
      :to="link.link"
      class="nav-link"
      @click.native="active = link.id"
    >
      <span
        class="material-icons md-40 nav-icon"
        v-bind:class="{ 'active-link': checkActive(link.id) }"
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
        { id: 1, name: 'home', link: { name: 'Home' } },
        { id: 2, name: 'format_list_bulleted', link: { name: 'Paychecks' } },
        { id: 3, name: 'add_circle', link: { name: 'CreatePaycheck' } },
        { id: 4, name: 'settings', link: { name: 'Settings' } }
      ],
      active: 0
    }
  },
  methods: {
    checkActive(link) {
      return this.active === link ? true : false
    }
  },
  beforeMount() {
    this.active = 0
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

    span:hover {
      color: $secondary-color;
    }
  }
}

.active-link {
  color: $secondary-color !important;
}

.material-icons.md-40 {
  font-size: 40px;
}
</style>
