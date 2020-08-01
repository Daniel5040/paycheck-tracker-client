<template>
  <div>
    <div
      class="modal-overlay"
      v-if="modal.showModal"
      @click="$emit('closeModal')"
    ></div>
    <transition name="fade" mode="out-in">
      <CreateAddPaycheck
        class="modal"
        v-if="modal.showPaycheck"
        @closeModal="$emit('closeModal')"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <CreateAddWorkday
        class="modal"
        v-if="modal.showWorkday"
        @closeModal="$emit('closeModal')"
      />
    </transition>
  </div>
</template>

<script>
import CreateAddPaycheck from '@/components/CreateAddPaycheck'
import CreateAddWorkday from '@/components/CreateAddWorkday'

export default {
  name: 'CreateOverlay',
  components: {
    CreateAddPaycheck,
    CreateAddWorkday
  },
  props: ['modal']
}
</script>

<style lang="scss" scoped></style>
