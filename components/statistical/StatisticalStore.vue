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
            <tr v-for="(book,index) in this.dataBook" :key="index">
                <td>{{index}}</td>
                <td>{{book.name}}</td>
                <td><img class="img" :src='("https://ptdapmback.herokuapp.com/v1/api/auth/files/"+book.image)' alt=""></td>
                <td>{{book.category.name}}</td>
                <td>{{book.publisher.name}}</td>
                <td>{{arr[index]}}</td>
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
            dataBook:[],
            arr:[]
        }
    },
    mounted () {
        axios.get(`https://ptdapmback.herokuapp.com/v1/api/auth/statistics/borrowingGt`,{
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
                }
            })
            .then((res)=>{
                console.log(res.data);
                this.datas=res.data
                for (var i in this.datas) {
                    console.log(('bookId: ' + i + ', number: ' + this.datas[i]))
                    axios.get(`https://ptdapmback.herokuapp.com/v1/api/books/${i}`)
                    .then((res)=>{
                        this.dataBook.push(res.data)
                    })
                    .catch((err)=>{
                        console.log(err.response.data);
                    })
                    this.arr.push(this.datas[i])
                } 
                
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