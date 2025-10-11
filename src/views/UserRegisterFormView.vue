<template>
    <UserRegisterForm/>
</template>

<script>
import { defineComponent } from "vue"
import UserRegisterForm from "../components/UserRegisterForm.vue"

export default defineComponent({
    name:"userRegisterFormView",
    data(){
        return {

        }
    },
    methods:{
    },
    mounted() {
    },
    components:{
        UserRegisterForm
    }
})
</script>