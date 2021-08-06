<template>
  <div class="root">
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
          :class="list.id === currentList.id ? 'active' : 'inactive'"
          />
      </div>
      <AddList @add-list="addList"/>
    </div>
    <div class="right-side">
      <router-view></router-view>
      <AddTask @add-task="addTask"/>
    </div>
  </div>
</template>

<script>
  import List from './List'
  import AddList from './AddList'
  import AddTask from './AddTask';
  import {mapGetters} from 'vuex'

  export default {
    name: 'MainPage',
    components:{
      List,
      AddList,
      AddTask,
    },

    data()
    {
      return{
        lists:[],
        selected: 'Неисполненные'
      }
    },
    methods:{
      listClicked(list){
        this.$store.dispatch('changeCurrentList', list)
        this.$router.push({name:'tasks', params:{ id:this.currentList.id, list:this.currentList}})
      },

      async addList(text){
        const newList = {
          text: text,
          state: "without-tasks",
          tasks:[]
        }
        await this.$store.dispatch('addList', newList)
        this.filterByState()
      },

      async deleteList(listToDelete){
        await this.$store.dispatch('deleteList', listToDelete)
        if(listToDelete.id === this.currentList.id) {
          this.$router.push({path:'/'})
          this.$store.dispatch('changeCurrentList', {})
        }
      },

      async addTask(taskToAdd){
        this.$store.dispatch('addTask', taskToAdd)
      },
      sortLists(){
          this.lists.sort((a, b) => {
          const textA=a.text.toLowerCase(), textB=b.text.toLowerCase()
          if (textA < textB)
            return -1
          if (textA > textB)
            return 1
          return 0
        })
      },
      filterByState(){

        this.$store.commit('CHANGE_SELECTED', this.selected)
        this.$store.dispatch('filterByState')
      },
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
    emits:['list-clicked', 'add-list', 'delete-list','add-task']
  }
</script>

<style>
  .root{
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    box-sizing: border-box;

    display: flex;
    border: 1px solid black;
    height: 95vh;
  }
  .left-side{
    flex: 0 0 30%;
    border: 1px solid black;
  
  }
  .filter{
    height: 50px;
    border-bottom: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .right-side{
    flex:0 0 70%;
  }
  .active{
    border: 1px solid black;
  }

</style>
