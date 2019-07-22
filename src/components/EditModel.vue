<template>
  <v-container grid-list-xl fluid>
    
    <v-layout flex-child wrap>
      <v-card
          class="mx-auto"
          width="400"
        >
          <v-card-title>
            <span class="title font-weight-light">Редактировать модель</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            <v-text-field 
              solo 
              label="Имя модели" 
              hide-details
              v-model="name"
            ></v-text-field>

            <v-switch
              v-model="lexicon"
              :label="`Принадлежность к лексикону`"
            ></v-switch>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              flat
              @click="updateModel"
            >
              Сохранить изменения
            </v-btn>
          </v-card-actions>
        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props:['id'],
  data(){
    return {
     name:'',
     lexicon:false
    }
  },
  methods:{
    updateModel (){
      const webT = localStorage['X-Access-Token'],
            headers = {
              'Authorization': `Bearer ${webT}`,
              'Content-Language': localStorage['lang']
            };
    
      this.$http.put(`https://test.whteam.net/v2/translation/${this.id}`,{
        "name": this.name,
        "lexicon": +this.lexicon
      },{headers})
      .then(res => {
        this.$router.push('/')
      })
      .catch(err => {
        this.$store.commit("setError", err.headers.map['x-message'][0]);
      })
    },
    getModel (id) {
      const webToken = localStorage['X-Access-Token'],
            expires = (((Date.now()/1000)^0) > (+localStorage['X-Access-Expires'])),
            lang = localStorage['lang'];
          
      if (webToken && !expires && lang) {
        this.$http.get(`https://test.whteam.net/v2/translation/${id}`,{
          headers: {
            'Authorization': `Bearer ${webToken}`,
            'Content-Language': localStorage['lang']
          },
          params:{}
        }).then(res => {
          this.name = res.body.name;
          this.lexicon = res.body.lexicon;
        }).catch(err => {
          this.$store.commit("setError", err.headers.map['x-message'][0]);
        })
      } else {
        this.$router.push('/auth');
      }
    }  
  },
  mounted(){
    this.getModel(this.id)
  }
}
</script>


<style scoped>
</style>