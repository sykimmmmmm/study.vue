<template>
    <v-table
        class="elevation-1"
        striped = "even"
    >
    <thead>
        <th class="text-center">번호</th>
        <th class="text-center">아이디</th>
        <th class="text-center">이름</th>
        <th class="text-center">등록자</th>
        <th class="text-center">등록일자</th>
    </thead>
    <tbody>
        <tr v-for="(user,idx) in list" :key="user.userId">
        
            <td>{{idx+1}}</td>
            <td><router-link :to="`/userDetail/${user.userId}`">{{user.userId}}</router-link></td>
            <td>{{user.userNm}}</td>
            <td>{{user.rgstId}}</td>
            <td>{{user.rgstDt}}</td>
        </tr>
    </tbody>
    </v-table>
    <v-row class="mt-6" justify="end" align="center">
        <v-btn class="me-2"> <router-link :to="`/userRegisterForm`">등록</router-link> </v-btn>
    </v-row>
</template>

<script>
import Axios from 'axios';
import { defineComponent } from 'vue';
export default defineComponent({
    name : "UserListView",
    data(){
        return {
            pagination: {
                sortBy: 'name'
            },
            selected : [],
            list : [],
            headers: [
                {
                    title: '유저 아이디',
                    align: 'left',
                    value: 'userId'
                },
                { title: '유저 이름', value: 'userNm' },
                { title: '등록자', value: 'rgstId' },
                { title: '등록 일시', value: 'rgstDt' }
            ],
        }
    },
    methods:{
        async getUserList() {
            try{
                const result = await Axios.get("/api/users");
                this.list = result.data;
            }catch(err){
                console.log(err)
            }
            
        }
    },
    mounted() {
        this.getUserList()
    }
})
</script>