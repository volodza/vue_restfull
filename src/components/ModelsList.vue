<template>
  <v-container row wrap style="max-width:800px">

    <h1>Список моделей</h1>

    <v-flex>
      <v-btn @click="$router.push('createModel')">Добавить</v-btn>
    </v-flex>

    <v-layout row wrap>
      <v-flex    
        v-for="(model,index) in models"
        :item="model"
        :index="index"
        :key="model.id"
        xs12 sm6 
      >
        <v-card class="ma-1">

          <v-card-title primary-title>
            <div>

              <span class="grey--text">
                Добавлена: {{formatDate(model.created)}}
              </span>
              
              <h1 class="headline">{{model.name}}</h1>
              
              <div>
                <v-flex v-if="model.id == model_id">
                  <input 
                    type="text" 
                    style="border:1px solid grey"
                    v-model='new_native' 
                  >
                
                  <v-btn 
                    @click="updateNative(model.id)" 
                    left 
                    flat 
                    icon 
                    color='success' 
                  >
                    <v-icon>done</v-icon>
                  </v-btn>

                  <v-btn 
                    @click="model_id = null" 
                    flat 
                    icon 
                    color='error' 
                  >
                    <v-icon>clear</v-icon>
                  </v-btn>
                </v-flex>

                <v-flex v-else>
                  <span v-if="model.native" class="black--text"> 
                    {{model.native}}
                  </span>

                  <span v-else class="grey--text"> 
                    Перевод отсутствует
                  </span>

                  <v-btn 
                    @click="showTextField(model)" 
                    flat 
                    icon 
                    color='primary' 
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-flex>
              </div>

              <v-switch
                v-model="model.lexicon"
                label="Принадлежность к лексикону"
                disabled
              ></v-switch>

            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat :to="`/editModel/${model.id}`"
              >Редактировать
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      models:null,
      new_native:'',
      model_id:null
    }
  },
  methods:{
    formatDate(created){
      return  new Date(created*1000).getDate() + '.' +
              new Date(created*1000).getMonth() + '.' +
              new Date(created*1000).getFullYear()
    },
    getModels () {
      const webToken = localStorage['X-Access-Token'],
            expires = (((Date.now()/1000)^0) > (+localStorage['X-Access-Expires'])),
            headers = {
              'Authorization': `Bearer ${webToken}`,
              'Accept-Language': localStorage['lang']
            },
            params = {
              start:'',
              order:'',
              page:'',
              limit:''
            };

      if (webToken && !expires) {
        this.$http.get('https://test.whteam.net/v2/translations',{
          headers,
          params
        }).then(res => {
          this.models = res.body;
        }).catch(err => {
          this.$store.commit("setError", err.headers.map['x-message'][0]);
        })
      } else {
        this.$router.push('/auth');
      }
    },
    showTextField (model){
      this.model_id = null;
      this.model_id = model.id;
      this.new_native = model.native;
    },
    updateNative (id){
      const webT = localStorage['X-Access-Token'],
            headers = {
              'Authorization': `Bearer ${webT}`,
              'Content-Language': localStorage['lang']
            }

      this.$http.put(`https://test.whteam.net/v2/translation/${id}/native`,{
          "native": this.new_native
      },{headers})
      .then(res => {
        this.getModels();
        this.model_id = null;
      }).catch(err => {
        this.$store.commit("setError", err.headers.map['x-message'][0]);
      })   
    }
  },
  mounted(){
    this.getModels();
    this.interval = setInterval(() => this.getModels(), 60000);
  }
}
</script>


<style scoped>
</style>