<template>
    <v-card
        class="mx-auto"
        max-width="800"
    >
        <v-img
        height="200px"
        :src="imgUrl"
        contain
        ></v-img>

        <v-card-title></v-card-title>

        <v-card-text>
        <v-list lines="two">
            <v-list-item>
                <template v-slot:prepend>
                <span class="me-2">아이디 :</span> 
                </template>

                <v-list-item-title>{{userVO.userId}}</v-list-item-title>

            </v-list-item>

            <v-list-item>
                <template v-slot:prepend>
                <span class="me-2">이름 :</span> 
                </template>

                <v-list-item-title>{{userVO.userNm}}</v-list-item-title>
            </v-list-item>

            <v-list-item>
                <template v-slot:prepend>
                <span class="me-2">권한 :</span> 
                </template>

                <v-list-item-title>
                    <v-chip color="primary" v-for="auth in userVO.authVOList" :key=auth.userAuth class="me-1">
                        {{auth.authNm}}
                    </v-chip>
                </v-list-item-title>
            </v-list-item>

            <v-divider inset></v-divider>

            <v-list-item>
                <template v-slot:prepend>
                <span class="me-2">등록자 :</span> 
                </template>

                <v-list-item-title>{{userVO.rgstId}}</v-list-item-title>
            </v-list-item>

            <v-list-item>
                <template v-slot:prepend>
                <span class="me-2">등록일시 :</span> 
                </template>

                <v-list-item-title>{{userVO.rgstDt}}</v-list-item-title>
            </v-list-item>

            <v-list-item>
                <template v-slot:prepend>
                <span class="me-2">수정자 :</span> 
                </template>

                <v-list-item-title>{{userVO.updtId}}</v-list-item-title>
            </v-list-item>

            <v-list-item>
                <template v-slot:prepend>
                <span class="me-2">수정일시 :</span> 
                </template>

                <v-list-item-title>{{userVO.updtDt}}</v-list-item-title>
            </v-list-item>
        </v-list>
        </v-card-text>

        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="orange-lighten-2"
            text="수정"
            @click="goUpdateForm()"
        ></v-btn>
        <v-btn
            color="red-lighten-2"
            text="삭제"
            @click="deleteUser()"
        ></v-btn>
        <v-btn
            color="grey"
            text="목록"
            @click="goList()"
        ></v-btn>
        </v-card-actions>

    </v-card>
</template>

<script>
    import avatar from "@/assets/avatar.png"
    import Axios from 'axios'
    import { ref } from 'vue';
    
    let router = null;
    let userId = ref("");

    export default {
        name: 'UserDetail',
        data() {
            return {
                userVO : {},
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