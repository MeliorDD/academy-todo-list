<template>
    <form @submit="onSubmit">
        <b-form-input class="input" type="text" name="text" v-model="text" placeholder="Введите название списка"></b-form-input>
        <b-button type="submit" variant="primary"> Добавить список</b-button>
    </form>
</template>

<script>
    export default{
        name: 'AddList',
        data(){
            return {
                text: ''
            }
        },
        methods:{
            onSubmit(e){
                e.preventDefault()

                
                
                this.$emit('add-list',this.text)
                
                this.text = ''
                
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/addList.scss"
</style>

