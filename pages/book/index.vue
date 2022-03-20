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
                  <td>{{ props.item.publisher.name }}</td>
                  <td>{{ props.item.category.name }}</td>
                  <td>{{ loadAuthors(props.item.authors) }}</td>
                  <td>{{ props.item.count }}</td>
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
                      <v-icon>visibility</v-icon>
                    </v-btn>
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
            <v-dialog v-model="showDeleteDialog" persistent max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Xóa sách</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-spacer></v-spacer>
                <v-card-text class="d-flex justify-center">
                  <h4 class="d-inline-block">
                    Xóa xong thì là mất, đừng có đi tìm nhé ?
                  </h4>
                </v-card-text>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" text @click="closeDialog('delete')">
                    Hủy bỏ
                  </v-btn>
                  <v-btn color="primary" text @click="removeConfirm()">
                    Xác nhận
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="showInsertDialog" persistent max-width="500px">
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
                            <v-text-field
                              v-model="bookData.name"
                              label="Tên sách"
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="bookData.categoryId"
                              :items="listCategory"
                              item-text="name"
                              item-value="id"
                              label="Thể loại"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              type="number"
                              v-model="bookData.count"
                              label="Số lượng"
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="bookData.authors"
                              :items="listAuthor"
                              item-text="name"
                              item-value="id"
                              label="Tác giả"
                              multiple
                              return-object
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="bookData.publisherId"
                              :items="listPublisher"
                              item-text="name"
                              item-value="id"
                              label="Nhà xuất bản"
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              type="number"
                              v-model="bookData.publishAt"
                              label="Năm xuất bản"
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-textarea
                              label="Mô tả"
                              v-model="bookData.content"
                              value="bookData.content"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              type="file"
                              label="Ảnh minh họa"
                              @change="onFileUploadChanged"
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
                    Thêm mới
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="showDetailDialog" persistent max-width="700px">
              <v-card>
                <v-card-title>
                  <span class="headline">Chi tiết sách</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-form ref="form">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12">
                            <v-img
                              :src="
                                'https://ptdapmback.herokuapp.com/v1/api/auth/files/' +
                                bookData.image
                              "
                              max-width="500px"
                            />
                            <v-text-field
                              v-model="bookData.name"
                              label="Tên sách"
                              readonly
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              type="text"
                              v-model="bookData.category.name"
                              label="Thể loại"
                              readonly
                            />
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              type="number"
                              v-model="bookData.count"
                              label="Số lượng"
                              readonly
                            />
                          </v-col>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="bookData.authors"
                              :items="listAuthor"
                              item-text="name"
                              item-value="id"
                              label="Tác giả"
                              multiple
                              return-object
                              readonly
                            ></v-select>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              type="text"
                              v-model="bookData.publisher.name"
                              label="Nhà xuất bản"
                              readonly
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              type="number"
                              v-model="bookData.publishAt"
                              label="Năm xuất bản"
                              readonly
                            />
                          </v-col>
                          <v-col cols="12">
                            <v-textarea
                              label="Mô tả"
                              v-model="bookData.content"
                              value="bookData.content"
                              readonly
                            ></v-textarea>
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
            <v-dialog v-model="showUpdateDialog" persistent max-width="800px">
              <v-card>
                <v-card-title>
                  <span class="headline">Chỉnh sửa thông tin sách</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-form ref="form">
                      <v-card-text>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              v-model="bookData.name"
                              label="Tên sách"
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="bookData.category"
                              :items="listCategory"
                              item-text="name"
                              item-value="id"
                              label="Thể loại"
                              return-object
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              type="number"
                              v-model="bookData.count"
                              label="Số lượng"
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="bookData.authors"
                              :items="listAuthor"
                              item-text="name"
                              item-value="id"
                              label="Tác giả"
                              multiple
                              return-object
                            ></v-select>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-select
                              v-model="bookData.publisher"
                              :items="listPublisher"
                              item-text="name"
                              item-value="id"
                              label="Nhà xuất bản"
                              return-object
                            ></v-select>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-text-field
                              type="number"
                              v-model="bookData.publishAt"
                              label="Năm xuất bản"
                            />
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="6">
                            <v-textarea
                              label="Mô tả"
                              v-model="bookData.content"
                              value="bookData.content"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-img
                            id="update-img"
                            :src="
                              'https://ptdapmback.herokuapp.com/v1/api/auth/files/' +
                              bookData.image
                            "
                            max-width="500px"
                            
                          />
                          <v-text-field
                            type="file"
                            label="File input"
                            @change="onFileUploadChanged"
                          ></v-text-field>
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
                  <v-btn color="warning" text @click="updateConfirm()">
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
      listCategory: [],
      listAuthor: [],
      listPublisher: [],
      selectedBookImage: null,
      formData: new FormData(),
      defaultDate: new Date().toLocaleDateString("en-CA"),
      bookData: {
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
        categoryId: -1,
        publisherId: -1,
        category: {},
        publisher: {},
        authors: [],
      },
      showDeleteDialog: false,
      showDetailDialog: false,
      showInsertDialog: false,
      showUpdateDialog: false,
      complex: {
        selected: [],
        headers: [
          {
            text: "#",
            value: "id",
          },
          {
            text: "Tên sách",
            value: "name",
          },
          {
            text: "Nhà xuất bản",
            value: "publisher",
          },
          {
            text: "Thể loại",
            value: "category",
          },
          {
            text: "Tác giả",
            value: "author",
          },
          {
            text: "Số lượng",
            value: "count",
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
    loadAuthors(object) {
      var resultString = "";
      for (let i = 0; i < object.length; i++) {
        resultString += object[i].name + " ";
      }
      return resultString;
    },
    setToDefault() {
      this.bookData = {
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
        url: "https://ptdapmback.herokuapp.com/v1/api/books?page=0&limit=100&sort=id",
      };

      axios(config)
        .then((response) => {
          this.listData = response.data.content;
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(
          "https://ptdapmback.herokuapp.com/v1/api/categories?page=0&limit=100&sort=id",
          { headers: { Authorization: accessToken } }
        )
        .then((response) => {
          this.listCategory = response.data.content;
          console.log(this.listCategory);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(
          "https://ptdapmback.herokuapp.com/v1/api/publishers?page=0&limit=100&sort=id",
          { headers: { Authorization: accessToken } }
        )
        .then((response) => {
          this.listPublisher = response.data.content;
          console.log(this.listPublisher);
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(
          "https://ptdapmback.herokuapp.com/v1/api/authors?page=0&limit=100&sort=id",
          { headers: { Authorization: accessToken } }
        )
        .then((response) => {
          this.listAuthor = response.data.content;
          console.log(this.listAuthor);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDetail(objectId, requestType) {
      var config = {
        method: "get",
        url: "https://ptdapmback.herokuapp.com/v1/api/books/" + objectId,
      };
      axios(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          console.log(this.listPublisher);
          this.bookData = response.data;
          if (requestType == "update") {
            this.showUpdateDialog = true;
          } else if (requestType == "detail") {
            this.showDetailDialog = true;
          } else if (requestType == "delete") {
            this.showDeleteDialog = true;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    insertConfirm() {
      console.log(JSON.stringify(this.bookData));
      if (this.bookData != null /*&& !this.validate(this.bookData)*/) {
        var data = JSON.stringify(this.bookData);
        var accessToken = localStorage.getItem("accessToken");
        console.log(this.validate(this.bookData));
        var config = {
          method: "post",
          url: "https://ptdapmback.herokuapp.com/v1/api/books/",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          data: data,
        };
        axios(config)
          .then((response) => {
            console.log(response);
            // Notice: Success message here, delay ???
            for (var value of this.formData.values()) {
              console.log(value);
            }
            axios
              .post(
                "https://ptdapmback.herokuapp.com/v1/api/auth/files",
                this.formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + accessToken,
                  },
                }
              )
              .then((response) => {
                console.log(JSON.stringify(response.data));
                this.$router.go();
              })
              .catch((error) => {
                console.log(error);
                alert("Lỗi rồi cha nội, check console đi !");
              });
            this.setToDefault();
            this.showInsertDialog = false;
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    closeDialog(requestType) {
      this.setToDefault();
      if (requestType == "insert") {
        this.showInsertDialog = false;
      } else if (requestType == "update") {
        this.showUpdateDialog = false;
      } else if (requestType == "delete") {
        this.showDeleteDialog = false;
      } else if (requestType == "detail") {
        this.showDetailDialog = false;
      }
    },
    updateConfirm() {
      if (this.bookData != null && this.bookData.id > 0) {
        this.bookData.categoryId = this.bookData.category.id;
        this.bookData.publisherId = this.bookData.publisher.id;
        var data = JSON.stringify(this.bookData);
        var accessToken = localStorage.getItem("accessToken");
        console.log(data);
        var config = {
          method: "put",
          url:
            "https://ptdapmback.herokuapp.com/v1/api/books/" + this.bookData.id,
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          data: data,
        };
        axios(config)
          .then((response) => {
            console.log(response);
            //Notice: Success message here, delay ???
            this.showbookDataDialog = false;
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    removeConfirm() {
      if (this.bookData.id > 0) {
        var config = {
          method: "delete",
          url:
            "https://ptdapmback.herokuapp.com/v1/api/books/" + this.bookData.id,
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
      this.bookData.image = this.selectedFile.name;
      // var imgUpdate = document.getElementById('update-img');
      // imgUpdate.src = URL.createObjectURL(this.selectedFile);
    },
  },
};
</script>
