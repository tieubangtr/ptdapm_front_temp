<template>
    <div class="out">
        <div class="outurl">
            <v-container>
                <div class="url">Trang chủ > Mượn trả</div>
            </v-container>
        </div>
        <v-container>
            <h3>Xem lịch sử mượn - trả sách của bạn</h3>
            <table>
                <tr>
                    <th>STT</th>
                    <th>Mã phiếu</th>
                    <th>Mã sách</th>
                    <th>Tên sách</th>
                    <th>Trạng thái</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>bsoahf</td>
                    <td>fjofpajf</td>
                    <td>HAHAAHAHA</td>
                    <td>chờ xác nhận</td>
                </tr>
            </table>
        </v-container>
    </div>
</template>
<script>
export default {
}
</script>

<style scoped>
.outurl{
    width: 100%;
    border-bottom: 1px solid #999;
}
.url{
    padding: 0;
    font-size: 15px;
    color: #999;
}
table, td, th {  
  border: 1px solid #ddd;
  text-align: left;
}

table {
  border-collapse: collapse;
  width: 100%;
}
th{
    border-bottom: 1px solid #333;
    background-color: #f5f5f5;
    color: #888;
}
th, td {
  padding: 15px;
  text-align: center;
}
</style>