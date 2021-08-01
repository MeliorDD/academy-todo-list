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
        <Tasks v-for="list in lists" 
          :key="list.id" 
          :list = "list" 
          />
      </div>
      <div class="add-list">
        <input type="text"/>
        <button>Добавить список</button>
      </div>
    </div>
    <div class="right-side">
      <div class="list-of-tasks">
        <Task :task="task" />
      </div>
      <div class="add-task">
        <input type="text" placeholder="Введите дело">
        <input type="checkbox" id="important">
        <label for="important"> Срочное </label>
        <button>Добавить дело</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Tasks from './components/Tasks'
  import Task from './components/Task'

  export default {
    name: 'App',
    components:{
      Task,
      Tasks,
    },

    data()
    {
      return{
        lists:[],
        currentList: "1",
        task: {
          text: 'Hello world',
          date: '3 march',
          isImportant: true
        }
        
      }
    },
    methods:{
      async getLists(){
        const res = await fetch("http://localhost:5000/lists")
        const data = await res.json()
        return data
      },
      // async getTasks(){
      //   const res = await fetch("http://localhost:5000/tasks")
      //   const data = await res.json()
      //   return data
      // },
      changeList(){
        alert('hi')
      }
    },
    async created(){
      this.lists = await this.getLists()
    }
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
