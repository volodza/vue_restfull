<template>
  <v-app >
    <v-content>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">

              <v-toolbar dark color="primary">
                <v-toolbar-title>Форма авторизации</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form>
                  <v-text-field 
                    prepend-icon="person" 
                    name="Username" 
                    label="Username" 
                    type="text"
                    v-model="username"
                  ></v-text-field>

                  <v-text-field 
                    id="password" 
                    prepend-icon="lock" 
                    name="password" 
                    label="Password" 
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="onSubmit" color="primary">Войти</v-btn>
              </v-card-actions>

            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data (){
    return {
      username:"test",
      password:"notasecret"
    }
  },
  methods:{
    onSubmit (){
      this.$http.post('https://test.whteam.net/v2/my-session',{
        "username": this.username,
        "password": this.password
      })
      .then(res => {
        localStorage['X-Access-Expires'] = res.headers.get('X-Access-Expires');
        localStorage['X-Access-Token'] = res.headers.get('X-Access-Token');
        localStorage['secret'] = res.body.secret;
        localStorage['id'] = res.body.id;
        this.$router.push('/') ;
      }).catch(err=>{
        this.$store.commit("setError", err.headers.map['x-message'][0]);
      })
    }
  }
}
</script>
