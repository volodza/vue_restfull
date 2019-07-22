<template>
  <v-app>
    <v-toolbar app>

      <v-toolbar-title class="headline text-uppercase">
        <span >Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn :to="'/'" flat>
        Список моделей
      </v-btn>

      <v-menu offset-y >

        <template v-slot:activator="{ on }">
          <v-btn
            left
            outline 
            v-on="on"
            round 
            color="primary"
            style="height:35px;width:150px;"
          >
            {{selected_lang.native || 'English'}}
          </v-btn>
        </template>

        <v-list>
          <v-list-tile
            v-for="(language, index) in languages"
            :key="index"
            @click="selectLanguage(language)"
          >
            <v-list-tile-title>{{ language.native }}</v-list-tile-title>
            <!-- <img :src="'https://test.whteam.net' + item.image" > -->
          </v-list-tile>
        </v-list>

      </v-menu>

    </v-toolbar>

    <v-content>
     <router-view />
    </v-content>

    <template v-if="error">
      <v-snackbar
        @input="closeError"
        :multi-line="false"
        :timeout="5000"
        color="error"
        :value="true"
      >
        {{error}}
        <v-btn dark flat @click="closeError">Закрыть</v-btn>
      </v-snackbar>
    </template>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      languages: [],
      selected: localStorage['lang'] 
    }
  },
  computed:{
    error() {
      return this.$store.getters.error;
    },
    selected_lang (){
      let lang = this.selected
      return this.languages.find(x => x.code == lang) || 'English';
    }
  },
  methods:{
    closeError() {
      this.$store.dispatch("clearError");
    },
    getLanguages (){
      this.$http.get('https://test.whteam.net/v2/languages')
        .then(res => {
          this.languages = res.body;
          if(!localStorage['lang']) {
            localStorage['lang'] = this.languages[0].code;
          }
        }).catch(err => {
          this.$store.commit("setError", err.headers.map['x-message'][0]);
        })
    },
    selectLanguage (language){
      localStorage['lang'] = language.code;
      location.reload();
    },
    refreshSession(){
      const webToken = localStorage['X-Access-Token'];
      const expires = (((Date.now()/1000)^0) > (+localStorage['X-Access-Expires']));
      const secret = localStorage['secret'];
      const id = localStorage['id'];

      if (webToken && !expires && secret && id) {
        this.$http.put(`https://test.whteam.net/v2/my-session/${id}/refresh`,{
            "secret": secret
        })
        .then(res => {
          localStorage['X-Access-Expires'] = res.headers.get('X-Access-Expires');
          localStorage['X-Access-Token'] = res.headers.get('X-Access-Token');
          localStorage['secret'] = res.body.secret;
        }).catch(err => {
          this.$store.commit("setError", err.headers.map['x-message'][0]);
        })
      } else {
        this.$router.push('/auth');
      }
    }
  },
  created () {
    this.getLanguages()
  },
  watch: {
    '$route' () {
      this.refreshSession();
    }
  }
}
</script>
