<template>
  <div class="container">
    <h1 class="title">Settings</h1>
    <span class="text"
      >Here's where you can manage the details of your Account.</span
    >
    <div class="cards">
      <BaseCard
        v-for="(slot, index) in slots"
        :key="index"
        @click.native="click(index)"
      >
        <template v-slot:icon>
          <span class="material-icons md-40">{{ slot.icon }}</span>
        </template>
        <h4>{{ slot.title }}</h4>
        <template v-slot:text>
          <span class="text">{{ slot.text }}</span>
        </template>
      </BaseCard>
      <ModalOverlay @closeModal="closeModal" :modal="modal" />
    </div>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard'
import ModalOverlay from '@/components/ModalOverlay'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Settings',
  components: {
    BaseCard,
    ModalOverlay
  },
  data() {
    return {
      slots: [
        {
          icon: 'https',
          title: 'Password',
          text: 'Manage your password'
        },
        {
          icon: 'person',
          title: 'Personal Info',
          text: 'Manage personal info'
        },
        {
          icon: 'delete_forever',
          title: 'Delete Account',
          text: 'Delete your account'
        },
        {
          icon: 'cancel',
          title: 'Logout',
          text: 'Get outta here'
        }
      ],
      modal: {
        showModal: false,
        showPassword: false,
        showUpdate: false,
        showDelete: false
      }
    }
  },
  methods: {
    ...mapActions(['logout']),
    click(index) {
      this.modal.showModal = true

      switch (index) {
        case 0:
          this.modal.showPassword = true
          break
        case 1:
          this.modal.showUpdate = true
          break
        case 2:
          this.modal.showDelete = true
          break
        case 3:
          this.logout()
          break
        default:
          break
      }
    },
    closeModal() {
      for (const key in this.modal) {
        this.modal[key] = false
      }
    }
  },
  computed: mapGetters(['userInfo'])
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;

  .title {
    margin-bottom: 20px;
  }

  .text {
    font-size: 14px;
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

  button {
    font-size: 16px;
    margin-top: auto;
  }
}

.material-icons.md-40 {
  font-size: 40px;
  color: $secondary-color;
}
</style>
