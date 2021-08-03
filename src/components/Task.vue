<template>
    <div>
        <input type="checkbox" @click="$emit('checkbox-clicked',task)" :checked="task.isDone === true ? true : false"/>
        <label v-if="task.isImportant"></label>
        <p> {{task.text}} </p>
        <p> {{task.date}} </p>
        <i @click="$emit('delete-task', task)" class="i fas fa-times"></i>
    </div>
</template>

<script>

export default{
    name: 'Task',
    props:{
        task: Object,
    }
}
</script>


<style scoped>
    div{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid #000;
    }
    label{
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: red;
    }
    .fas{
        color: red;
        cursor: pointer;
    }
</style>