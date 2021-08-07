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
    div{
        position: relative;
        padding: 10px;
        margin: 20px;
        border: 1px solid black;
    }
    .text{
        cursor: pointer;
        width: 100%;
        height: 100%;
        display: block;
    }
    .fas{
        position: absolute;
        top:33%;
        right: 10px;
        cursor: pointer;
        float: right;
        transition: all ease .3s;
        &:hover{
            transform: scale(1.15);
        }
    }
    .active{
        border: 2px solid black;
    }
    .without-tasks{
        background-color: white;
    }
    .not-all-are-done{
        background-color: #d5e8d4;
    }
    .all-done{
        background-color: #eeeeee;
    }
</style>