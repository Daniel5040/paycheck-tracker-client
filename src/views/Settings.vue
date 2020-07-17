<template>
  <div class="container">
    <h1 class="title">Hi, {{ userInfo.name }}!</h1>
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
    </div>
    <transition name="fade" mode="out-in">
      <div class="modal-overlay" v-if="showModal" @click="allFalse"></div>
    </transition>
    <ModalUpdatePassword
      class="modal"
      v-if="showPassword"
      @closeModal="allFalse"
    />
    <ModalUpdateInfo class="modal" v-if="showUpdate" @closeModal="allFalse" />
    <ModalDeleteAccount
      class="modal"
      v-if="showDelete"
      @closeModal="allFalse"
    />
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard'
import ModalUpdatePassword from '@/components/ModalUpdatePassword'
import ModalUpdateInfo from '@/components/ModalUpdateInfo'
import ModalDeleteAccount from '@/components/ModalDeleteAccount'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Settings',
  components: {
    BaseCard,
    ModalUpdatePassword,
    ModalUpdateInfo,
    ModalDeleteAccount
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
      showModal: false,
      showPassword: false,
      showUpdate: false,
      showDelete: false
    }
  },
  methods: {
    ...mapActions(['logout', 'getUserInfo', 'deleteAccount']),
    click(index) {
      this.showModal = true

      switch (index) {
        case 0:
          this.showPassword = true
          console.log('password')
          break
        case 1:
          this.showUpdate = true
          console.log('personal info')
          break
        case 2:
          this.showDelete = true
          console.log('delete account')
          break
        case 3:
          this.logout()
          break
      }
    },
    allFalse() {
      this.showModal = false
      this.showPassword = false
      this.showUpdate = false
      this.showDelete = false
    }
  },
  computed: mapGetters(['userInfo']),
  created() {
    const email = localStorage.getItem('email')
    this.getUserInfo(email)
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 18%;

  .title {
    margin-bottom: 10px;
  }

  .text {
    font-size: 14px;
  }

  .cards {
    margin-top: 25%;
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
  border: 1px solid $accent-color;
  border-radius: 16px;
}
</style>
