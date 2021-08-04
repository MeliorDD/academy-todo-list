import VueRouter from 'vue-router'

import Tasks from '../views/Tasks'

export default new VueRouter({
    mode:'history',
    routes:[
        {
            name:'tasks',
            path:'/:id',
            component: Tasks
        }
    ]
  })