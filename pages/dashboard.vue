<template>
  <div id="pageDashboard">
    <v-banner>
      <v-img :src="require('../assets/images/banner.jpeg')" />
    </v-banner>
    <Menu/>
    <v-container grid-list-xl fluid>
      <h1>Xin chào, chúc bạn một ngày mới tốt lành</h1>
    </v-container>
  </div>
</template>

<script>
  import Menu from '../components/Menu.vue'
  export default {
    layout: 'dashboard',
    components: {
      Menu
    },
    mounted()
        {
          if(!localStorage.getItem('accessToken')){
            this.$router.push('/login')
          }
          else{
            this.$router.push('/dashboard')
          }
        },
  };
</script>
