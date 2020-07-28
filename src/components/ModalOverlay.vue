<template>
  <div>
    <div class="modal-overlay" v-if="modal.showModal" @click="allFalse"></div>
    <transition name="fade" mode="out-in">
      <ModalUpdatePassword
        class="modal"
        v-if="modal.showPassword"
        @closeModal="allFalse"
        :id="userInfo.id"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <ModalUpdateInfo
        class="modal"
        v-if="modal.showUpdate"
        @closeModal="updateInfo"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <ModalDeleteAccount
        class="modal"
        v-if="modal.showDelete"
        @closeModal="allFalse"
        :id="userInfo.id"
      />
    </transition>
  </div>
</template>

<script>
import ModalUpdatePassword from '@/components/ModalUpdatePassword'
import ModalUpdateInfo from '@/components/ModalUpdateInfo'
import ModalDeleteAccount from '@/components/ModalDeleteAccount'
import { mapGetters } from 'vuex'

export default {
  name: 'ModalOverlay',
  components: {
    ModalUpdatePassword,
    ModalUpdateInfo,
    ModalDeleteAccount
  },
  props: ['index', 'modal'],
  methods: {
    allFalse() {
      this.$emit('closeModal')
    },
    updateInfo() {
      this.allFalse()
    }
  },
  computed: mapGetters(['userInfo'])
}
</script>

<style lang="scss" scoped>
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
</style>
