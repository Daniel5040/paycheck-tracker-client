<template>
  <div class="container">
    <h1 class="title">Settings</h1>
    <span class="text">
      Here's where you can manage the details of your Account.
    </span>
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
      <SettingsOverlay @closeModal="closeModal" :modal="modal" />
    </div>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard'
import SettingsOverlay from '@/components/SettingsOverlay'
import { mapActions } from 'vuex'

export default {
  name: 'Settings',
  components: {
    BaseCard,
    SettingsOverlay
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
  }
}
</script>

<style lang="scss" scoped>
.text {
  font-size: 14px;
}

.material-icons.md-40 {
  font-size: 40px;
  color: $secondary-color;
}
</style>
