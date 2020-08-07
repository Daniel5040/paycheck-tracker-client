<template>
  <div class="container">
    <h1>404 Page Not found</h1>
    <span class="orange">The page you're trying to reach does not exist</span>
    <button @click="back">Go Back</button>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 50px;
}

span {
  margin-bottom: 400px;
}
</style>
