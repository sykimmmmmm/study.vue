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
    
    export default {
        name: 'UserDetail',
        data() {
            return {
                router:'',
                userId : '',
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
                this.router.push("/userList")
            },
            goUpdateForm(){
                this.router.push({name:"userUpdateForm", params:{userId:this.userId} })
            },
            deleteUser(){
                if(confirm('정말로 삭제하시겠습니까?')){
                    const formData = new FormData();
                    this.userVO.delYn = 'Y';
                    this.makeFormData(formData,this.userVO);
                    Axios.post(`/api/users/${this.userId}`,formData)
                    .then((res)=>{
                        if(res.data.status === 'OK'){
                            this.router.push("/userList");
                        }
                    })
                }
            },
            makeFormData(formData,data){
                formData.append(
                    "userVO",
                    new Blob([JSON.stringify(data)], { type: "application/json" })
                );

                // 파일이 존재할 경우 파일 리스트 추가
                if (data.boFiles && Array.isArray(data.boFiles)) {
                    data.boFiles.forEach(file => {
                        if (file instanceof File) {
                            formData.append("boFiles", file);
                        }
                    });
                }
            },
        },
        mounted(){
            this.userId = this.$route.params.userId
            this.loadUser(this.userId);
            this.router = this.$router
            
        }
    }
</script>