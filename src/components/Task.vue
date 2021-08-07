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
    p{
        margin: 0;
    }
    .task{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #000;
        border-radius: 5px;
        margin: 10px;
        padding: 10px;
        .left{
            display: flex;
            align-items: center;
            padding: 0;
            input{
                margin-right: 10px;
            }
            label{
                margin: 0;
                margin-right: 10px; 
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background-color: red;
            }
        }
        .right{
            display: flex;
            align-items: center;
            .fas{
                margin-left: 10px;
                cursor: pointer; 
                transition: all ease .3s;
                &:hover{
                    transform: scale(1.15);
                }
            }
        }
    }
</style>