<template>
    <div class="task">
        <div class="left">
            <input type="checkbox" @click="checkboxClicked" :checked="task.isDone"/>
            <label v-if="task.isImportant"></label>
            <p> {{task.text}} </p>
        </div>
        <div class="right">
            <p> {{task.date}} </p>
            <i @click="deleteTask" class="i fas fa-times"></i>
        </div>
        
    </div>
</template>

<script>

export default{
    name: 'Task',
    props:{
        task: Object,
    },
    methods:{
        checkboxClicked(){
            this.$emit('checkbox-clicked',this.task)
        },
        deleteTask(){
            this.$emit('delete-task', this.task)
        }
    }
}
</script>


<style scoped lang = "scss">
    @import "../assets/task.scss"
</style>