<template>
    <div @click="listClicked" :class="list.state" >
        <p> {{ list.text }} <i @click="$emit('delete-list', list)" class="i fas fa-times"></i></p>
    </div>
</template>

<script>
    export default {
        name: 'List',
        props: {
            list:Object
        },
        methods:{
            listClicked(){
                this.$emit('list-clicked', this.list)
            }
        }
    }

</script>

<style scoped>
    div{
        cursor: pointer;
    }
    .without-tasks{
        background-color: white;
    }
    .not-all-are-done{
        background-color: green;
    }
    .all-done{
        background-color: gray;
    }
</style>