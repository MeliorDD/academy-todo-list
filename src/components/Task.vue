<template>
    <div>
        <input type="checkbox"/>
        <label v-if="task.isImportant"></label>
        <p> {{task.text}} </p>
        <p> {{task.date}} </p>
        <i class="i fas fa-times"></i>
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