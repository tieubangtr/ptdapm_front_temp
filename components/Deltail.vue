<template>
    <v-container>
        <div class="url">Trang chủ > Deltail</div>
        <v-layout row wrap class="x-grid-lg">
            <v-flex lg6 sm12 xs12 class="pa-2">
                <div class="outImg">
                    <img src="img/sach1.jfif" alt="" class="Img">
                </div>
            </v-flex>
            <v-flex lg6 sm12 xs12 class="info pa-2">
                <h2 class="name">Tên sách</h2>
                <v-layout row wrap class="x-grid-lg">
                    <v-flex lg4 sm12 xs12 class="pa-2">
                        <span class="author">Tác phẩm</span>
                        <span class="author">Nhà xuất bản</span>
                        <span class="author">Năm xuất bản</span>
                        <span class="author">ID:S9164146</span>
                    </v-flex>
                    <v-flex lg8 sm12 xs12 class="pa-2">
                        <span class="content">Phạm Huy Hiệp</span>
                        <span class="content">Anh Hịp</span>
                        <span class="content">2000</span>
                    </v-flex>
                </v-layout>
                <div class="btnBorrow">
                    <span class="btn">Mượn</span>
                </div>
                <hr/>
                <v-layout row wrap class="x-grid-lg">
                    <v-flex lg4 sm12 xs12 class="pa-2">
                        <span class="author">Mã hàng</span>
                        <span class="author">Thể loại</span>
                    </v-flex>
                    <v-flex lg8 sm12 xs12 class="pa-2">
                        <span class="content">N/A</span>
                        <span class="content">Văn học</span>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.url{
    margin-bottom:20px;
    font-size:16px;
    color:#888;
}
.outImg {
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content:center;
}
.Img{
    width:100%;
    height: 100%;
}
.info{
    padding: 20px;
}
.name{
    font-weight: 400;
    text-transform: capitalize;
}
.author{
    color: #999;
    font-size: 15px;
    display:block;
    margin:15px 0;
}
.content{
    color: #333;
    font-size: 15px;
    display:block;
    margin:15px 0;
}
.btnBorrow{
    margin:20px 10px 50px 10px ;
}
.btn{
    padding:15px 80px;
    background-color: #f5f5f5;
    color: red;
    box-shadow: 0 2px 5px #999;
    font-weight: 600;
    border-radius:3px;
}
.btn:hover{
    background-color: rgb(230, 230, 230);
}
</style>