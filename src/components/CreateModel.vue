<template>
  <v-container grid-list-xl fluid>
    
    <v-layout flex-child wrap>
      <v-card
          class="mx-auto"
          color="#26c6da"
          dark
          width="400"
        >
          <v-card-title>
            <span class="title font-weight-light">Новая модель</span>
          </v-card-title>

          <v-card-text class="headline font-weight-bold">
            <v-text-field 
              solo 
              label="Имя модели" 
              hide-details
              v-model="model_name"
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
              @click="createModel"
            >
              Добавить
            </v-btn>
          </v-card-actions>

        </v-card>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data (){
    return {
      model_name:'',
      lexicon:false
    }
  },
  methods:{
    createModel (){
      const webT = localStorage['X-Access-Token'],
            headers = {
              'Authorization': `Bearer ${webT}`,
              'Accept-Language': localStorage['lang']
            };

      this.$http.post('https://test.whteam.net/v2/translation',{
          "name": this.model_name,
          "lexicon": +this.lexicon
      },{headers})
      .then(res => {
        this.$router.push('/')
      }).catch(err=>{
        this.$store.commit("setError", err.headers.map['x-message'][0]);
      })
    }
  }
}
</script>


<style scoped>
</style>