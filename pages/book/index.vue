<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Danh sách sách</h3>
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
              <v-btn text color='primary' @click='showUserInsertDialog = true'>
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
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.publisher.name }}</td>
                  <td>{{ props.item.category.name }}</td>
                  <td>{{ loadAuthors(props.item.authors) }}</td>
                  <td>{{ props.item.count }}</td>
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
              <v-dialog v-model="showUserInsertDialog" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                    <span class="headline">Thêm mới sách</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                      <v-container grid-list-md>
                          <v-form ref="form">
                              <v-card-text>
                                  <v-row>
                                  <v-col cols="12" sm="6">
                                      <v-text-field v-model="bookData.name" label="Họ và tên" />
                                  </v-col>
                                  </v-row>
                                  <v-row>
                                  <v-col cols="12" sm="6">
                                      <v-text-field type="email" v-model="bookData.email" label="Email"/>
                                  </v-col>
                                  </v-row>
                                  <v-row>
                                  <v-col cols="12" sm="6">
                                      <v-text-field v-model="bookData.phone" label="Số điện thoại" />
                                  </v-col>
                                  </v-row>
                                  <v-row>
                                  <v-col cols="12" sm="6">
                                      <v-text-field type="date" v-model="bookData.birthday" label="Ngày sinh"/>
                                  </v-col>
                                  </v-row>
                                  <v-row>
                                  <v-col cols="12" sm="6">
                                      <v-select
                                      v-model="bookData.gender"
                                      :items="gender"
                                      item-text="gender"
                                      item-value="gender"
                                      label="Giới tính"
                                      persistent-hint
                                      single-line
                                      ></v-select>
                                  </v-col>
                                  </v-row>
                                  <v-row>
                                  <v-col cols="12" sm="6">
                                      <v-text-field type="text" v-model="bookData.addr" label="Địa chỉ"/>
                                  </v-col>
                                  </v-row>
                              </v-card-text>
                          </v-form>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="error"
                      text
                      @click="closeInsertDialog()"
                    >
                      Hủy bỏ
                    </v-btn>
                    <v-btn
                      color="success"
                      text
                      @click="insertConfirm()"
                    >
                      Thêm mới
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </template>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    layout: 'dashboard',
    data() {
      return {
        search: '',
        listData: [],
        defaultDate: new Date().toLocaleDateString('en-CA'),
        bookData: {
            "id": -1,
            "createdBy": 1,
            "createdAt": "2022-03-17T16:01:27",
            "updatedBy": 1,
            "updatedAt": "2022-03-17T16:01:27",
            "name": "CSDL",
            "image": "book.jpeg",
            "count": 10,
            "publishAt": 0,
            "content": "string",
            "category": {
                "id": 4,
                "createdBy": 1,
                "createdAt": "2022-03-17T15:56:43",
                "updatedBy": 1,
                "updatedAt": "2022-03-17T15:56:43",
                "name": "Van hoc"
            },
            "publisher": {
                "id": 4,
                "createdBy": 1,
                "createdAt": "2022-03-17T16:01:05",
                "updatedBy": 1,
                "updatedAt": "2022-03-17T16:01:05",
                "name": "HCM"
            },
            "authors": [
                {
                "id": 4,
                "createdBy": 1,
                "createdAt": "2022-03-17T15:55:49",
                "updatedBy": 1,
                "updatedAt": "2022-03-17T15:55:49",
                "name": "Huy Can"
                }
            ]
        },
        showDialogDeleteConfirm: false,
        showbookDataDialog: false,
        showUserInsertDialog: false,
        currentSelectedUser: -1,
        complex: {
          selected: [],
          headers: [
            {
              text: '#',
              value: 'id'
            },
            {
              text: 'Tên sách',
              value: 'name'
            },
            {
              text: 'Nhà xuất bản',
              value: 'publisher'
            },
            {
              text: 'Thể loại',
              value: 'category'
            },
            {
              text: 'Tác giả',
              value: 'author'
            },
            {
              text: 'Số lượng',
              value: 'count'
            },
            {
              text: 'Chức năng',
              value: 'action'
            },
          ],
        },
      };
    },
    mounted () {
      this.initialize()
    },
    methods: {
        loadAuthors(object){
            var resultString = "";
            for(let i = 0; i < object.length; i++){
                resultString += object[i].name + " ";
            }
            return resultString;
        },
        setToDefault(){
            this.bookData = {
                "id": -1,
                "createdBy": 1,
                "createdAt": "2022-03-17T16:01:27",
                "updatedBy": 1,
                "updatedAt": "2022-03-17T16:01:27",
                "name": "CSDL",
                "image": "book.jpeg",
                "count": 10,
                "publishAt": 0,
                "content": "string",
                "category": {
                    "id": 4,
                    "createdBy": 1,
                    "createdAt": "2022-03-17T15:56:43",
                    "updatedBy": 1,
                    "updatedAt": "2022-03-17T15:56:43",
                    "name": "Van hoc"
                },
                "publisher": {
                    "id": 4,
                    "createdBy": 1,
                    "createdAt": "2022-03-17T16:01:05",
                    "updatedBy": 1,
                    "updatedAt": "2022-03-17T16:01:05",
                    "name": "HCM"
                },
                "authors": [
                    {
                    "id": 4,
                    "createdBy": 1,
                    "createdAt": "2022-03-17T15:55:49",
                    "updatedBy": 1,
                    "updatedAt": "2022-03-17T15:55:49",
                    "name": "Huy Can"
                    }
                ]
            }
        },
        validate(object){
            delete object.img;
            return Object.values(object).every(x => x === null || x === '');
        },
        initialize () {
            var data = '';
            var config = {
            method: 'get',
            url: 'https://ptdapmback.herokuapp.com/v1/api/books?page=0&limit=100&sort=id',
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
            url: 'https://ptdapmback.herokuapp.com/v1/api/books/' + userId,
            headers: { 
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
            }
            };
            axios(config)
            .then(response => {
            console.log(JSON.stringify(response.data));
            this.currentSelectedUser = response.data.id;
            this.bookData = response.data;
            this.showbookDataDialog = true;
            })
            .catch(error => {
            console.log(error);
            });
        },
        insertConfirm(){
            console.log(this.bookData);
            if(this.bookData != null && !this.validate(this.bookData)){
            var data = JSON.stringify(this.bookData);
            console.log(data);
            console.log(this.validate(this.bookData));
            var config = {
                method: 'post',
                url: 'https://ptdapmback.herokuapp.com/v1/api/books/',
                headers: { 
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
                },
                data : data
            };
            axios(config)
            .then(response => {
                console.log(response)
                // Notice: Success message here, delay ???
                this.setToDefault();
                this.showUserInsertDialog = false;
                this.$router.go()
            })
            .catch(error => {
                console.log(error);
            });
            }
        },
        closeInsertDialog(){
            this.setToDefault();
            this.showUserInsertDialog = false;
        },
        update(){
            console.log(this.bookData);
            if(this.bookData != null){
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
            var data = JSON.stringify(this.bookData);

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
                this.showbookDataDialog = false
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
                this.showDialogDeleteConfirm = false;
                this.$router.go();
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
