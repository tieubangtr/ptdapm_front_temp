<template>
    <div id="page-forms">
        <v-container grid-list-xl fluid>
            <h1>{{ this.userData.id }}</h1>
            <v-layout row wrap>
                <v-flex lg6>
                    <v-card class="mb-4">
                        <v-toolbar color="teal" dark flat dense cad>
                        <v-toolbar-title class="subheading">Hồ sơ tài khoản</v-toolbar-title>
                        <v-spacer></v-spacer>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-card-text class="">
                            <v-form>
                                <v-text-field
                                    label="Họ và tên"
                                    name="fullname"
                                    v-model= "userData.name"
                                ></v-text-field>    
                                <v-text-field
                                    label="Email"
                                    name="email"
                                    v-model= "userData.email"
                                    disabled
                                ></v-text-field>    
                                <v-text-field
                                    label="Số điện thoại"
                                    v-model= "userData.phone"
                                ></v-text-field>
                                <v-text-field
                                    label="Ngày sinh"
                                    v-model= "userData.birthday"
                                    type="date"
                                ></v-text-field>    
                                <v-text-field
                                    label="Địa chỉ"
                                    v-model= "userData.addr"
                                ></v-text-field>        
                                <div class="form-btn">
                                    <v-btn outline @click="updateInfo()" color="primary">Lưu thay đổi</v-btn>
                                </div>
                            </v-form>
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex lg6>
                    <v-img v-if="userData.img == '' || userData.img == 'string'" src="https://scontent.fhan5-8.fna.fbcdn.net/v/t1.6435-9/61441232_2111788605600677_2041255779486400512_n.png?_nc_cat=107&ccb=1-5&_nc_sid=cdbe9c&_nc_ohc=cB5veHEfx3IAX9FW8Wg&_nc_ht=scontent.fhan5-8.fna&oh=00_AT8B2uYKd_WitqDCRDAWF8Ow_1hMWgnxTIZFJ92pyHq-uA&oe=62501A79" height="390">
                        <v-layout column class="media ma-0">
                            <v-card-title>
                            <v-spacer></v-spacer>
                            <v-btn dark icon class="mr-3" @click="updateInfo()">
                                <v-icon>edit</v-icon>
                            </v-btn>
                            </v-card-title>
                            <v-spacer></v-spacer>
                            <v-card-title class="white--text pl-5 pt-5">
                            <div class="display-1 pl-5 pt-5">{{ userData.name }}</div>
                            </v-card-title>
                        </v-layout>
                    </v-img>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
    layout: 'dashboard',
    mounted () {
        this.getDetail()
    },
    data(){
        return{
            userData: {},
            id: 1
        };
    },
    methods:{
        getDetail(){
            var userId = localStorage.getItem('userId');
            var config = {
                method: 'get',
                url: 'https://ptdapmback.herokuapp.com/v1/api/users/' + userId,
                headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                }
            };

            axios(config)
            .then(response => {
                this.userData = response.data
                this.id = response.data.id
                console.log(JSON.stringify(response.data));
            })
            .catch(error => {
                console.log(error);
            });
        },
        updateInfo(){
            console.log(JSON.stringify(this.userData));
            if(this.userData != null){
                var data = JSON.stringify({
                    "addr": this.userData.addr,
                    "birthday": this.userData.birthday,
                    "email": this.userData.email,
                    "gender": this.userData.gender,
                    "id": 0,
                    "img": "string",
                    "name": this.userData.name,
                    "noneLocked": true,
                    "password": null,
                    "phone": this.userData.phone,
                    "roles": [
                        {
                        "id": 0,
                        "name": "ROLE_USER"
                        }
                    ]
                });
                // var data = JSON.stringify(this.userData);

                var config = {
                    method: 'put',
                    url: 'https://ptdapmback.herokuapp.com/v1/api/users/' + this.userData.id,
                    headers: { 
                    'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                    },
                    data : data
                };
                axios(config)
                .then(response => {
                    console.log(response)
                    // Notice: Success message here, delay ???
                    this.$router.go()
                })
                .catch(error => {
                    console.log(error);
                });
            }
        }
    }
    };
</script>
