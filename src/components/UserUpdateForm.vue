<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="userVO.userId"
      label="아아디"
    ></v-text-field>

    <v-text-field
      v-model="userVO.userPw"
      label="비밀번호"
    ></v-text-field>

    <v-text-field
      v-model="userVO.userNm"
      label="이름"
    ></v-text-field>

    <v-checkbox
      v-model="userVO.userAuthList"
      v-for="userAuth in userVO.userAuthVOList"
      :key="userAuth"
      :label="userAuth.userAuth"
      :value="userAuth.authNm"
    ></v-checkbox>

    <v-file-input
      v-model="userVO.boFiles"
      label="파일"
      accept="image/*"
    ></v-file-input>

    <v-btn
      class="me-4"
      type="submit"
    >
      submit
    </v-btn>

  </form>
</template>

<script>
import avatar from "@/assets/avatar.png"
    import Axios from 'axios'
    import { ref } from 'vue';
    
    let router = null;
    let userId = ref("");

    export default {
        name: 'UserUpdateForm',
        data() {
            return {
                userVO : {userId:'',userPw:'',userNm:'',userAuthList:[],boFiles:[]},
                fileVO : {},
                defaultImg : avatar
            }
        },
        computed:{
            imgUrl(){
                if(this.fileVO && this.fileVO.fileGrpId){
                    return  `/api/cmmn/view?fileGrpId=${this.fileVO.fileGrpId}&fileNo=${this.fileVO.fileNo}`
                }
                return this.defaultImg
            }
        },
        methods : {
            async loadUser(userId){
                const response = await Axios.get("/api/users/"+userId);
                console.log(response);
                this.userVO = response.data;
                this.fileVO = this.userVO.fileVO;
            },
            goList(){
                router.push("/userList")
            },
            goUpdateForm(){
                router.push({name:"userUpdateForm", params:{userId:userId.value } })
            }
        },
        mounted(){
            userId.value = this.$route.params.userId
            this.loadUser(userId.value);
            router = this.$router
            
        }
    }
</script>