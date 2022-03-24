<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Danh sách thể loại</h3>
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
              <v-btn text color="primary" @click="showInsertDialog = true">
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
                  <td>{{ props.item.createdAt }}</td>
                  <td>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="orange"
                      small
                      @click="getDetail(props.item.id, 'update')"
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="pink"
                      small
                      @click="getDetail(props.item.id, 'delete')"
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
              v-model="showDeleteDialog"
              persistent
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="headline">Xóa thể loại</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-spacer></v-spacer>
                <v-card-text class="d-flex justify-center">
                  <h4 class="d-inline-block">
                    Chắc chắn muốn xóa thể loại này ?
                  </h4>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="error"
                    text
                    @click="closeDialog('delete')"
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
              v-model="showInsertDialog"
              persistent
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="headline">Thêm mới thể loại</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-form ref="form">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              ref="name"
                              v-model="defaultData.name"
                              label="Tên thể loại"
                              maxlength="50"
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
              v-model="showUpdateDialog"
              persistent
              max-width="500px"
            >
              <v-card>
                <v-card-title>
                  <span class="headline">Chỉnh sửa thông tin</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-form ref="form">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              ref="name"
                              v-model="defaultData.name"
                              label="Tên thể loại"
                              maxlength="50"
                            />
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-form>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="closeDialog('update')">
                    Hủy bỏ
                  </v-btn>
                  <v-btn color="success" text @click="updateConfirm()">
                    Chỉnh sửa
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
import axios from "axios";
export default {
  layout: "dashboard",
  data() {
    return {
      search: "",
      listData: [],
      defaultDate: new Date().toLocaleDateString("en-CA"),
      defaultData: {
        createdAt: "",
        createdBy: 0,
        id: 0,
        name: "",
        updatedAt: "",
        updatedBy: 0
      },
      showDetailDialog: false,
      showInsertDialog: false,
      showUpdateDialog: false,
      showDeleteDialog: false,
      complex: {
        selected: [],
        headers: [
          {
            text: "#",
            value: "id",
          },
          {
            text: "Tên thể loại",
            value: "name",
          },
          {
            text: "Ngày thêm mới",
            value: "createdAt",
          },
          {
            text: "Chức năng",
            value: "action",
          },
        ],
      },
    };
  },
  mounted() {
    this.initialize();
  },
  methods: {
    standardDateFormat(date){
      return new Date(date).toLocaleDateString('en-GB');
    },
    validate(){
        var name = this.defaultData.name;
        if(name.trim() == "" || name.trim() == null || !/^[a-zA-Z_ ]*$/.test(name.trim())){
          this.$toasted.error("Tên thể loại không hợp lệ").goAway(3000);
          this.$refs["name"].$refs.input.focus();
          return false;
        }
        return true;
    },
    setToDefault() {
      this.defaultData = {
        createdAt: "",
        createdBy: 0,
        id: 0,
        name: "",
        updatedAt: "",
        updatedBy: 0
      }
    },
    initialize() {
        var accessToken = localStorage.getItem("accessToken");
        var config = {
          method: "get",
          url: "https://ptdapmback.herokuapp.com/v1/api/categories?page=0&limit=100&sort=id",
          headers: {
            'Authorization': 'Bearer ' + accessToken,
          },
        };

      axios(config)
        .then((response) => {
            this.listData = response.data.content;
        })
        .catch((error) => {
            console.log(error);
        });
    },
    getDetail(objectId, requestType) {
      var config = {
        method: "get",
        url: "https://ptdapmback.herokuapp.com/v1/api/categories/" + objectId,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.currentSelectedObjectId = response.data.id;
          this.defaultData = response.data;
          if(requestType == 'update'){
            this.showUpdateDialog = true;
          }else if(requestType == 'detail'){
            this.showDetailDialog = true;
          }else if(requestType == 'delete'){
            this.showDeleteDialog = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    insertConfirm() {
      console.log(JSON.stringify(this.defaultData));
      if (this.defaultData != null && this.validate()) {
        var data = JSON.stringify(this.defaultData);
        console.log(data);
        // console.log(this.validate(this.defaultData));
        var config = {
          method: "post",
          url: "https://ptdapmback.herokuapp.com/v1/api/categories/",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem("accessToken"),
          },
          data: data,
        };
        axios(config)
          .then((response) => {
            console.log(response);
            // Notice: Success message here, delay ???
            this.setToDefault();
            this.showInsertDialog = false;
            this.$toasted.success("Thêm thể loại thành công").goAway(3000);
            this.$router.go();
          })
          .catch((error) => {
            console.log();
            this.$toasted.error(error.response.data.apierror.debugMessage).goAway(3000);
            this.$refs["name"].$refs.input.focus();
          });
      }
    },
    closeDialog(requestType) {
      this.setToDefault();
      if(requestType == 'update'){
        this.showUpdateDialog = false;
      }else if(requestType == 'insert'){
        this.showInsertDialog = false;
      }else if(requestType == 'delete'){
        this.showDeleteDialog = false;
      }
    },
    updateConfirm() {
      if (this.defaultData != null && this.validate()) {

        var data = JSON.stringify(this.defaultData);
        console.log(data);
        var accessToken = localStorage.getItem("accessToken");
        var config = {
          method: "put",
          url:
            "https://ptdapmback.herokuapp.com/v1/api/categories/" + this.defaultData.id,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken,
          },
          data: data,
        };
        axios(config)
          .then((response) => {
            console.log(response);
            //Notice: Success message here, delay ???
            this.showdefaultDataDialog = false;
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    removeConfirm() {
      if (this.defaultData.id > 0) {
        var config = {
            method: 'delete',
            url: "https://ptdapmback.herokuapp.com/v1/api/categories/" + this.defaultData.id,
            headers: { 
              "Authorization": "Bearer " + localStorage.getItem("accessToken")
            },
        };
        axios(config)
          .then(response => {
            console.log(response);
            this.showDeleteDialog = false;
            this.$router.go();
            //Notice: Do some thing to remove datatable data
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        this.showDeleteDialog = false;
      }
    },
  },
};
</script>
  