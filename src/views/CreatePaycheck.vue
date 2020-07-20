<template>
  <div class="container">
    <h1>Create a paycheck or add a day to a paycheck</h1>
    <div class="box">
      <div class="add">
        <h2>Create new paycheck</h2>
        <span class="material-icons">expand_more</span>
      </div>
      <div class="add">
        <h2>Add day to current paycheck</h2>
        <span class="material-icons">expand_more</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewPaycheck'
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 100px;

  .box {
    margin-top: 5vh;

    .add {
      display: flex;
      justify-content: space-between;
      margin-top: 15vh;
      cursor: pointer;
      border: 1px solid darken($accent-color, 20%);
      border-radius: 16px;
      padding: 10px;
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
