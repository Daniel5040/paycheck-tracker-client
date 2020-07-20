<template>
  <div class="card-container">
    <slot name="icon"></slot>
    <slot></slot>
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseCard'
}
</script>

<style lang="scss" scoped>
.card-container {
  margin: 10px auto;
  border: 1px solid darken($accent-color, 20%);
  border-radius: 16px;
  width: 150px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    border: 1px solid $secondary-color;
  }
}
</style>
