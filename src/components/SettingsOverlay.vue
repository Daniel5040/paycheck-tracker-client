<template>
  <div>
    <div
      class="modal-overlay"
      v-if="modal.showModal"
      @click="$emit('closeModal')"
    ></div>
    <transition name="fade" mode="out-in">
      <SettingsUpdatePassword
        class="modal"
        v-if="modal.showPassword"
        @closeModal="$emit('closeModal')"
        :id="userInfo.id"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <SettingsUpdateInfo
        class="modal"
        v-if="modal.showUpdate"
        @closeModal="$emit('closeModal')"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <SettingsDeleteAccount
        class="modal"
        v-if="modal.showDelete"
        @closeModal="$emit('closeModal')"
        :id="userInfo.id"
      />
    </transition>
  </div>
</template>

<script>
import SettingsUpdatePassword from '@/components/SettingsUpdatePassword'
import SettingsUpdateInfo from '@/components/SettingsUpdateInfo'
import SettingsDeleteAccount from '@/components/SettingsDeleteAccount'
import { mapGetters } from 'vuex'

export default {
  name: 'SettingsOverlay',
  components: {
    SettingsUpdatePassword,
    SettingsUpdateInfo,
    SettingsDeleteAccount
  },
  props: ['modal'],
  computed: mapGetters(['userInfo'])
}
</script>

<style lang="scss" scoped></style>
