import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueResource from 'vue-resource'



Vue.use(VueResource)

Vue.use(Vuetify, {
    theme: {
      primary: '#1976D2',
      secondary: '#424242',
      accent: '#82B1FF'
    },
    iconfont: 'mdi'
})

Vue.config.productionTip = false

new Vue({
        router,
        store,
        render: h => h(App)
    })
    .$mount('#app')