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
                    <th>Trạng thái phiếu</th>
                    <th>Tên sách</th>
                    <th>Trạng thái Sách</th>
                </tr>
                <tr v-for="(data,index) in datas" :key="index">
                    <td>{{ index+1 }}</td>
                    <td>{{data.id}}</td>
                    <td v-if="data.status==0" class="wait">Chờ xác nhận</td>
                    <td v-if="data.status==1" class="borrowed">Đã xác nhận</td>
                    <td v-if="data.status==2" class="paid">Từ chối</td>
                    <td>
                        <div class="id"><div v-for="(borrow,index) in data.borrowingItems" :key="index" >{{borrow.book.name}}</div></div>
                    </td>
                    <td>
                        <div class="id">
                            <div class="id">
                                <div v-for="(borrow,index) in data.borrowingItems" :key="index" >
                                    <span v-if="!borrow.status " class="book">Đang mượn</span>
                                    <span v-if="borrow.status ">Đã trả</span>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="payging" v-if="this.totalPage>=2">
                <div v-for="(data,index) in dataTotal" :key="index" class="number" @click="handlePayging(data+1)">{{data+1}}</div>
            </div>
        </v-container>
    </div>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            datas:[],
            totalPage:'',
            dataTotal:[]
        }
    },
    mounted () {
        axios.get(`https://ptdapmback.herokuapp.com/v1/api/borrowings?page=0&limit=4&sort=id&filter-field=user.id&filter-operator=EQUALS&filter-value=${JSON.parse(localStorage.getItem('User')).id}`,{
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
            }
        })
        .then((res)=>{
            console.log(res.data);
            this.totalPage=res.data.totalPages
            this.datas=res.data.content
            this.payging(this.totalPage)
        })
        .catch((err)=>{
            console.log(err.response.data);
        })
    },
    methods:{
        payging(total){
            for(let i=0;i<total;i++){
                this.dataTotal.push(i)
            }
        },
        handlePayging(number){
            axios.get(`https://ptdapmback.herokuapp.com/v1/api/borrowings?page=${number-1}&limit=4&sort=id&filter-field=user.id&filter-operator=EQUALS&filter-value=${JSON.parse(localStorage.getItem('User')).id}`,{
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('User')).token}`
                }
            })
            .then((res)=>{
                console.log(res.data);
                this.datas=res.data.content
            })
            .catch((err)=>{
                console.log(err.response.data);
            })
        }
    }
}
</script>

<style scoped>
.payging{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin:20px 0;
}
.number{
    padding:10px 20px;
    border-radius:5px ;
    box-shadow: 0 0 3px #999;
    margin:0 10px;
    cursor: pointer;
}
.number:hover{
    background-color:#f5f5f5;
}
.book{
    color:green;
}
.wait{
    color: rgb(248, 87, 0);
}
.borrowed{
    color: green;
}
.paid{
    color:#555;
}
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
td{
    font-weight:500;
}
</style>