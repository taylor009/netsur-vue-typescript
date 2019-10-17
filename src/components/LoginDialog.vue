<template>
    <v-dialog v-model="dialog" width="500" :persistent=true @keydown.enter="login">
        <v-card>
            <v-card-title class="headline" primary-title>
                Netsurion
                <v-spacer></v-spacer>
                <img src="@/assets/netsurion_icon_color.svg" alt="Netsurion" height="30">
            </v-card-title>
            <v-card-text class="mb-5">
                <v-flex xs12>
                    <v-text-field
                            label="Email*"
                            required
                            append-icon="mdi-account"
                            v-model="email"
                    />
                </v-flex>
                <v-flex xs12>
                    <v-text-field
                            label="Password*"
                            type="password"
                            required
                            append-icon="mdi-lock"
                            v-model="password"
                    />
                </v-flex>
            </v-card-text>

            <v-divider></v-divider>
            <v-card-actions>
                <v-layout justify-space-between>
                    <a href="https://netsurion.onelogin.com/password/forgot_password" class="caption mt-2" target="_blank">Forgot Password</a>
                    <v-btn @click.stop="login" :loading="loading" :disabled="loading">Login</v-btn>
                </v-layout>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
    import {Vue, Component, Provide, Emit} from 'vue-property-decorator';
    import users from "@/store/modules/users";


    @Component
    export default class extends Vue{
         dialog = true;
         email = '';
         password = '';
         loading = false;

        @Emit()
        login(){
            users.login({
                email: this.email,
                password: this.password
            })
        }
    }

</script>

<style scoped>

</style>
