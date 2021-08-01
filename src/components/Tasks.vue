<template>
    <div>
        <p> {{ list.text }} <i class="i fas fa-times"></i></p>
    </div>
</template>

<script>

    export default {
        name: 'Tasks',
        props: {
            list:Object
        },
    }

</script>

<style scoped>
    div{
        cursor: pointer;
    }
</style>