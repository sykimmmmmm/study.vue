<template>
     <v-container>
        <v-card max-width="1200">
            <v-card-title class="text-h6 text-center">회원 등록</v-card-title>
            <v-card-text>
                <v-form ref="registerForm" enctype="multipart/form-data">
                    <!-- 아이디 -->
                    <v-text-field
                        v-model="userVO.userId"
                        label="아이디"
                        required
                        variant="outlined"
                        density="comfortable"
                    ></v-text-field>

                    <!-- 비밀번호 -->
                    <v-text-field
                        v-model="userVO.userPw"
                        type="password"
                        required
                        label="비밀번호"
                        variant="outlined"
                        density="comfortable"
                    ></v-text-field>

                    <!-- 이름 -->
                    <v-text-field
                        v-model="userVO.userNm"
                        label="이름"
                        required
                        variant="outlined"
                        density="comfortable"
                    ></v-text-field>

                    <!-- 이미지 업로드 영역 -->
                    <div class="my-4 ">
                        <label class="text-subtitle-2 mb-1 d-block">
                        <v-icon start icon="mdi-image"></v-icon> 프로필 이미지
                        </label>
                        <v-row justify="space-between" class="ma-0">
                            <v-col v-if="imgUrl" cols="9" class="pa-0">
                                <v-img
                                :src="imgUrl"
                                class="rounded-lg elevation-1"
                                width="300"
                                height="200"
                                contain
                                ></v-img>
                            </v-col>
                            <v-col cols="3" class="">
                                <input
                                ref="fileInput"
                                type="file"
                                accept="image/*"
                                @change ="(e)=>previewImg(e)"
                                />
                            </v-col>
                        </v-row>
                    </div>

                    <!-- 권한 체크박스 -->
                    <div class="my-4">
                        <label class="text-subtitle-2 mb-1 d-block">
                        <v-icon start icon="mdi-key"></v-icon> 권한 설정
                        </label>
                        <v-row dense>
                            <v-col
                                v-for="auth in authList"
                                :key="auth.cd"
                                cols="6"
                                class="d-flex align-center"
                            >
                                <v-checkbox
                                v-model="selectedAuthList"
                                :label="auth.cdNm"
                                :value="auth.cd"
                                hide-details
                                density="compact"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                    </div>

                    <!-- 버튼 영역 -->
                    <v-row class="mt-6" justify="end" align="center">
                        <v-btn color="primary" class="me-2" @click="registerSubmit()" >등록</v-btn>
                        <v-btn color="secondary" @click="goList()" >취소</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import Axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
    name:"UserRegister" ,
    data() {
            return {
                router : '',
                userId : '',
                userVO : {userId:'',userPw:'',userNm:'',userAuthList:[],boFiles:[]},
                fileVO : {},
                defaultImg : "",
                authList : [],
                previewSrc :''
            }
        },
    computed:{
        imgUrl:{
            get(){
                if(this.previewSrc){
                    return this.previewSrc
                }
                return this.defaultImg
            },
            set(fileSrc){
                return fileSrc;
            }
        },
        selectedAuthList: {
            get() {
                if (!this.userVO || !Array.isArray(this.userVO.authVOList)) {return [];}
                return this.userVO.authVOList.map(vo => vo.userAuth);
            },
            set(newCodes) {
                this.userVO.authVOList = newCodes.map(code => {
                    const authObj = this.authList.find(a => a.cd === code);
                    return {
                        userId: this.userVO.userId,
                        userAuth: code,
                        authNm: authObj ? authObj.cdNm : ""
                    };
                });
            }
        },
    },
    methods : {
        async loadCode(){
            const response = await Axios.get('/api/auth');
            console.log(response);
            this.authList = response.data;
        },  
        goList(){
            this.router.push("/userList")
        },
        goUpdateForm(){
            this.router.push({name:"userUpdateForm", params:{userId:this.userId } })
        },
        openFileInput(){
            this.$refs.fileInput.click();
        },
        resetImg(){
            this.previewSrc = '';
            this.userVO.boFiles = [];
        },
        previewImg(e){
            const files = e.target.files;
            const file = files[0];
            this.previewSrc = URL.createObjectURL(file);
            this.userVO.boFiles = [];
            this.userVO.boFiles.push(file);
        },
        registerSubmit(){
            console.log(this.userVO);
            const formData = new FormData();
            this.makeFormData(formData,this.userVO);
            Axios.post("/api/users",formData)
            .then((res)=>{
                if(res.data.status === 'OK'){
                    this.router.push(`/userDetail/${this.userVO.userId}`)
                }
            })
            .catch((err)=>{
                console.error(err);
            })
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
        }
        
    },
    mounted(){
        this.userId = this.$route.params.userId
        this.router = this.$router
        this.loadCode();

    }
})
</script>