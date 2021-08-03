<template>
    <div @click="$emit('list-clicked', list)" :class="list.state" >
        <p> {{ list.text }} <i @click="$emit('delete-list', list)" class="i fas fa-times"></i></p>
    </div>
</template>

<script>

    export default {
        name: 'List',
        props: {
            list:Object
        },
    }

</script>

<style scoped>
    div{
        cursor: pointer;
    }
    .without-tasks{
        background-color: white;
    }
    .not-all-are-done{
        background-color: green;
    }
    .all-done{
        background-color: gray;
    }
</style>