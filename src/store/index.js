import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allLists:[],
    listsToShow:[],
    currentList: {},
    selected:'Неисполненные'
  },
  getters:{
    getLists(state){
      return state.allLists
    },
    getListsToShow(state){
      return state.listsToShow
    },
    getCurrentList(state){
      return state.currentList
    },
    getSelected(state){
      return state.selected
    }
  },
  mutations: {
    SET_LISTS(state, payload){
        state.allLists = payload
    },
    ADD_LIST(state, newList){
      state.allLists.push(newList)
    },
    DELETE_LIST(state, listToDelete){
      state.allLists = state.allLists.filter(list => list.id !== listToDelete.id)
    },
    CHANGE_CURRENT_LIST(state, list){
      state.currentList = list
    },
    CHANGE_LISTS_TO_SHOW(state, lists){
      state.listsToShow = lists
    },
    CHANGE_SELECTED(state, payload){
      state.selected = payload
    }
  },
  actions:{
    async loadLists({commit,dispatch}){
        const res = await fetch("http://localhost:5000/lists")
        if(res.ok === true){
          const data = await res.json()
          commit('SET_LISTS', data)
          dispatch('filterByState')
        }
        else{
          alert('Ошибка удаления списка')
        }
        
    },
    async addList({commit,dispatch},newList){
      const res = await fetch("http://localhost:5000/lists",{
        method: 'POST',
        headers:{
          'Content-type': 'application/json'
        },
        body:JSON.stringify(newList)
      })
      if(res.ok === true){
        const data = await res.json()
        commit('ADD_LIST', data)
        dispatch('filterByState')
      }
      else{
        alert('Ошибка добавления списка')
      }
      
    },
    async deleteList({commit,dispatch}, listToDelete){
        const res = await fetch(`http://localhost:5000/lists/${listToDelete.id}`, {
          method: 'DELETE'
        })
        if(res.ok === true)
        {
          commit('DELETE_LIST', listToDelete)
          dispatch('filterByState')
        }
        else{
          alert('Ошибка удаления списка')
        } 
    },
    changeCurrentList({commit},list){
      commit('CHANGE_CURRENT_LIST', list)
    },
    async addTask({commit, getters, dispatch}, taskToAdd){
      const listToChange = getters.getCurrentList
      listToChange.tasks.length !== 0 ? taskToAdd.id = listToChange.tasks[listToChange.tasks.length - 1].id + 1: taskToAdd.id = 0
      listToChange.tasks.push(taskToAdd)
      if(listToChange.state === 'without-tasks') listToChange.state = 'not-all-are-done'
      const res = await fetch(`http://localhost:5000/lists/${listToChange.id}`,{
        method:'PUT',
        headers:{
          'Content-type': 'application/json'
        },
        body:JSON.stringify(listToChange)
      })
      if(res.ok === true){
        commit('CHANGE_CURRENT_LIST', listToChange)
        dispatch('changeState')
      }
      else{
        alert('Ошибка добавления дела')
      }
      
    },
    async deleteTask({commit, getters, dispatch},taskToDelete){
      const listToChange = getters.getCurrentList
      listToChange.tasks = listToChange.tasks.filter(task => task.id !== taskToDelete.id)
      dispatch('changeState')
      const res = await fetch(`http://localhost:5000/lists/${listToChange.id}`,{
          method:'PUT',
          headers:{
          'Content-type': 'application/json'
          },
          body:JSON.stringify(listToChange)
      })
      res.ok === true ? commit('CHANGE_CURRENT_LIST', listToChange) : alert('Ошибка удаления дела')
    },
    async checkboxClicked({commit,getters, dispatch},taskToChange){
      const listToChange = getters.getCurrentList
      listToChange.tasks.forEach(task => {
        if(task.id === taskToChange.id) task.isDone = !taskToChange.isDone
      })
      commit('CHANGE_CURRENT_LIST', listToChange)
      dispatch('changeState')
      const res = await fetch(`http://localhost:5000/lists/${listToChange.id}`,{
      method:'PUT',
      headers:{
          'Content-type': 'application/json'
      },
      body:JSON.stringify(listToChange)
      })
      if(res.ok === false) alert('Ошибка')
      
  },
    changeState({commit, getters, dispatch}){
      const currentList =  getters.getCurrentList
      const count = currentList.tasks.filter(task => task.isDone === true).length
      if(currentList.tasks.length === 0){
      currentList.state = "without-tasks"
      }
      else if(count < currentList.tasks.length){
        currentList.state = "not-all-are-done"
      }
      else if(count === currentList.tasks.length)
      {
        currentList.state = "all-done"
      }
      commit('CHANGE_CURRENT_LIST',currentList)
      dispatch('filterByState')
    },
    sortLists({commit,getters}){
          let lists = getters.getListsToShow
          lists.sort((a, b) => {
          const textA=a.text.toLowerCase(), textB=b.text.toLowerCase()
          if (textA < textB)
            return -1
          if (textA > textB)
            return 1
          return 0
        })
        commit('CHANGE_LISTS_TO_SHOW', lists)
      },
    filterByState({commit, getters, dispatch}){
      let listsToShow = getters.getLists
      
      switch (getters.getSelected){
        case 'Неисполненные':
          listsToShow = listsToShow.filter(element => element.state === 'without-tasks' || element.state === 'not-all-are-done')
          break
        case 'Исполненные':
          listsToShow = listsToShow.filter(element => element.state === 'all-done')
          break
      }
      commit('CHANGE_LISTS_TO_SHOW', listsToShow)
      dispatch('sortLists')
    },
  }
})
