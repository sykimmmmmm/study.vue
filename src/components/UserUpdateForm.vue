<template>
  <form @submit.prevent="submit">
    <v-text-field
      v-model="name.value.value"
      :counter="10"
      :error-messages="name.errorMessage.value"
      label="Name"
    ></v-text-field>

    <v-text-field
      v-model="phone.value.value"
      :counter="7"
      :error-messages="phone.errorMessage.value"
      label="Phone Number"
    ></v-text-field>

    <v-text-field
      v-model="email.value.value"
      :error-messages="email.errorMessage.value"
      label="E-mail"
    ></v-text-field>

    <v-select
      v-model="select.value.value"
      :error-messages="select.errorMessage.value"
      :items="items"
      label="Select"
    ></v-select>

    <v-checkbox
      v-model="checkbox.value.value"
      :error-messages="checkbox.errorMessage.value"
      label="Option"
      type="checkbox"
      value="1"
    ></v-checkbox>

    <v-btn
      class="me-4"
      type="submit"
    >
      submit
    </v-btn>

    <v-btn @click="handleReset">
      clear
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