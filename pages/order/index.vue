<template>
  <div id="pageTable">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12>
          <h3>Danh sách phiếu Mượn trả</h3>
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
                  <td>{{ props.item.user.name }}</td>
                  <td>{{ props.item.borrowingItems.length }}</td>
                  <td>{{ props.item.borrowedDate }}</td>
                  <td v-if="props.item.status == 0" class="orange--text">
                    Chờ xác nhận
                  </td>
                  <td v-else-if="props.item.status == 1" class="green--text">
                    Đã xác nhận
                  </td>
                  <td v-else-if="props.item.status == 2" class="red--text">
                    Đã từ chối
                  </td>
                  <td>
                      <v-btn
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="primary"
                      small
                      @click="getDetail(props.item.id, 'detail')"
                    >
                      <v-icon>info</v-icon>
                    </v-btn>
                    <v-btn v-if="props.item.status == 0"
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="success"
                      small
                      @click="getDetail(props.item.id, 'accept')"
                    >
                      <v-icon>check</v-icon>
                    </v-btn>
                    <v-btn v-if="props.item.status == 0"
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="pink"
                      small
                      @click="getDetail(props.item.id, 'reject')"
                    >
                      <v-icon>close</v-icon>
                    </v-btn>
                    <v-btn v-if="props.item.status == 1"
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
                    <v-btn v-if="props.item.status == 2"
                      depressed
                      outline
                      icon
                      fab
                      dark
                      color="red"
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
          <template>
            <template>
              <v-layout row justify-center>
                <v-dialog
                  v-model="showAcceptDialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="showAcceptDialog = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Thông tin phiếu mượn</v-toolbar-title>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn dark flat @click="acceptConfirm()"
                          >Xác nhận phiếu</v-btn
                        >
                      </v-toolbar-items>
                    </v-toolbar>
                    <v-layout row>
                      <v-flex xs5>
                        <v-list three-line subheader>
                          <v-subheader>Thông tin chung</v-subheader>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Họ và tên độc giả:
                                {{ defaultData.user.name }}</v-list-tile-title
                              >
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Ngày tạo phiếu:
                                {{
                                  defaultData.borrowedDate
                                }}</v-list-tile-title
                              >
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Số lượng sách mượn:
                                {{
                                  defaultData.borrowingItems.length
                                }}</v-list-tile-title
                              >
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Trạng thái phiếu:
                                <span class="orange--text">Chờ duyệt</span>
                              </v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                      <v-flex xs7>
                        <v-list three-line subheader>
                          <v-subheader>Thông tin sách</v-subheader>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-card
                                v-for="item in defaultData.borrowingItems"
                                :key="item.id"
                                row
                              >
                                <v-layout>
                                  <v-flex xs7>
                                    <v-card-title primary-title>
                                      <div>
                                        <div class="headline">
                                          {{ item.book.name }}
                                        </div>
                                        <div>
                                          {{ item.book.category.name }}
                                        </div>
                                        <div>{{ item.book.publishAt }}</div>
                                      </div>
                                    </v-card-title>
                                  </v-flex>
                                  <v-flex xs5>
                                    <v-img
                                      :src="
                                        'https://ptdapmback.herokuapp.com/v1/api/auth/files/' +
                                        item.book.image
                                      "
                                      height="125px"
                                      contain
                                    ></v-img>
                                  </v-flex>
                                </v-layout>
                                <v-divider light></v-divider>
                                <v-card-actions>
                                  <v-layout row>
                                    <v-flex xs8>
                                      <h4>Trạng thái</h4>
                                    </v-flex>
                                    <v-flex xs4>
                                      <v-btn color="warning">Chờ duyệt</v-btn>
                                    </v-flex>
                                  </v-layout>
                                </v-card-actions>
                              </v-card>
                              <v-spacer></v-spacer>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-dialog>
              </v-layout>
            </template>
                        <template>
              <v-layout row justify-center>
                <v-dialog
                  v-model="showDetailDialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="showDetailDialog = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Thông tin phiếu mượn</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-layout row>
                      <v-flex xs5>
                        <v-list three-line subheader>
                          <v-subheader>Thông tin chung</v-subheader>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Họ và tên độc giả:
                                {{ defaultData.user.name }}</v-list-tile-title
                              >
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Ngày tạo phiếu:
                                {{
                                  defaultData.borrowedDate
                                }}</v-list-tile-title
                              >
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Số lượng sách mượn:
                                {{
                                  defaultData.borrowingItems.length
                                }}</v-list-tile-title
                              >
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Trạng thái phiếu:
                                <span v-if="defaultData.status == 0" class="orange--text">Chờ duyệt</span>
                                <span v-else-if="defaultData.status == 1" class="green--text">Đã xác nhận</span>
                                <span v-else-if="defaultData.status == 2" class="red--text">Bị từ chối</span>
                              </v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                      <v-flex xs7>
                        <v-list three-line subheader>
                          <v-subheader>Thông tin sách</v-subheader>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-card
                                v-for="item in defaultData.borrowingItems"
                                :key="item.id"
                                row
                              >
                                <v-layout>
                                  <v-flex xs7>
                                    <v-card-title primary-title>
                                      <div>
                                        <div class="headline">
                                          {{ item.book.name }}
                                        </div>
                                        <div>
                                          {{ item.book.category.name }}
                                        </div>
                                        <div>{{ item.book.publishAt }}</div>
                                      </div>
                                    </v-card-title>
                                  </v-flex>
                                  <v-flex xs5>
                                    <v-img
                                      :src="
                                        'https://ptdapmback.herokuapp.com/v1/api/auth/files/' +
                                        item.book.image
                                      "
                                      height="125px"
                                      contain
                                    ></v-img>
                                  </v-flex>
                                </v-layout>
                                <v-divider light></v-divider>
                                <v-card-actions>
                                  <v-layout row>
                                    <v-flex xs8>
                                      <h4>Trạng thái</h4>
                                    </v-flex>
                                    <v-flex xs4>
                                      <v-btn color="warning">Chờ duyệt</v-btn>
                                    </v-flex>
                                  </v-layout>
                                </v-card-actions>
                              </v-card>
                              <v-spacer></v-spacer>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-dialog>
              </v-layout>
            </template>
            <template>
              <v-layout row justify-center>
                <v-dialog
                  v-model="showUpdateDialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <v-card>
                    <v-toolbar dark color="primary">
                      <v-btn icon dark @click="showUpdateDialog = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                      <v-toolbar-title>Thông tin phiếu mượn</v-toolbar-title>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-layout row>
                      <v-flex xs5>
                        <v-list three-line subheader>
                          <v-subheader>Thông tin chung</v-subheader>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Họ và tên độc giả:
                                {{ defaultData.user.name }}</v-list-tile-title
                              >
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Ngày tạo phiếu:
                                {{
                                  defaultData.borrowedDate
                                }}</v-list-tile-title
                              >
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Số lượng sách mượn:
                                {{
                                  defaultData.borrowingItems.length
                                }}</v-list-tile-title
                              >
                            </v-list-tile-content>
                          </v-list-tile>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title
                                >Trạng thái phiếu:
                                <span class="green--text">Đã xác nhận</span>
                              </v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                      <v-flex xs7>
                        <v-list three-line subheader>
                          <v-subheader>Thông tin sách mượn</v-subheader>
                          <v-list-tile>
                            <v-layout
                              v-for="item in defaultData.borrowingItems"
                              :key="item.id"
                              row
                              wrap
                              class="cartProduct x-grid-lg"
                            >
                              <v-flex lg2 sm12 xs12 class="pa-2">
                                <div class="outImg">
                                  <img
                                    :src="
                                      'https://ptdapmback.herokuapp.com/v1/api/auth/files/' +
                                      item.book.image
                                    "
                                    alt="ảnh Sách"
                                    class="img"
                                  />
                                </div>
                              </v-flex>
                              <v-flex lg10 sm12 xs12 class="infoCart pa-2">
                                <h3 class="name">{{ item.book.name }}</h3>
                                <span class="author">{{
                                  item.book.category.name
                                }}</span>
                                <span class="author">{{
                                  item.book.publishAt
                                }}</span>
                                <v-btn
                                  v-if="item.status == true"
                                  color="success"
                                  disabled
                                  >Đã trả</v-btn
                                >
                                <v-btn
                                  v-else
                                  color="cyan"
                                  @click="updateConfirm(item.id)"
                                  >Trả sách</v-btn
                                >
                              </v-flex>
                            </v-layout>
                            <v-spacer></v-spacer>
                          </v-list-tile>
                        </v-list>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-dialog>
              </v-layout>
            </template>
            <template>
              <v-dialog v-model="showRejectDialog" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Từ chối phiếu mượn trả</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-spacer></v-spacer>
                  <v-card-text class="d-flex justify-center">
                    <h4 class="d-inline-block">
                      Chắc chắn muốn từ chối phiếu mượn trả này ?
                    </h4>
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeDialog('reject')">
                      Hủy bỏ
                    </v-btn>
                    <v-btn color="primary" text @click="rejectConfirm()">
                      Xác nhận
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
            <template>
              <v-dialog v-model="showDeleteDialog" persistent max-width="500px">
                <v-card>
                  <v-card-title>
                    <span class="headline">Xóa phiếu mượn trả</span>
                  </v-card-title>
                  <v-divider></v-divider>
                  <v-spacer></v-spacer>
                  <v-card-text class="d-flex justify-center">
                    <h4 class="d-inline-block">
                      Chắc chắn muốn xóa phiếu mượn trả này ?
                    </h4>
                  </v-card-text>
                  <v-spacer></v-spacer>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeDialog('delete')">
                      Hủy bỏ
                    </v-btn>
                    <v-btn color="primary" text @click="deleteConfirm()">
                      Xác nhận
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </template>
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
      defaultData: {
        borrowedDate: "yyyy-MM-dd",
        borrowingItems: [
          {
            book: {
              authors: [
                {
                  createdAt: "dd-MM-yyyy hh:mm:ss",
                  createdBy: 0,
                  id: 0,
                  name: "string",
                  updatedAt: "dd-MM-yyyy hh:mm:ss",
                  updatedBy: 0,
                },
              ],
              category: {
                createdAt: "dd-MM-yyyy hh:mm:ss",
                createdBy: 0,
                id: 0,
                name: "string",
                updatedAt: "dd-MM-yyyy hh:mm:ss",
                updatedBy: 0,
              },
              content: "string",
              count: 0,
              createdAt: "2022-03-20T06:15:45.024Z",
              createdBy: 0,
              id: 0,
              image: "string",
              name: "string",
              publishAt: 0,
              publisher: {
                createdAt: "dd-MM-yyyy hh:mm:ss",
                createdBy: 0,
                id: 0,
                name: "string",
                updatedAt: "dd-MM-yyyy hh:mm:ss",
                updatedBy: 0,
              },
              updatedAt: "2022-03-20T06:15:45.024Z",
              updatedBy: 0,
            },
            borrowingId: 0,
            id: 0,
            note: "string",
            payday: "2022-03-20",
            status: true,
          },
        ],
        id: 0,
        status: 0,
        user: {
          addr: "string",
          birthday: "2022-03-20",
          createdAt: "dd-MM-yyyy hh:mm:ss",
          createdBy: 0,
          email: "string",
          gender: "string",
          id: 0,
          img: "string",
          name: "string",
          noneLocked: true,
          password: "string",
          phone: "string",
          roles: [
            {
              id: 0,
              name: "ROLE_USER",
            },
          ],
          updatedAt: "dd-MM-yyyy hh:mm:ss",
          updatedBy: 0,
        },
      },
      showDetailDialog: false,
      showAcceptDialog: false,
      showRejectDialog: false,
      showDeleteDialog: false,
      showUpdateDialog: false,
      complex: {
        selected: [],
        headers: [
          {
            text: "Mã phiếu mượn",
            value: "id",
          },
          {
            text: "Tên độc giả",
            value: "userName",
          },
          {
            text: "Số lượng sách",
            value: "count",
          },
          {
            text: "Ngày tạo phiếu",
            value: "createdDate",
          },
          {
            text: "Trạng thái",
            value: "status",
          },
          ,
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
    loadAuthors(object) {
      var resultString = "";
      for (let i = 0; i < object.length; i++) {
        resultString += object[i].name + " ";
      }
      return resultString;
    },
    setToDefault() {
      this.defaultData = {
        id: -1,
        createdBy: -1,
        createdAt: "",
        updatedBy: -1,
        updatedAt: "",
        name: "",
        image: "",
        count: 0,
        publishAt: 2000,
        content: "",
        category: {},
        publisher: {},
        authors: [],
      };
    },
    validate(object) {
      delete object.img;
      return Object.values(object).every((x) => x === null || x === "");
    },
    initialize() {
      var accessToken = localStorage.getItem("accessToken");
      var config = {
        method: "get",
        url: "https://ptdapmback.herokuapp.com/v1/api/borrowings?page=0&limit=1000&sort=-id",
        headers: {
          Authorization: "Bearer " + accessToken,
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
        url: "https://ptdapmback.herokuapp.com/v1/api/borrowings/" + objectId,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          this.defaultData = response.data;
          if (requestType == "update") {
            this.showUpdateDialog = true;
          } else if (requestType == "accept") {
            this.showAcceptDialog = true;
            }else if (requestType == "detail") {
            this.showDetailDialog = true;
          } else if (requestType == "reject") {
            this.showRejectDialog = true;
          } else if (requestType == "delete") {
            this.showDeleteDialog = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    closeDialog(requestType) {
      this.setToDefault();
      if (requestType == "accept") {
        this.showAcceptDialog = false;
      } else if (requestType == "update") {
        this.showUpdateDialog = false;
      } else if (requestType == "reject") {
        this.showRejectDialog = false;
      } else if (requestType == "delete") {
        this.showDeleteDialog = false;
      }
    },
    acceptConfirm() {
      if (this.defaultData != null && this.defaultData.id > 0) {
        var data = JSON.stringify(this.defaultData);
        var accessToken = localStorage.getItem("accessToken");
        console.log(data);
        var config = {
          method: "put",
          url:
            "https://ptdapmback.herokuapp.com/v1/api/borrowings/" +
            this.defaultData.id +
            "/status?status=1",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        };
        axios(config)
          .then((response) => {
            console.log(response);
            //Notice: Success message here, delay ???
            this.showAcceptDialog = false;
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    rejectConfirm() {
      if (this.defaultData != null && this.defaultData.id > 0) {
        var data = JSON.stringify(this.defaultData);
        var accessToken = localStorage.getItem("accessToken");
        console.log(data);
        var config = {
          method: "put",
          url:
            "https://ptdapmback.herokuapp.com/v1/api/borrowings/" +
            this.defaultData.id +
            "/status?status=2",
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        };
        axios(config)
          .then((response) => {
            console.log(response);
            //Notice: Success message here, delay ???
            this.showRejectDialog = false;
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    deleteConfirm() {
      if (this.defaultData != null && this.defaultData.id > 0) {
        var data = JSON.stringify(this.defaultData);
        var accessToken = localStorage.getItem("accessToken");
        console.log(data);
        var config = {
          method: "delete",
          url:
            "https://ptdapmback.herokuapp.com/v1/api/borrowings/" +
            this.defaultData.id,
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        };
        axios(config)
          .then((response) => {
            console.log(response);
            //Notice: Success message here, delay ???
            this.showDeleleDialog = false;
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    updateConfirm(itemId) {
      if (itemId != null && itemId > 0) {
        var config = {
          method: "put",
          url:
            "https://ptdapmback.herokuapp.com/v1/api/borrowingItems/" +
            itemId +
            "/status?status=true",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        };
        axios(config)
          .then((response) => {
            console.log(response);
            this.showUpdateDialog = false;
            this.$router.go();
            //Notice: Do some thing to remove datatable data
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        alert("Đã có lỗi xảy ra, vui lòng thử lại!");
      }
    },
    removeConfirm() {
      if (this.defaultData.id > 0) {
        var config = {
          method: "delete",
          url:
            "https://ptdapmback.herokuapp.com/v1/api/books/" +
            this.defaultData.id,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        };
        axios(config)
          .then((response) => {
            console.log(response);
            this.showDeleteDialog = false;
            this.$router.go();
            //Notice: Do some thing to remove datatable data
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.showDeleteDialog = false;
      }
    },
    onFileUploadChanged(e) {
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile);
      this.formData = new FormData();
      this.formData.append("file", this.selectedFile);
      this.defaultData.image = this.selectedFile.name;
      var imgUpdate = document.getElementById("update-img");
      imgUpdate.src = URL.createObjectURL(this.selectedFile);
    },
  },
};
</script>
<style scoped>
.outurl {
  width: 100%;
  border-bottom: 1px solid #999;
}
.url {
  padding: 0;
  font-size: 15px;
  color: #999;
}
.header {
  padding: 10px 0;
  font-size: 20px;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
}
.headertext {
  font-size: 14px;
  color: #777;
  font-weight: 400;
  margin-left: 5px;
}
.note {
  margin-top: 10px;
  color: red;
  font-size: 14px;
  display: block;
}
.cartProduct {
  margin-top: 20px;
  padding: 10px 0;
  border-bottom: 1px solid rgb(216, 214, 214);
}
.outImg {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img {
  width: 100%;
  height: 180px;
}
.name {
  font-weight: 500;
  color: #333;
}
.author {
  display: block;
  color: #777;
  font-size: 16px;
  margin-top: 5px;
}
.btnDelete {
  width: 150px;
  padding: 10px 0;
  text-align: center;
  margin-top: 10px;
  box-shadow: 0 0 3px #999;
  color: red;
  font-weight: 500;
  border-radius: 3px;
  cursor: pointer;
}
.btnDelete:hover {
  background-color: rgb(216, 14, 14);
  color: white;
}
.infoCart {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.Register {
  display: flex;
  margin: 20px 0;
  justify-content: right;
}
.btnRegister {
  padding: 14px 25px;
  text-align: center;
  box-shadow: 0 0 3px #999;
  color: white;
  background-color: green;
  font-weight: 500;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
}
.btnRegister:hover {
  opacity: 0.9;
}
</style>
