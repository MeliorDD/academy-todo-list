import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists:[]
  },
  getters:{
    getLists(state){
        return state.lists
    }
  },
  mutations: {
    SET_LISTS(state, payload){
        state.lists = payload
    }
  },
  actions:{
    async loadLists({commit}){
        const res = await fetch("http://localhost:5000/lists")
        const data = await res.json()
        commit('SET_LISTS', data)
        return data
    }
  }
})
