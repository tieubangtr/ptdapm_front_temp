<template>
        <!-- Data dialog -->
    <v-dialog v-model="showUserAddDialog" persistent max-width="500px">
    <v-card>
        <v-card-title>
        <span class="headline">Thêm mới người dùng</span>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
        <v-container grid-list-md>
            <v-form ref="form">
                <v-card-text>
                    <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field label="Họ và tên" />
                    </v-col>
                    </v-row>
                    <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field type="email" label="Email"/>
                    </v-col>
                    </v-row>
                    <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field label="Số điện thoại" />
                    </v-col>
                    </v-row>
                    <v-row>
                    <v-col cols="12" sm="6">
                        <v-text-field type="date" label="Ngày sinh"/>
                    </v-col>
                    </v-row>
                    <v-row>
                    <v-col cols="12" sm="6">
                        <v-select
                        v-model="gender"
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
                        <v-text-field type="text" label="Địa chỉ"/>
                    </v-col>
                    </v-row>
                </v-card-text>
            </v-form>
        </v-container>
        </v-card-text>
    </v-card>
    </v-dialog>
</template>


<script>
    export default{
        data(){
            return{
                gender: ["Nam", "Nữ"]
            }
        }
    }
</script>