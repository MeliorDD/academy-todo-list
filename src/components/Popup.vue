<template>
    <div class="popup-wrapper">
        <div class="popup">
            <div class="massage">
                <slot></slot>
            </div>
            <div v-if="type === 'alert'" class="if-alert">
                <b-button class = "button ok" variant="primary" @click="close">Ок</b-button>
            </div>
            <div v-if="type === 'confirm'" class="if-confirm">
                <b-button class = "button ok" variant="primary" @click="accept">Да</b-button>
                <b-button class = "button cancel" variant="primary" @click="cancel">Нет</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
        name:'Popup',
        props:{
            type: String
        },
        methods:{
            close(){
                this.$emit('close')
            },
            accept(){
                this.$emit('accept')
            },
            cancel(){
                this.$emit('cancel')
            }
        }
    }
</script>

<style scoped lang = "scss">
    @import "../assets/popup.scss"
</style>
