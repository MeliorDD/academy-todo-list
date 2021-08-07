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
    form{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        border-top: 1px solid black;
        .checkbox{
            margin: 0px 20px
        }
        .button{
            min-width: 160px;
        }
    }
    @media(max-width:947px){
        form{
            flex-wrap: wrap;
            justify-content: start;
            .input{
                margin-bottom: 20px;
            }
            .checkbox{
                margin: 0;
                margin-right: 20px;
            }
        }
    }
</style>

