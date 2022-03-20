<template>
    <div class="footter">
        <v-container>
            <v-layout>
                <v-flex lg4>
                    <div class="outimg">
                        <img src="/img/logoDHTL.png" alt="" class="img">
                    </div>
                    <div class="info">
                        <v-icon class="icon">apartment</v-icon>
                        <span class="text">175 Đống Đa, Tây Sơn, Hà Nội</span>
                    </div>
                    <div class="info">
                        <v-icon class="icon">call</v-icon>
                        <span class="text">0123456789</span>
                    </div>
                    <div class="info">
                        <v-icon class="icon">alarm</v-icon>
                        <span class="text">Mở cửa 7 ngày trong tuần từ 8h - 17h</span>
                    </div>
                    <div class="info">
                        <v-icon class="icon">local_post_office</v-icon>
                        <span class="text">thuvienthuyloi@gmail.com</span>
                    </div>
                </v-flex>
                <v-flex lg4>
                    <div class="header">Trợ Giúp</div>
                    <ul class="list">
                        <li class="item">Chính sách</li>
                        <li class="item">Thông tin liên hệ</li>
                        <li class="item">Giới thiệu trường đại học thủy lợi</li>
                    </ul>
                </v-flex>
                <v-flex lg4>
                    <div class="header">Liên Hệ</div>
                    <div class="groupIcon">
                        <v-icon class="icons">wind_power</v-icon>
                        <v-icon class="icons">contact_mail</v-icon>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<style scoped>
.footter{
    background-color:black;
}
.outimg{
    width:100%;
    display: flex;
    justify-content: center;
}
.info{
    margin:20px 0;
    display: flex;
    align-items: center;
    justify-content:left;
}
.icon{
    font-size:25px;
    color:white;
}
.text{
    color:white;
    font-size: 16px ;
    margin-left: 10px;
}
.header{
    width: 100%;
    text-align:center;
    font-size:20px;
    color:white;
    margin-top: 80px;
}
.list{
    padding:0;
    margin-top:15px;
}
.item{
    font-size:16px;
    color:white;
}
.groupIcon{
    display:flex;
    justify-content: center;
}
.icons{
    margin:10px 5px;
    color:white;
    font-size:20px;
}
</style>