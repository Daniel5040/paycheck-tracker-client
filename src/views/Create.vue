<template>
  <div class="container">
    <h1 class="title">Create</h1>
    <span class="text">
      Here you can create a new paycheck or workday.
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
    </div>
    <CreateOverlay @closeModal="closeModal" :modal="modal" />
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard'
import CreateOverlay from '@/components/CreateOverlay'

export default {
  name: 'NewPaycheck',
  components: {
    BaseCard,
    CreateOverlay
  },
  data() {
    return {
      slots: [
        {
          icon: 'date_range',
          title: 'Paycheck',
          text: 'Create paycheck'
        },
        {
          icon: 'today',
          title: 'Workday',
          text: 'Create Workday'
        }
      ],
      modal: {
        showModal: false,
        showPaycheck: false,
        showWorkday: false
      }
    }
  },
  methods: {
    click(index) {
      this.modal.showModal = true

      switch (index) {
        case 0:
          this.modal.showPaycheck = true
          break
        case 1:
          this.modal.showWorkday = true
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
.cards {
  margin-top: 150px;
}

.text {
  font-size: 14px;
}

.material-icons.md-40 {
  font-size: 40px;
  color: $secondary-color;
}
</style>
