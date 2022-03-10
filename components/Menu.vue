<template>
  <v-bottom-navigation
    color="white"
    grow
  >
    <v-btn>
      <NuxtLink to="/">
        <span>TRANG CHỦ</span>
      </NuxtLink>
    </v-btn>
    <v-btn>
      <span>THỂ LOẠI</span>
    </v-btn>
    <v-btn>
      <span>MƯỢN-TRẢ</span>
    </v-btn>
    <v-btn>
      <span>GIỚI THIỆU</span>
    </v-btn>
    <v-btn>
      <span>LIÊN HỆ</span>
    </v-btn>
  </v-bottom-navigation>
</template>
<style lang="scss">
  .v-bottom-navigation {
    box-shadow: none;
    background-color: #78CA46 !important;
    .v-size--default {
      max-width: 240px !important;
    }
    .v-btn__content {
      color: white;
      a {
        color: #ffffff;
        text-decoration: none;
      }
    }
  }
</style>
