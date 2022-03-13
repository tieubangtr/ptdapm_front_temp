<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Danh sách nhân viên</h3>
        </v-flex>
        <v-flex lg12>
          <v-card>
            <v-toolbar card color="white">
              <v-text-field
                flat
                solo
                prepend-icon="search"
                placeholder="Tìm kiếm..."
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <v-btn text color='primary' @click='showUserDataDialog = true'>
                <v-icon>add</v-icon>
                Thêm mới
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="listData"
                class="elevation-1"
                item-key="name"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.id }}</td>
                  <td>
                    <v-avatar size="32">
                      <img v-if="props.item.avatar != null" :src="props.item.avatar" alt="">
                      <img v-else src="~/static/img/images.jpg" alt="">
                    </v-avatar>
                  </td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.phone }}</td>
                  <td>
                    <v-btn depressed outline icon fab dark color="primary" small @click="getDetail(props.item.id)">
                      <v-icon>visibility</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="orange" small @click="getDetail(props.item.id)">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn depressed outline icon fab dark color="pink" small @click="remove(props.item.id)"> 
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
          <!-- Delete user dialog -->
          <template>
              <!-- Confirm dialog -->
              <v-dialog v-model="showDialogDeleteConfirm" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Xóa người dùng</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-spacer></v-spacer>
                  <v-card-text class="d-flex justify-center">
                    <h4 class="d-inline-block">Xóa xong thì là mất, đừng có đi tìm nhé ?</h4>
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error"
                      text
                      @click="showDialogDeleteConfirm = false"
                    >
                      Hủy bỏ
                    </v-btn>
                    <v-btn
                      color="primary"
                      text
                      @click="removeConfirm()"
                    >
                      Xác nhận
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <UserDataForm :visible="showUserDataDialog" @close="showUserDataDialog = false" />
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import {Items as Users} from '@/api/user';
  import UserDataForm from '@/components/user/UserDataForm'
  import axios from 'axios';
  export default {
    layout: 'dashboard',
    data() {
      return {
        search: '',
        listData: [],
        userData: {
          "addr": "",
          "birthday": "",
          "email": "",
          "gender": "",
          "name": "",
          "password": "1234567",
          "phone": ""
        },
        gender: [
          { gId: '0', gender: 'Nam' },
          { gId: '1', gender: 'Nữ' },
        ],
        showDialogDeleteConfirm: false,
        showUserDataDialog: false,
        currentSelectedUser: -1,
        complex: {
          selected: [],
          headers: [
            {
              text: '#',
              value: 'id'
            },
            {
              text: 'Ảnh đại diện',
              value: 'avatar'
            },
            {
              text: 'Họ và tên',
              value: 'name'
            },
            {
              text: 'Email',
              value: 'email'
            },
            {
              text: 'Số điện thoại',
              value: 'phone'
            },
            {
              text: 'Chức năng',
              value: 'action'
            },
          ],
        },
      };
    },
    components:{
      UserDataForm
    },
    mounted () {
      this.initialize()
    },
    methods: {
      initialize () {
        var data = '';
        var config = {
          method: 'get',
          url: 'https://ptdapmback.herokuapp.com/v1/api/users?page=0&limit=10&sort=id&filter-field=roles.id&filter-operator=EQUALS&filter-value=3',
          headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
          },
          data : data
        };

        axios(config)
        .then(response => {
          this.listData = response.data.content
        })
        .catch(error => {
          console.log(error);
        });
      },
      getDetail(userId){
        var config = {
          method: 'get',
          url: 'https://ptdapmback.herokuapp.com/v1/api/users/' + userId,
          headers: { 
            'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
          }
        };
        axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.currentSelectedUser = response.data.id;
          this.userData = response.data;
          this.showUserDataDialog = true;
        })
        .catch(error => {
          console.log(error);
        });
      },
      insert(){
        console.log(this.userData);
        // if(this.userData != null){
        //   // var data = JSON.stringify({
        //   //   "addr": "string",
        //   //   "birthday": "2022-03-12",
        //   //   "email": "string",
        //   //   "gender": "string",
        //   //   "id": 0,
        //   //   "img": "null",
        //   //   "name": "string",
        //   //   "noneLocked": true,
        //   //   "password": "string",
        //   //   "phone": "string",
        //   //   "roles": [
        //   //     {
        //   //       "id": 0,
        //   //       "name": "ROLE_USER"
        //   //     }
        //   //   ]
        //   // });
        //   var data = JSON.stringify(this.userData);

        //   var config = {
        //     method: 'post',
        //     url: 'https://ptdapmback.herokuapp.com/v1/api/users/',
        //     headers: { 
        //       'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
        //     },
        //     data : data
        //   };
        //   axios(config)
        //   .then(response => {
        //     console.log(response)
        //     //Notice: Success message here, delay ???
        //     this.userDataDialog = false
        //     this.$router.go()
        //   })
        //   .catch(error => {
        //     console.log(error);
        //   });
        // }
      },
      update(){
        console.log(this.userData);
        if(this.userData != null){
          // var data = JSON.stringify({
          //   "addr": "string",
          //   "birthday": "2022-03-12",
          //   "email": "string",
          //   "gender": "string",
          //   "id": 0,
          //   "img": "null",
          //   "name": "string",
          //   "noneLocked": true,
          //   "password": "string",
          //   "phone": "string",
          //   "roles": [
          //     {
          //       "id": 0,
          //       "name": "ROLE_USER"
          //     }
          //   ]
          // });
          var data = JSON.stringify(this.userData);

          var config = {
            method: 'put',
            url: 'https://ptdapmback.herokuapp.com/v1/api/users/' + this.currentSelectedUser,
            headers: { 
              'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            },
            data : data
          };
          axios(config)
          .then(response => {
            console.log(response)
            //Notice: Success message here, delay ???
            this.showUserDataDialog = false
            this.$router.go()
          })
          .catch(error => {
            console.log(error);
          });
        }
      },
      remove(userId){
        this.showDialogDeleteConfirm = true
        this.currentSelectedUser = userId
        console.log(userId);
        console.log(this.currentSelectedUser)
      },
      removeConfirm(){
        if(this.currentSelectedUser > 0){
          var config = {
            method: 'delete',
            url: 'https://ptdapmback.herokuapp.com/v1/api/users/' + this.currentSelectedUser,
            headers: { 
              'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
          };
          axios(config)
          .then(response => {
            console.log(response)
            this.showDialogDeleteConfirm = false
            //Notice: Do some thing to remove datatable data
          })
          .catch(error => {
            console.log(error);
          });
        }else{
          this.showDialogDeleteConfirm = false
        }
      },
    },
  }
</script>
