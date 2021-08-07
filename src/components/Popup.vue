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
    .popup-wrapper{
        position: absolute;
        top:0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(182, 150, 150, 0.1);
        z-index: 100;
        .popup{
            background-color: #fff;
            padding: 30px 20px;
            width: 400px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            position: fixed;
            top:50px;
            left: 0; 
            right: 0; 
            margin-left: auto; 
            margin-right: auto; 
            box-shadow: 0 0 17px 0;
            .massage{
                margin-bottom: 20px;
            }
            .button{
                width: 100px;;
            }
            .if-confirm{
                .ok{
                    margin-right: 20px;
                }
            }
        }
    }
    
</style>
