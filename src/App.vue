<template>
  <div class="root">
    <div class="left-side">
      <div class="filter">
        <select>
          <option value="1">Все</option>
          <option value="2">Доделанные</option>
          <option value="3">Недоделанные</option>
        </select>
      </div>
      <div class="list-of-lists">
        <List @list-clicked ="listClicked" v-for="list in lists" 
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
  import List from './components/List'
  import AddList from './components/AddList'
  import AddTask from './components/AddTask';

  export default {
    name: 'App',
    components:{
      List,
      AddList,
      AddTask,
    },

    data()
    {
      return{
        lists:[],
        currentList: {},
      }
    },
    methods:{
      listClicked(list){
        this.currentList = list
        this.$router.push({name:'tasks', params:{ id:this.currentList.id, list:this.currentList}})
      },

      async addList(text){
        const newList = {
          text: text,
          state: "without-tasks",
          tasks:[]
        }
        const res = await fetch("http://localhost:5000/lists",{
          method: 'POST',
          headers:{
            'Content-type': 'application/json'
          },
          body:JSON.stringify(newList)
        })
        const data = await res.json()
        this.lists = [...this.lists, data]
      },

      async deleteList(listToDelete){
        if(confirm(`Удалить список "${listToDelete.text}" ?`)){
          const res = await fetch(`http://localhost:5000/lists/${listToDelete.id}`, {
            method: 'DELETE'
          })
          res.status === 200 ? (this.lists = this.lists.filter(list => list.id !== listToDelete.id)) : alert('Ошибка удаления списка')
        }
      },

      async addTask(taskToAdd){
        if(Object.keys(this.currentList).length === 0){
          alert('Выберите список дел!')
          return
        }
        this.currentList.tasks.length !== 0 ? taskToAdd.id = this.currentList.tasks[this.currentList.tasks.length - 1].id + 1: taskToAdd.id = 0
        console.log(this.currentList.tasks.length)
        this.currentList.tasks.push(taskToAdd)
        if(this.currentList.state === 'without-tasks') this.currentList.state = 'not-all-are-done'
        fetch(`http://localhost:5000/lists/${this.currentList.id}`,{
          method:'PUT',
          headers:{
            'Content-type': 'application/json'
          },
          body:JSON.stringify(this.currentList)
        })
      },
    },
    async created(){
      this.lists = await this.$store.dispatch('loadLists')
    },
    emits:['list-clicked', 'add-list', 'delete-list','add-task', 'delete-task','checkbox-clicked']
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
