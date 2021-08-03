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
          />
      </div>
      <AddList @add-list="addList"/>
    </div>
    <div class="right-side">
      <div class="list-of-tasks">
        <Task @delete-task = "deleteTask" 
          @checkbox-clicked = "checkboxClicked" 
          v-for="task in currentList.tasks" 
          :key="task.id" 
          :task="task"/>
      </div>
      <AddTask @add-task="addTask"/>
    </div>
  </div>
</template>

<script>
  import List from './components/List'
  import Task from './components/Task'
  import AddList from './components/AddList'
  import AddTask from './components/AddTask';
  export default {
    name: 'App',
    components:{
      Task,
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
      async getLists(){
        const res = await fetch("http://localhost:5000/lists")
        const data = await res.json()
        return data
      },

      listClicked(list){
        this.currentList = list
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
        if(this.currentList.state === "without-tasks"){
          this.currentList.state = "not-all-are-done"
        }
        taskToAdd.id = this.currentList.tasks.length
        this.currentList.tasks.push(taskToAdd)
        fetch(`http://localhost:5000/lists/${this.currentList.id}`,{
          method:'PUT',
          headers:{
            'Content-type': 'application/json'
          },
          body:JSON.stringify(this.currentList)
        })
      },

      async deleteTask(taskToDelete){
        if(confirm(`Удалить дело "${taskToDelete.text}"?`))
        {
          this.currentList.tasks = this.currentList.tasks.filter(task => task.id !== taskToDelete.id)
          if(this.currentList.tasks.length === 0){
            this.currentList.state = "without-tasks"
          }
          fetch(`http://localhost:5000/lists/${this.currentList.id}`,{
            method:'PUT',
            headers:{
              'Content-type': 'application/json'
            },
            body:JSON.stringify(this.currentList)
          })
        }
      },

      async checkboxClicked(taskToChange){
        let flag = true
        this.currentList.tasks.forEach(task => {
          if(task.id === taskToChange.id) task.isDone = !taskToChange.isDone
          if(task.isDone === false) flag = false
        })
        console.log(flag)
        flag === true ? this.currentList.state = "all-done" : this.currentList.state = "not-all-are-done"
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
      this.lists = await this.getLists()
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
</style>
