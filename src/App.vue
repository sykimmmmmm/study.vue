<template>
  <v-app>
    <v-main>
      <v-app-bar :elevation="1" >
          <v-toolbar-title></v-toolbar-title>
          <v-btn>
              <router-link to="/">home</router-link>
          </v-btn>
          <v-btn>
              <router-link to="/about">about</router-link>
          </v-btn>
          <v-btn>
              <router-link to="/userList">userList</router-link>
          </v-btn>
      </v-app-bar>
      <v-container class="mt-10">
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
