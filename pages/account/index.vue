<template>
  <div id="page-forms">
    <v-container grid-list-xl fluid>
      <h1>Thông tin tài khoản</h1>
      <v-layout row wrap>
        <v-flex lg6>
          <v-card class="mb-4">
            <v-toolbar color="teal" dark flat dense cad>
              <v-toolbar-title class="subheading"
                >Hồ sơ tài khoản</v-toolbar-title
              >
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="">
              <v-form>
                <v-text-field
                  ref="userFullName"
                  label="Họ và tên"
                  name="fullname"
                  v-model="userData.name"
                ></v-text-field>
                <v-text-field
                  ref="userEmail"
                  label="Email"
                  name="email"
                  v-model="userData.email"
                  disabled
                ></v-text-field>
                <v-text-field
                  ref="userPhone"
                  label="Số điện thoại"
                  v-model="userData.phone"
                  maxlength="10"
                ></v-text-field>
                <v-text-field
                  label="Ngày sinh"
                  v-model="userData.birthday"
                  type="date"
                ></v-text-field>
                <v-select
                  item-text="gender"
                  item-value="gender"
                  v-model="userData.gender"
                  :items="gender"
                >
                </v-select>
                <v-text-field
                  ref="userAddress"
                  label="Địa chỉ"
                  v-model="userData.addr"
                ></v-text-field>
                <div class="form-btn">
                  <v-btn outline @click="exitUpdate()" color="pink">Hủy</v-btn>
                  <v-btn outline @click="updateInfo()" color="primary"
                    >Lưu</v-btn
                  >
                  <v-btn outline @click="updatePassword()" color="orange"
                    >Đổi mật khẩu</v-btn
                  >
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex lg6>
          <v-img
            v-if="userData.img == '' || userData.img == 'string'"
            src="https://scontent.fhan5-8.fna.fbcdn.net/v/t1.6435-9/61441232_2111788605600677_2041255779486400512_n.png?_nc_cat=107&ccb=1-5&_nc_sid=cdbe9c&_nc_ohc=cB5veHEfx3IAX9FW8Wg&_nc_ht=scontent.fhan5-8.fna&oh=00_AT8B2uYKd_WitqDCRDAWF8Ow_1hMWgnxTIZFJ92pyHq-uA&oe=62501A79"
            height="390"
          >
            <v-layout column class="media ma-0">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark icon class="mr-3" @click="handleFileImport()">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-card-title class="white--text pl-5 pt-5">
                <div class="display-1 pl-5 pt-5">{{ userData.name }}</div>
              </v-card-title>
            </v-layout>
          </v-img>
          <v-img
            v-else
            :src="
              'https://ptdapmback.herokuapp.com/v1/api/auth/files/' +
              userData.img
            "
          >
            <v-layout column class="media ma-0">
              <v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark icon class="mr-3" @click="handleFileImport()">
                  <v-icon>edit</v-icon>
                </v-btn>
              </v-card-title>
              <v-spacer></v-spacer>
              <v-card-title class="white--text pl-5 pt-5">
                <div class="display-1 pl-5 pt-5">{{ userData.name }}</div>
              </v-card-title>
            </v-layout>
          </v-img>
          <input
            ref="uploader"
            class="d-none"
            type="file"
            @change="onFileChanged"
          />
        </v-flex>
      </v-layout>
      <template>
        <v-dialog
          v-model="showDialogChangePassword"
          persistent
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              <span class="headline">Đổi mật khẩu người dùng</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-spacer></v-spacer>
            <v-card-text class="d-flex justify-center">
              <v-container grid-list-md>
                <v-form ref="form">
                  <v-card-text>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          type="password"
                          id="changePassOld"
                          label="Mật khẩu cũ"
                          minlength="7"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          type="password"
                          id="changePassNew"
                          label="Mật khẩu mới"
                          minlength="7"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          type="password"
                          id="changePassNewConfirm"
                          label="Nhập lại mật khẩu mới"
                          minlength="7"
                        />
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-form>
              </v-container>
            </v-card-text>
            <v-spacer></v-spacer>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                text
                @click="showDialogChangePassword = false"
              >
                Hủy
              </v-btn>
              <v-btn color="warning" text @click="updatePasswordConfirm()">
                Cập nhật
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  layout: "dashboard",
  mounted() {
    this.getDetail();
  },
  data() {
    return {
      userData: {},
      id: 1,
      showDialogChangePassword: false,
      selectedFile: null,
      isFileSelecting: false,
      gender: ["Nam", "Nữ"],
    };
  },
  methods: {
    validatePassword() {
      var oldPassword = document.getElementById("changePassOld").value;
      var newPassword = document.getElementById("changePassNew").value;
      var confirmPassword = document.getElementById(
        "changePassNewConfirm"
      ).value;
      if (newPassword != confirmPassword) {
        this.$toasted.error("Mật khẩu không khớp").goAway(2000);
        return false;
      } else if (newPassword.length < 7 || confirmPassword.length < 7) {
        this.$toasted.error("Mật khẩu phải lớn hơn 6 ký tự").goAway(2000);
        return false;
      }
      return true;
    },
    validate() {
      let name = this.userData.name.trim();
      let phone = this.userData.phone;
      let address = this.userData.addr.trim();
      let birthday = this.userData.birthday;
      if (
        name == null ||
        name == "" ||
        /['`~!@#$%^&*()_|+-=?;:'",.<>\{\}\[\]\\\/]/.test(name)
      ) {
        this.$refs["userFullName"].$refs.input.focus();
        this.$toasted.error("Họ và tên không hợp lệ").goAway(2000);
        return false;
      } else if (
        phone == null ||
        phone == "" ||
        !/^[0-9]*$/.test(phone) ||
        phone.length < 10
      ) {
        this.$refs["userPhone"].$refs.input.focus();
        this.$toasted.error("Số điện thoại không hợp lệ").goAway(2000);
        return false;
      } else if (address == null || address == "") {
        this.$refs["userAddress"].$refs.input.focus();
        this.$toasted.error("Địa chỉ không hợp lệ").goAway(2000);
        return false;
      } else if (birthday == null || birthday == "") {
        this.$toasted.error("Ngày sinh không hợp lệ").goAway(2000);
        return false;
      }
      return true;
    },
    getDetail() {
      var userId = localStorage.getItem("userId");
      var config = {
        method: "get",
        url: "https://ptdapmback.herokuapp.com/v1/api/users/" + userId,
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      };

      axios(config)
        .then((response) => {
          this.userData = response.data;
          this.id = response.data.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    updateInfo() {
      console.log(JSON.stringify(this.userData));
      if (this.userData != null && this.validate()) {
        var data = JSON.stringify(this.userData);

        var config = {
          method: "put",
          url:
            "https://ptdapmback.herokuapp.com/v1/api/users/" + this.userData.id,
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
            this.$toasted
              .success("Lưu thông tin tài khoản thành công")
              .goAway(3000);
            this.$router.go();
          })
          .catch((error) => {
            console.log(error.response.data);
            if (error.response.data.apierror.debugMessage != "") {
              this.$toasted
                .error(error.response.data.apierror.debugMessage)
                .goAway(3000);
            } else {
              this.$toasted
                .error("Lưu thông tin tài khoản không thành công")
                .goAway(3000);
            }
            this.showUserDeleteDialog = false;
          });
      }
    },
    exitUpdate() {
      this.$router.go();
    },
    updatePassword() {
      this.showDialogChangePassword = true;
    },
    updatePasswordConfirm() {
      var userId = localStorage.getItem("userId");
      var accessToken = localStorage.getItem("accessToken");
      var oldPassword = document.getElementById("changePassOld").value;
      var newPassword = document.getElementById("changePassNew").value;
      if (this.validatePassword()) {
        var config = {
          method: "put",
          url:
            "https://ptdapmback.herokuapp.com/v1/api/users/" +
            userId +
            "/password?newPassword=" +
            newPassword +
            "&oldPassword=" +
            oldPassword,
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        };

        axios(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            this.$toasted.success(JSON.stringify(response.data)).goAway(3000);
            this.$router.go();
          })
          .catch((error) => {
            console.log(error);
            this.$toasted
              .error("Đã có lỗi, hãy kiểm tra lại thông tin")
              .goAway(3000);
          });
      }
    },
    handleFileImport() {
      this.isFileSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.uploader.click();
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0];
      console.log(this.selectedFile);
      var formData = new FormData();
      var userId = localStorage.getItem("userId");
      var accessToken = localStorage.getItem("accessToken");
      formData.append("image", this.selectedFile);
      axios
        .put(
          "https://ptdapmback.herokuapp.com/v1/api/users/" + userId + "/image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + accessToken,
            },
          }
        )
        .then((response) => {
          console.log(JSON.stringify(response.data));
          alert(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
          alert("Lỗi rồi cha nội, check console đi !");
        });
    },
  },
};
</script>
