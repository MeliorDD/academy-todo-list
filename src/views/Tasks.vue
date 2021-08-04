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
        data(){
            return{
                currentList:{}
            }
        },
        watch: {
            $route() {
                this.currentList = this.$route.params.list
            }
        },
        created(){
            this.currentList = this.$route.params.list
        },
        methods:{
            async deleteTask(taskToDelete){
                if(confirm(`Удалить дело "${taskToDelete.text}"?`))
                {
                this.currentList.tasks = this.currentList.tasks.filter(task => task.id !== taskToDelete.id)
                this.changeState()
                fetch(`http://localhost:5000/lists/${this.currentList.id}`,{
                    method:'PUT',
                    headers:{
                    'Content-type': 'application/json'
                    },
                    body:JSON.stringify(this.currentList)
                })
                }
            },

            async checkboxClicked(taskToChange){
                this.currentList.tasks.forEach(task => {
                if(task.id === taskToChange.id) task.isDone = !taskToChange.isDone
                })
                this.changeState()
                fetch(`http://localhost:5000/lists/${this.currentList.id}`,{
                method:'PUT',
                headers:{
                    'Content-type': 'application/json'
                },
                body:JSON.stringify(this.currentList)
                })
            },
            changeState(){
                const count = this.currentList.tasks.filter(task => task.isDone === true).length
                if(this.currentList.tasks.length === 0){
                this.currentList.state = "without-tasks"
                }
                else if(count < this.currentList.tasks.length){
                this.currentList.state = "not-all-are-done"
                }
                else if(count === this.currentList.tasks.length)
                {
                this.currentList.state = "all-done"
                }
            }
        }
    }
</script>
