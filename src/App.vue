<template>
  <div>
    <div class="link">
      <RouterLink to="/hcp360" active-color="red">HCP360</RouterLink> |
      <RouterLink to="/kee360">KEE360</RouterLink> |
      <RouterLink to="/home">home</RouterLink> |
      <RouterLink to="/about">about</RouterLink>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// console.log(window, '====window')
// console.log(2222222)
// console.log(window.__INITIAL_STATE__, '====window.__INITIAL_STATE__')
</script>

<style lang="less" scoped>
.link {
  margin: 20px 20px 20px 20px;
  text-align: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  background-color: #fff;
  .router-link-exact-active {
    color: #f40;
    font-weight: bold;
    font-size: 20px;
  }
}
</style>
