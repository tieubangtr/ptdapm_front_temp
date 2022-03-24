<template>
    <div class="div">
        <table>
            <tr>
                <th>STT</th>
                <th>Tên Sách</th>
                <th>Ảnh</th>
                <th>Thể Loại</th>
                <th>Nhà Xuất Bản</th>
                <th>Số lượng sách còn</th>
            </tr>
            <tr v-for="(data,index) in this.datas" :key="index">
                <td>{{index+1}}</td>
                <td>{{data.name}}</td>
                <td><img class="img" :src='("https://ptdapmback.herokuapp.com/v1/api/auth/files/"+data.image)' alt=""></td>
                <td>{{data.category.name}}</td>
                <td>{{data.publisher.name}}</td>
                <td>{{data.count}}</td>
            </tr>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return {
            datas:[],
        }
    },
    mounted () {
        axios.get(`https://ptdapmback.herokuapp.com/v1/api/auth/statistics/bookExist`,{
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
                }
            })
            .then((res)=>{
                console.log(res.data);
                this.datas=res.data
                
            })
            .catch((err)=>{
                console.log(err.response.data);
            })
    }
}
</script>
<style scoped>
.img{
    width: 100px;
    height: 100px;
}
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