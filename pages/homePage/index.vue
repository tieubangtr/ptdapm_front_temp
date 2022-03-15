<template>
  <div id="pageDashboard">
    <v-banner>
      <v-img :src="require('../../assets/images/banner.jpeg')" />
    </v-banner>
    <Menu/>
    <Product/>
  </div>
</template>

<script>
  import Menu from '../../components/Menu.vue'
  import Product from '../../components/Product.vue'
  export default {
    components: {
      Menu,
      Product
    },
    mounted()
        {
          if(!localStorage.getItem('accessToken')){
            this.$router.push('/login')
          }
        //   else{
        //     this.$router.push('/dashboard')
        //   }
        },
  };
</script>
