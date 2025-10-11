<template>
    <v-container>
        <v-card max-width="1200">
            <v-card-title class="text-h6 text-center">정보 수정</v-card-title>
            <v-card-text>
                <v-form ref="updateForm" enctype="multipart/form-data">
                    <!-- 아이디 -->
                    <v-text-field
                        v-model="userVO.userId"
                        label="아이디"
                        readonly
                        variant="outlined"
                        density="comfortable"
                    ></v-text-field>

                    <!-- 비밀번호 -->
                    <v-text-field
                        v-model="userVO.userPw"
                        type="password"
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
                            width="300"
                            class="rounded-lg elevation-1"
                            contain
                            ></v-img>
                        </v-col>
                        <v-col cols="3" class="">
                            <v-btn color="warning" size="small" @click="openFileInput()">
                            수정
                            </v-btn>
                            <v-btn color="info" size="small" @click="resetImg()" >
                            이미지 초기화
                            </v-btn>
                            <input
                            ref="fileInput"
                            type="file"
                            accept="image/*"
                            class="d-none"
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
                        <v-btn color="primary" class="me-2" @click="updateSubmit()" >저장</v-btn>
                        <v-btn color="secondary" @click="cancelUpdate()" >취소</v-btn>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import avatar from "@/assets/avatar.png"
    import Axios from 'axios'

    export default {
        name: 'UserUpdateForm',
        data() {
            return {
                router : '',
                userId : '',
                userVO : {userId:'',userPw:'',userNm:'',userAuthList:[],boFiles:[]},
                fileVO : {},
                defaultImg : avatar,
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
                    if(this.fileVO && this.fileVO.fileGrpId){
                        return  `/api/cmmn/view?fileGrpId=${this.fileVO.fileGrpId}&fileNo=${this.fileVO.fileNo}`
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
            async loadUser(userId){
                const response = await Axios.get("/api/users/"+userId);
                console.log(response);
                response.data.userPw='';
                this.userVO = response.data;
                this.userVO.boFiles = [];
                this.fileVO = this.userVO.fileVO;
            },
            async loadCode(){
                const response = await Axios.get('/api/auth');
                console.log(response);
                this.authList = response.data;
                
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
            updateSubmit(){
                console.log(this.userVO);
                const formData = new FormData();
                this.makeFormData(formData,this.userVO);
                Axios.post(`/api/users/${this.userId}`,formData)
                .then((res)=>{
                    if(res.data.status === 'OK'){
                        this.router.push(`/userDetail/${this.userId}`)
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
            },
            cancelUpdate(){
                this.router.push(`/userDetail/${this.userId}`)
            }
            
        },
        mounted(){
            this.userId = this.$route.params.userId
            this.loadUser(this.userId);
            this.router = this.$router
            this.loadCode();

        }
    }
</script>