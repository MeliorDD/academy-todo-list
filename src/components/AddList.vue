<template>
    <form @submit="onSubmit">
        <input type="text" name="text" v-model="text" placeholder="Введите название списка">
        <input type="submit" value="Добавить список">
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

