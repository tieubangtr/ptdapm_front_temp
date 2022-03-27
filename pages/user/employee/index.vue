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
              <v-btn text color="primary" @click="showUserInsertDialog = true">
                <v-icon>add</v-icon>
                Thêm
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="complex.headers"
                :search="search"
                :items="listData"
                :items-per-page="20"
                class="elevation-1"
                item-key="name"
              >
                <template slot="items" slot-scope="props">
                  <td>{{ props.item.id }}</td>
                  <td>{{ props.item.name }}</td>
                  <td>{{ props.item.email }}</td>
                  <td>{{ props.item.phone }}</td>
                  <td>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="primary"
                      small
                      @click="getDetail(props.item.id)"
                    >
                      <v-icon>info</v-icon>
                    </v-btn>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="pink"
                      small
                      @click="remove(props.item.id)"
                    >
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
            <v-dialog
              v-model="showUserDeleteDialog"
              persistent
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="headline">Xóa nhân viên</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-spacer></v-spacer>
                <v-card-text class="d-flex justify-center">
                  <h4 class="d-inline-block">
                    Chắc chắn muốn xóa nhân viên này khỏi hệ thống ?
                  </h4>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="error"
                    text
                    @click="showUserDeleteDialog = false"
                  >
                    Hủy bỏ
                  </v-btn>
                  <v-btn color="primary" text @click="removeConfirm()">
                    Xác nhận
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="showUserInsertDialog"
              persistent
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="headline">Thêm mới nhân viên</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-form ref="form">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="userData.name"
                              label="Họ và tên"
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              type="email"
                              v-model="userData.email"
                              label="Email"
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="userData.phone"
                              maxlength="10"
                              label="Số điện thoại"
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              type="date"
                              v-model="userData.birthday"
                              label="Ngày sinh"
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="userData.gender"
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
                            <v-text-field
                              type="text"
                              v-model="userData.addr"
                              label="Địa chỉ"
                            />
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="closeDialog('insert')">
                    Hủy bỏ
                  </v-btn>
                  <v-btn color="success" text @click="insertConfirm()">
                    Thêm
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog
              v-model="showUserDetailDialog"
              persistent
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="headline">Thông tin nhân viên</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-form ref="form">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="userData.name"
                              label="Họ và tên"
                              readonly
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              type="email"
                              v-model="userData.email"
                              label="Email"
                              readonly
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="userData.phone"
                              label="Số điện thoại"
                              maxlength="10"
                              readonly
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              type="date"
                              v-model="userData.birthday"
                              label="Ngày sinh"
                              readonly
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="userData.gender"
                              :items="gender"
                              item-text="gender"
                              item-value="gender"
                              label="Giới tính"
                              persistent-hint
                              single-line
                              readonly
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              type="text"
                              v-model="userData.addr"
                              label="Địa chỉ"
                              readonly
                            />
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="closeDialog('detail')">
                    Đóng
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
import UserDataForm from "@/components/user/UserDataForm";
import UserAdd from "@/components/user/UserAdd";
import axios from "axios";
export default {
  layout: "dashboard",
  data() {
    return {
      search: "",
      listData: [],
      defaultDate: new Date().toLocaleDateString("en-CA"),
      userData: {
        addr: "",
        birthday: this.defaultDate,
        email: "",
        gender: "",
        id: 0,
        img: "null",
        name: "",
        noneLocked: true,
        password: "1234567",
        phone: "",
        roles: [
          {
            id: 1,
          },
        ],
      },
      gender: ["Nam", "Nữ"],
      showUserInsertDialog: false,
      showUserDetailDialog: false,
      showUserDeleteDialog: false,
      currentSelectedUser: -1,
      complex: {
        selected: [],
        headers: [
          {
            text: "#",
            value: "id",
          },
          {
            text: "Họ và tên",
            value: "name",
          },
          {
            text: "Email",
            value: "email",
          },
          {
            text: "Số điện thoại",
            value: "phone",
          },
          {
            text: "Chức năng",
            value: "action",
          },
        ],
      },
    };
  },
  components: {
    UserDataForm,
    UserAdd,
  },
  mounted() {
    this.initialize();
  },
  methods: {
    setToDefault() {
      this.userData = {
        addr: "",
        birthday: "2022-03-12",
        email: "",
        gender: "",
        id: 0,
        img: "null",
        name: "",
        noneLocked: true,
        password: "1234567",
        phone: "",
        roles: [
          {
            id: 1,
            name: "ROLE_ADMIN",
          },
        ],
      };
    },
    validate() {
      if (this.userData.addr == "" || this.userData.addr == null) {
        this.$toasted.error("Địa chỉ không hợp lệ").goAway(2000);
        return false;
      } else if (
        this.userData.birthday == "" ||
        this.userData.birthday == null
      ) {
        this.$toasted.error("Ngày sinh không hợp lệ").goAway(2000);
        return false;
      } else if (this.userData.phone == "" || this.userData.phone.length > 10) {
        this.$toasted.error("Số điện thoại không hợp lệ").goAway(2000);
        return false;
      } else if (this.userData.email == "" || this.userData.email == null) {
        this.$toasted.error("Email không hợp lệ").goAway(2000);
        return false;
      } else if (this.userData.name == "" || this.userData.name == null) {
        this.$toasted.error("Họ và tên không hợp lệ").goAway(2000);
        return false;
      } else if (this.userData.gender == "" || this.userData.gender == null) {
        this.$toasted.error("Giới tính không hợp lệ").goAway(2000);
        return false;
      }
      return true;
    },
    initialize() {
      var data = "";
      var config = {
        method: "get",
        url: "https://ptdapmback.herokuapp.com/v1/api/users?page=0&limit=10&sort=id&filter-field=roles.id&filter-operator=EQUALS&filter-value=1",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          this.listData = response.data.content;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetail(userId) {
      var config = {
        method: "get",
        url: "https://ptdapmback.herokuapp.com/v1/api/users/" + userId,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.currentSelectedUser = response.data.id;
          this.userData = response.data;
          this.showUserDetailDialog = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    insertConfirm() {
      if (this.userData != null && this.validate()) {
        this.userData.name = this.userData.name.trim();
        var data = JSON.stringify(this.userData);
        console.log(data);
        var config = {
          method: "post",
          url: "https://ptdapmback.herokuapp.com/v1/api/users/",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          data: data,
        };
        axios(config)
          .then((response) => {
            console.log(response);
            // Notice: Success message here, delay ???
            this.setToDefault();
            this.$toasted.success("Thêm mới nhân viên thành công").goAway(2000);
            this.showUserInsertDialog = false;
            this.$router.go();
          }).catch((error) =>{
            console.log(error.response.data);
            if(error.response.data.apierror.debugMessage != ''){
                console.log(error.response.data.apierror.debugMessage);
                this.$toasted.error(error.response.data.apierror.debugMessage).goAway(3000);
              }else{
                this.$toasted
              .error("Thêm mới không thành công, đã có lỗi xảy ra")
              .goAway(3000);
              }
          })
      } else {
        this.$toasted.error("Thêm mới nhân viên thất bại, xin hãy thử lại").goAway(3000);
      }
    },
    closeDialog(requestType) {
      this.setToDefault();
      if (requestType == "detail") {
        this.showUserDetailDialog = false;
      } else if (requestType == "insert") {
        this.showUserInsertDialog = false;
      } else if (requestType == "delete") {
        this.showUserDeleteDialog = false;
      }
    },
    remove(userId) {
      this.showUserDeleteDialog = true;
      this.currentSelectedUser = userId;
      console.log(userId);
      console.log(this.currentSelectedUser);
    },
    removeConfirm() {
      if (this.currentSelectedUser > 0) {
        var config = {
          method: "delete",
          url:
            "https://ptdapmback.herokuapp.com/v1/api/users/" +
            this.currentSelectedUser,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        };
        axios(config)
          .then((response) => {
            console.log(response);
            this.$toasted.success("Xóa nhân viên thành công").goAway(3000);
            this.showUserDeleteDialog = false;
            this.$router.go();
            //Notice: Do some thing to remove datatable data
          })
          .catch((error) => {
            console.log(error.response.data);
            if(error.response.data.apierror.debugMessage != ''){
              this.$toasted.error(error.response.data.apierror.debugMessage).goAway(3000);
            }else{
              this.$toasted
            .error("Xóa nhân viên không thành công, đã có lỗi xảy ra")
            .goAway(3000);
            }
            this.showUserDeleteDialog = false;
          });
      } else {
        this.showUserDeleteDialog = false;
      }
    },
  },
};
</script>
