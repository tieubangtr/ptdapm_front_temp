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
                <h3 class="header">Hồ Sơ Tài Khoản</h3>
                <v-layout>
                    <v-flex lg3 class="menu">
                        Họ tên
                    </v-flex>
                    <v-flex lg3 class="menu">
                        Phạm Huy Hiệp
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex lg3 class="menu">
                        Email
                    </v-flex>
                    <v-flex lg3 class="menu">
                        hiep@gmail.com
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex lg3 class="menu">
                        Số điện thoại
                    </v-flex>
                    <v-flex lg3 class="menu">
                        0375713278
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex lg3 class="menu">
                        Ngày Sinh
                    </v-flex>
                    <v-flex lg3 class="menu">
                        04-05-2000
                    </v-flex>
                </v-layout>
                <v-layout>
                    <v-flex lg3 class="menu">
                        Địa chỉ
                    </v-flex>
                    <v-flex lg3 class="menu">
                        Thái Bình
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
