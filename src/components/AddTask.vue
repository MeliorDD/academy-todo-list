<template>
    <form @submit="onSubmit">
        <input type="text" name="text" v-model="text" placeholder="Введите дело">
        <input type="checkbox" v-model="isImportant" id="important">
        <label for="important"> Срочное </label>
        <input type="submit" value="Добавить дело">
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

                if(!this.text){
                    alert('Введите название дела!')
                    return
                }
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

