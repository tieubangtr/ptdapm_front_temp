import axios from 'axios';

const setAuth=(AUTH_TOKEN)=>{
    if(AUTH_TOKEN){
        console.log(AUTH_TOKEN);
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    }
    // else{
    //     delete axios.defaults.headers.Authorization
    // }
}
export default setAuth