<template>
    <v-container>
        <v-tabs>
            <v-tabs-slider color="gray"></v-tabs-slider>
            <v-tab href="#tab-1">
                Sự miêu tả
            </v-tab>
            <v-tab href="#tab-2">
                Bình luận
            </v-tab>
            <v-tab-item value="tab-1">
                <v-card flat>
                    <v-card-text>{{ description }}</v-card-text>
                </v-card>
            </v-tab-item>
            <v-tab-item value="tab-2">
                <v-card flat>
                    <!-- <v-card-text>{{ description }}</v-card-text> -->
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs6>
                                <v-card color="secondary">
                                    <div class="input-comment"> 
                                        <h4>Thêm mới bình luận</h4>
                                        <p>Nhập bình luận*</p>
                                        <v-textarea
                                            solo
                                            name="input-7-4"
                                            v-model="comment"
                                        />
                                        <span style="color: red">{{ this.validate.comment }}</span>
                                    </div>
                                    <div class="submit comment">
                                        <v-btn @click="submitForm">Gửi</v-btn>
                                    </div>
                                </v-card>
                            </v-flex>
                            <v-flex xs6>
                                <v-card color="secondary">
                                    <div class="list-comment">
                                        <div class="comment-item" v-for="comment in this.comments" :key="comment.id">
                                            <div class="author-comment">
                                                <h4>{{ comment.user.name }} - {{ comment. createdAt}} </h4>
                                                <p> {{ comment.content }} </p>
                                            </div>
                                        </div>
                                    </div>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-tab-item>
        </v-tabs>
    </v-container>
</template>

<script>
import axios from 'axios'
export default {
    props: {
        description: String,
        bookId: Number
    },
    data () {
        return {
            comment: '',
            validate: {
                comment: ''
            },
            user: JSON.parse(localStorage.getItem('User')),
            comments: [],
            book_id: this.bookId
        }
    },
    methods: {
        validate_comment() {
            if(this.comment == "") {
               return false
            } else {
                return true
            }
        },
        async submitForm() {
            if(this.validate_comment()) {
                await axios({
                            method: 'post',
                            url: 'https://ptdapmback.herokuapp.com/v1/api/comments',
                            data: {
                                bookId: this.bookId,
                                content: this.comment,
                                parentId: 0,
                                userId: this.user.id
                            },
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${this.user.token}`
                            }
                        })
                        .then((response) => {
                            this.comment = ''
                            this.comments.unshift(response.data)
                        })
                        .catch((error) => {
                            console.log(error.response.data)
                        })
            } else {
                this.validate.comment = 'Bình luận không được để trống' 
            }
        }
    },
    async mounted () {
        await axios({
            method: 'get',
            url: `https://ptdapmback.herokuapp.com/v1/api/comments/book/${this.$route.query.bookId}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.user.token}`
            }
        })
        .then(response => {
            this.comments = response.data
        })
        .catch(error => {
            console.log(error.response.data)
        })
    }
}
</script>

<style lang="scss" scoped>

</style>
