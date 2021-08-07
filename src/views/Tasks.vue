<template>
    <div>
        <Popup :type ="typeOfPopup" v-if="isPopupVisible" @accept="accept" @cancel="cancel">
            {{massageInPopup}}
        </Popup>
        <h3>{{currentList.text}}</h3>
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
    import Popup from '../components/Popup'
    export default{
        name:'Tasks',
        components: {
            Task,
            Popup
        },
        data(){
            return{
                typeOfPopup: '',
                isPopupVisible:false,
                massageInPopup:'',
                taskToDelete:{}
            }
        },
        computed:{
            currentList(){
                return this.$store.getters.getCurrentList
            }
        },
        methods:{
            async deleteTask(taskToDelete){
                this.showPopup('confirm', `Удалить дело "${taskToDelete.text}"?`)
                this.taskToDelete = taskToDelete
            },

            async checkboxClicked(taskToChange){
                this.$store.dispatch('checkboxClicked', taskToChange)
            },
            showPopup(type, massage){
                this.isPopupVisible = true
                this.typeOfPopup = type
                this.massageInPopup = massage
            },
            accept(){
                this.$store.dispatch('deleteTask',this.taskToDelete)
                this.isPopupVisible = false
            },
            cancel(){
                this.isPopupVisible = false
            }
        }
    }
</script>

<style scoped>
    h3{
        margin: 20px 0;
    }
</style>
