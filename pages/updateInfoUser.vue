<template>
    <v-container>
        <v-layout>
            <v-flex lg5 class="menu">
                <div class="outImg">
                    <img src="" alt="" class="img">
                </div>
                <NuxtLink to='/infoUser' class="item">
                    <v-icon>home</v-icon>
                    <div class="text">Tổng quan hồ sơ tài khoản</div>
                </NuxtLink>
                <NuxtLink to='/updateInfoUser' class="item">
                    <v-icon>edit_calendar</v-icon>
                    <div class="text">Sửa hồ sơ</div>
                </NuxtLink>
                <NuxtLink to='/updatePassInfoUser' class="item">
                    <v-icon>lock</v-icon>
                    <div class="text">Đổi mật khẩu</div>
                </NuxtLink>
            </v-flex>
            <v-flex lg7>
                <h3 class="header">Chỉnh Sửa Hồ Sơ</h3>
                <v-text-field  
                    label="Email" 
                    type="text"
                >
                </v-text-field>
                <v-text-field  
                    label="Số Điện Thoại" 
                    type="text"
                >
                </v-text-field>
                <v-text-field 
                    label="Giới tính" 
                    type="text"
                >
                </v-text-field>
                <v-text-field  
                    label="Ngày Sinh" 
                    type="date"
                >
                </v-text-field>
                <v-text-field  
                    label="Địa Chỉ" 
                    type="text"
                >
                </v-text-field>
                <div class="btnGroup">
                    <span class="cancel">Hủy</span>
                    <span class="save">Lưu</span>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>