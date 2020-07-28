<template>
  <div class="container">
    <h1 class="title">Add paycheck or workday</h1>
    <div class="box">
      <div class="add" @click="showWork">
        <h2>Add Workday</h2>
        <span class="material-icons text" v-show="!showWorkday">
          expand_more
        </span>
        <span class="material-icons text" v-show="showWorkday">clear</span>
      </div>
      <transition name="down" appear>
        <AddWorkdayForm v-show="showWorkday" />
      </transition>
      <div class="add" @click="showPay">
        <h2>Add Paycheck</h2>
        <span class="material-icons text" v-show="!showPaycheck">
          expand_more
        </span>
        <span class="material-icons text" v-show="showPaycheck">clear</span>
      </div>
      <transition name="down">
        <AddPaycheckForm v-show="showPaycheck" />
      </transition>
    </div>
  </div>
</template>

<script>
import AddPaycheckForm from '@/components/AddPaycheckForm'
import AddWorkdayForm from '@/components/AddWorkdayForm'

export default {
  name: 'NewPaycheck',
  components: {
    AddPaycheckForm,
    AddWorkdayForm
  },
  data() {
    return {
      showPaycheck: false,
      showWorkday: false
    }
  },
  methods: {
    showPay() {
      this.showPaycheck = !this.showPaycheck
      this.showWorkday = false
    },
    showWork() {
      this.showWorkday = !this.showWorkday
      this.showPaycheck = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;

  .title {
    margin-bottom: 20px;
  }

  .box {
    margin-top: 10vh;

    .add {
      display: flex;
      justify-content: space-between;
      margin-top: 5vh;
      cursor: pointer;
      border: 1px solid darken($accent-color, 20%);
      border-radius: 16px;
      padding: 10px;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        border: 1px solid $secondary-color;
      }
    }
  }
}

h2 {
  text-align: left;
  color: $secondary-color;
}

.material-icons {
  font-size: 36px;
}
</style>
