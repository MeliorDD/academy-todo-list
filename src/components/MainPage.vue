<template>
  <div class="root">
    <Popup :type ="typeOfPopup" v-if="isPopupVisible" @close="close" @accept="accept" @cancel="cancel">
      {{massageInPopup}}
    </Popup>
    <div class="left-side">
      <div class="filter">
        <select v-model="selected" @change="filterByState">
          <option value="Неисполненные">Неисполненные</option>
          <option value="Исполненные">Исполненные</option>
          <option value="Все">Все</option>
        </select>
      </div>
      <div class="list-of-lists">
        <List @list-clicked ="listClicked" v-for="list in listsToShow" 
          :key="list.id" 
          :list = "list"
          @delete-list="deleteList" 
          :isActive="list.id === currentList.id ? true : false"
          />
      </div>
      <AddList @add-list="addList"/>
    </div>
    <div class="right-side">
      <div class="list-of-tasks">
        <router-view></router-view>
      </div>
      
      <AddTask @add-task="addTask"/>
    </div>
  </div>
</template>

<script>
  import List from './List'
  import AddList from './AddList'
  import AddTask from './AddTask';
  import Popup from './Popup';
  import {mapGetters} from 'vuex'


  export default {
    name: 'MainPage',
    components:{
      List,
      AddList,
      AddTask,
      Popup,
    },
    data()
    {
      return{
        selected: 'Неисполненные',
        typeOfPopup: '',
        isPopupVisible:false,
        massageInPopup:'',
        listToDelete:{}
      }
    },
    methods:{
      listClicked(list){
        this.$store.dispatch('changeCurrentList', list)
        this.$router.push({name:'tasks', params:{ id:this.currentList.id, list:this.currentList}})
      },

      async addList(text){
        if(!text){
            this.showPopup('alert', "Введите название списка!")
            return
        }
        const newList = {
          text: text,
          state: "without-tasks",
          tasks:[]
        }

        await this.$store.dispatch('addList', newList)
        this.showPopup('alert',`Список дел "${text}" добавлен`)
        //this.filterByState()

      },

      async deleteList(listToDelete){
        this.listToDelete = listToDelete
        this.showPopup('confirm', `Удалить список дел "${listToDelete.text}"?`)
      },

      async addTask(taskToAdd){
        if(Object.keys(this.currentList).length === 0){
          this.showPopup('alert', 'Выберите список дел!')
          return
        }
        if(!taskToAdd.text){
          this.showPopup('alert','Введите название дела!')
          return
        }
        this.$store.dispatch('addTask', taskToAdd)
        this.showPopup('alert', `"${taskToAdd.text}" добавлено в "${this.currentList.text}" `)
      },
      filterByState(){

        this.$store.commit('CHANGE_SELECTED', this.selected)
        this.$store.dispatch('filterByState')
      },
      showPopup(type, massage){
        this.isPopupVisible = true
        this.typeOfPopup = type
        this.massageInPopup = massage
      },
      close(){
        this.isPopupVisible = false
      },
      async accept(){
        await this.$store.dispatch('deleteList', this.listToDelete)
        if(this.listToDelete.id === this.currentList.id) {
          this.$router.push({path:'/'})
          this.$store.dispatch('changeCurrentList', {})
        }
        this.isPopupVisible = false
      },
      cancel(){
        this.isPopupVisible = false
      }
    },
    async created(){
        await this.$store.dispatch('loadLists')
    },
    computed:{
        ...mapGetters(['getLists','getListsToShow','getCurrentList']),
        listsToShow(){
          return this.getListsToShow
          
        },
        currentList(){
          return this.getCurrentList
        }
    },
    emits:['list-clicked', 'add-list', 'delete-list','add-task','close','accept', 'cancel']
  }
</script>

<style lang="scss">
  @import "../assets/mainPage.scss"
</style>
