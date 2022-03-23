<template>
    <div class="div">
        <table>
            <tr>
                <th>STT</th>
                <th>Id (Người mượn)</th>
                <th>Người mượn</th>
                <th>Tên Sách</th>
                <th>Ảnh</th>
                <th>Ngày trả</th>
            </tr>
            <tr v-for="(data,index) in dataTest" :key="index">
                <td>{{index+1}}</td>
                <td>{{data.dataUser.id}}</td>
                <td>{{data.dataUser.name}}</td>
                <td>
                    <div class="text" v-for="(book,index1) in data.listBooks" :key="index1">{{book.book.name}}</div>
                </td>
                <td>
                    <div  v-for="(book,index2) in data.listBooks" :key="index2"><img  class="img" :src='("https://ptdapmback.herokuapp.com/v1/api/auth/files/"+book.book.image)' alt=""></div>
                </td>
                <td>
                    <div class="text" v-for="(book,index3) in data.listBooks" :key="index3">{{book.payday}}</div>
                </td>
            </tr>
        </table>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return {
            dataTest:[
                {
                    dataUser:{},
                    listBooks:{}
                }
            ],
        }
    },
    mounted () {
        axios.get(`https://ptdapmback.herokuapp.com/v1/api/auth/statistics/bookExpired`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
            }
        })
        .then((res)=>{
            console.log(res.data);
            this.datas=res.data
            // this.map
            let j=0
            for (var i in this.datas) {
                let form={
                    dataUser:{},
                    listBooks:{}
                }
                console.log(('userID: ' + i + ', list: ' + res.data[i]))
                form.listBooks=res.data[i]
                axios.get(`https://ptdapmback.herokuapp.com/v1/api/users/${i}`,{
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
                    }
                })
                .then((res)=>{
                    form.dataUser=res.data
                    console.log(j);
                })
                .catch((err)=>{
                    console.log(err.response.data);
                })
                this.dataTest[j]=form
                j++
            } 

            console.log('data',this.dataTest);


        })
        .catch((err)=>{
            console.log(err.response.data);
        })
        console.log('data2',this.dataTest);
    }
}
</script>
<style scoped>

.img{
    width: 100px;
    height: 100px;
    margin:10px 0;
}
.text{
    display:flex;
    align-items:center;
    height: 100px;
    justify-content:center;
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