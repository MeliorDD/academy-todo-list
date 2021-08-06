<template>
    <div>
        <Task 
            @delete-task = "deleteTask" 
            @checkbox-clicked = "checkboxClicked" 
            v-for="task in currentList.tasks" 
            :key="task.id" 
            :task="task"/>
    </div>
</template>

<script>
    import Task from '../components/Task'
    export default{
        name:'Tasks',
        components: {
            Task,
        },
        computed:{
            currentList(){
                return this.$store.getters.getCurrentList
            }
        },
        methods:{
            async deleteTask(taskToDelete){
                this.$store.dispatch('deleteTask',taskToDelete)
            },

            async checkboxClicked(taskToChange){
                this.$store.dispatch('checkboxClicked', taskToChange)
            },
        }
    }
</script>
