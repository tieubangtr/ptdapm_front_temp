<template>
        <!-- Data dialog -->
    <v-dialog v-model="userDataDialog" persistent max-width="500px">
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
                    <v-text-field v-model="userData.name" label="Họ và tên" />
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field type="email" v-model="userData.email" label="Email"/>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field v-model="userData.phone" label="Số điện thoại" />
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field type="date" v-model="userData.birthday" label="Ngày sinh"/>
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
                    return-object
                    single-line
                    ></v-select>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="12" sm="6">
                    <v-text-field type="text" v-model="userData.addr" label="Địa chỉ"/>
                </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="userDataDialog = false">
                Hủy bỏ
                </v-btn>
                <v-btn type="button" color="primary" @click="insert()">
                Thêm mới
                </v-btn>
            </v-card-actions>
            </v-form>
        </v-container>
        </v-card-text>
    </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data(){
            return{
                userData: {
                    "addr": "",
                    "birthday": "",
                    "email": "",
                    "gender": "",
                    "name": "",
                    "password": "1234567",
                    "phone": ""
                }
            }
        }
    }
</script>

