<template>
  <div class="header">
    <router-link to="/home" active-class="selected-link">
      <div>HOME</div>
    </router-link>
    <router-link to="/weather" active-class="selected-link">
      <div>WEATHER</div>
    </router-link>
    <router-link to="/gallery" active-class="selected-link">
      <div>GALLERY</div>
    </router-link>
    <router-link to="/news" active-class="selected-link">
      <div>NEWS</div>
    </router-link>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.header {
  display: flex;
  height: 64px;
  align-items: center;
  justify-content: center;
  width: 100%;

  div {
    padding: 10px 20px;
    margin: 0 5px;
  }

  a {
    text-decoration: none;
    color: $primary-text-color;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      padding-top: 15px;
    }
  }

  .selected-link {
    border-bottom: 4px solid $primary-accent-color;

    color: $primary-accent-color;
  }
}
</style>
