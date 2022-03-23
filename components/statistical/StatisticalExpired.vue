<template>
    <div class="div">
        <table>
            <tr>
                <th>STT</th>
                <th>Tên Sách</th>
                <th>Ảnh</th>
                <th>Thể Loại</th>
                <th>Nhà Xuất Bản</th>
                <th>Số lượng mượn</th>
            </tr>
            <tr>
                <td>1</td>
                <td>ahihi</td>
                <td>ảnh</td>
                <td>truyện cười</td>
                <td>Pằng pằng</td>
                <td>20</td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
.div{
    margin-top: 40px;
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
td{
    font-weight:500;
}
</style>