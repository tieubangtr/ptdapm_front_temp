import axios from 'axios'
import '../scss/indexStyle.scss'
export default {
  data () {
    return {
      books: {},
      stastic: {}
    }
  },

  async mounted () {
    await axios.get('https://ptdapmback.herokuapp.com/v1/api/books?page=0&limit=4&sort=-id')
      .then(response => (this.books = response.data))
      .catch(error => console.log(error))
  },

  methods: {
    trulcate_name_book (name) {
      if (name.length >= 17) {
        return name.substring(0, 17).concat('...')
      } else {
        return name
      }
    },
    trulcate_name_author (name) {
      if (name.length >= 13) {
        return name.substring(0, 13).concat('...')
      } else {
        return name
      }
    }
  }
}
