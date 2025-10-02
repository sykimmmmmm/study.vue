<template>
    <UserUpdateForm/>
</template>

<script>
import { defineComponent } from "vue"
import UserUpdateForm from "../components/UserUpdateForm.vue"

export default defineComponent({
    name:"userDetailView",
    data(){
        return {

        }
    },
    methods:{
    },
    mounted() {
    },
    components:{
        UserUpdateForm
    }
})
</script>