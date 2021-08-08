<template>
    <form @submit="onSubmit">
        <b-form-input class = "input" type="text" name="text" v-model="text" placeholder="Введите дело"></b-form-input>
        <b-form-checkbox type="checkbox" class = "checkbox" v-model="isImportant" id="important">Срочное</b-form-checkbox>
        <b-button type="submit" class = "button" variant="primary">Добавить дело</b-button>
    </form>
</template>

<script>
    export default{
        name: 'AddTask',
        data(){
            return {
                text: '',
                isImportant: false,
            }
        },
        methods:{
            onSubmit(e){
                e.preventDefault()
                const date = new Date()

                const newTask = {
                    isDone: false,
                    isImportant: this.isImportant,
                    text: this.text,
                    date: `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
                }

                this.$emit('add-task',newTask)
                
                this.text = '',
                this.isImportant = false
                
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/addTask.scss";
</style>

