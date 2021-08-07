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

                if(!this.text){
                    alert('Введите название списка!')
                    return
                }
                
                this.$emit('add-list',this.text)
                
                this.text = ''
                
            }
        }
    }
</script>

<style scoped lang="scss">
    form{
        padding: 20px;
        border-top: 1px solid black;
        .input{
            margin-bottom: 10px;
        }
    }
</style>

