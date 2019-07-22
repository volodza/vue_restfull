import Vue from 'vue'
import Router from 'vue-router'


import Auth from '@/components/Auth'
import ModelsList from '@/components/ModelsList'
import CreateModel from '@/components/CreateModel'
import EditModel from '@/components/EditModel'




Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/auth',
        name: 'auth',
        component: Auth
      },
      {
        path: '/',
        name: 'modelsList',
        component: ModelsList
      },
      {
        path: '/editmodel/:id',
        props:true,
        name: 'editModel',
        component: EditModel
      },
      {
        path: '/createmodel',
        name: 'createModel',
        component: CreateModel
      }
    ],
    mode: 'history'
})