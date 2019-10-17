<template>
  <v-app>
    <v-navigation-drawer
            v-model="drawerLeft"
            app
    >
      <v-toolbar
              color="black"
      >
        <v-list class="pa-0">
          <v-list-item avatar>
            <v-list-item-avatar>
              <img src="https://randomuser.me/api/portraits/men/34.jpg"  alt="Profile Pic"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle class="font-weight-light headline">KGarcia</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-toolbar>

      <v-list dense >
        <v-list-item to="/about" active-class="secondary--text">
          <v-list-item-action>
            <v-icon>mdi-gauge</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/dashboard" active-class="secondary--text">
          <v-list-item-action>
            <v-icon>mdi-gauge</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/sites" active-class="secondary--text">
          <v-list-item-action>
            <v-icon>mdi-map</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sites</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/devices" active-class="secondary--text">
          <v-list-item-action>
            <v-icon>mdi-chip</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Devices</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/cxdprofiles" active-class="secondary--text">
          <v-list-item-action>
            <v-icon>mdi-view-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>CXD Profiles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/globalprofiles"  active-class="secondary--text">
          <v-list-item-action>
            <v-icon >mdi-earth</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Global Profiles</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/cloudservices" active-class="secondary--text">
          <v-list-item-action>
            <v-icon>mdi-cloud</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Cloud Services</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="" disabled active-class="secondary--text">
          <v-list-item-action>
            <v-icon disabled>mdi-tune-vertical</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Alerts Configuration</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/users" active-class="secondary--text">
          <v-list-item-action>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>User Accounts</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/groups" active-class="secondary--text">
          <v-list-item-action>
            <v-icon>mdi-group</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Groups</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/security" active-class="secondary--text">
          <v-list-item-action>
            <v-icon>mdi-security</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Security</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
    <v-app-bar
            app
            color="black"
    >
      <v-app-bar-nav-icon @click.stop="drawerLeft = !drawerLeft" />
      <v-toolbar-title>
        <img src="./assets/netsurion-logo-branchsdo-wht.svg" alt="Netsurion" height="50">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn dark small @click="logout">
        <v-icon left small>mdi-logout-variant</v-icon>
        Logout
      </v-btn>
    </v-app-bar>
    <v-snackbar
            v-model="snackbar"
            top right :multi-line=true :auto-height=true>
      <div>
        <h4 :class=snackColor>{{snackTitle.charAt(0).toUpperCase() + snackTitle.slice(1)}}</h4>
        <div v-for="(txt, index) in this.snackMsg" :key=index>
          {{ txt }}
        </div>
      </div>
      <v-btn flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
    <v-content>
      <LoginDialog v-if="!isLoggedIn"></LoginDialog>
      <router-view v-if="isLoggedIn"/>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import {Vue, Component, Provide, PropSync, Inject} from 'vue-property-decorator';
  import LoginDialog from "@/components/LoginDialog.vue";

  @Component({
    components: {
      LoginDialog
    }
  })

  export default class App extends Vue {
    @Provide() componentToInject = '';
    @Provide() rightDrawer = false;
    @Provide() drawerLeft = true;
    @Provide() snackbar = false;
    @Provide() snackMsg = [];
    @Provide() snackType = 'success';
    @Provide() snackTitle = '';
    @Provide() logout = '';
    @Provide() item = {};

    get isLoggedIn() {
      return this.$store.getters['auth/isLoggedIn']
    }
    get snackColor(){
      return this.snackType + "--text"
    }
  }

</script>
