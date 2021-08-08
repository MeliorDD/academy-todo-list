<template>
    <div  :class="isActive === true ? list.state + ' active' : list.state" >
        <span class="text" @click="listClicked"> {{ list.text }} </span> <span @click="deleteList" class="i fas fa-times"></span>
    </div>
</template>

<script>
    export default {
        name: 'List',
        props: {
            list:Object,
            isActive: Boolean
        },
        methods:{
            listClicked(){
                this.$emit('list-clicked', this.list)
            },
            deleteList(){
                this.$emit('delete-list', this.list)
            }
        }
    }

</script>

<style scoped lang="scss">
    @import "../assets/list.scss"
</style>