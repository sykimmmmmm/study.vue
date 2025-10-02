<template>
    <UserDetail/>
</template>

<script>
import { defineComponent } from "vue"
import UserDetail from "../components/UserDetail.vue"

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
        UserDetail
    }
})
</script>