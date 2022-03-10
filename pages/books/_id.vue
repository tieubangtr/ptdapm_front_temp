<template>
  <div class="book-detail">
    <Menu />
    <div class="title-page">
      <p>Trang chủ/{{this.book.name}}</p>
    </div>
    <v-container>
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="5"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <v-img
              :src="`https://ptdapmback.herokuapp.com/v1/api/auth/files/${this.book.image}`"
              width="100%"
              height="75vh"
            />
          </v-card>
        </v-col>
        <v-col
          cols="12"
          sm="7"
        >
          <v-card
            class="pa-2"
            outlined
            tile
          >
            <div class="book-name">
              <h2> {{this.book.name}} </h2>
            </div>
            <div class="book-description">
              <p>{{this.book.content}}</p>
            </div>
            <div class="infor-detail">
              <p>Tác giả:      <span style="margin-left: 20%">{{ get_name_author() }}</span></p>
              <p>Nhà xuất bản: <span style="margin-left: 14%">{{ get_name_publisher() }}</span></p>
              <p>Năm xuất bản: <span style="margin-left: 13%">{{ this.book.publishAt }}</span></p>
            </div>
            <div class="borrow-book" style="margin: 40px 0px 40px 0px">
              <v-btn depressed>
                Muợn
              </v-btn>
            </div>
            <hr style="color: red">
            <p style="margin: 40px 0px 40px 0px">Thể loại: <span>{{ get_name_category() }}</span></p>
          </v-card>
        </v-col>
      </v-row>
      <!-- <Comment data={ des: this.book.content, comment: this.book.content }/> -->
    </v-container>
  </div>

<!-- <style lang="scss">
  .title-page {
    padding: 15px 0px 0px 80px;
    p {
      color: rgb(146, 146, 146);
    }
  }
  .v-sheet--outlined {
    border: none !important;
  }
</style> -->
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      book: {}
    }
  },
  async mounted () {
    await axios.get('https://ptdapmback.herokuapp.com/v1/api/books/' + this.$route.params.id)
      .then(response => (this.book = response.data))
      .catch(error => console.log(error))
  },

  methods: {
    get_name_author () {
      return this.book.authors?.map(a => a.name).join(', ')
    },
    get_name_publisher () {
      return this.book.publisher?.name
    },
    get_name_category () {
      return this.book.category?.name
    }
  }
}
</script>
