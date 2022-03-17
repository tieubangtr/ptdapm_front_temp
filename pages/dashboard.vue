<template>
  <div id="pageDashboard">
    <v-banner>
      <v-img :src="require('../assets/images/banner.jpeg')" />
    </v-banner>
    <v-container grid-list-xl fluid>
      <h1>Xin chào, chúc bạn một ngày mới tốt lành</h1>
    </v-container>
  </div>
</template>

<script>
  export default {
    layout: 'dashboard',
  };
</script>
