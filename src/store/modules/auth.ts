import {VuexModule, Module, Action, Mutation, getModule} from 'vuex-module-decorators';
import store from '@/store';
import {post} from "@/services/helpers";
import config from '@/config/config.json';
import NSCallObject from "@/models/NSCallObject";


export interface IUserAuth {
    user?: object,
    roles: Array<string>
}


@Module({
    namespaced: true,
    store
})
class Auth extends VuexModule implements IUserAuth {
    public user: object = {};
    public roles: Array<string> = [];

    get isLoggedIn(state: any) {
        return (state.user != null);
    }

    get getAuthHeader(state: any) {
        return (state.user == null ? '' : state.user.username)
    }

    @Mutation
    login(state: any, payload: any) {
        state.user = {
            username: payload.email,
            token: payload.data["access_token"]
        }
    }

    @Mutation
    logout(state: any) {
        state.user = null
    }

    @Action
    public loginFun(context: any, {nsCallObject, router}: any) {
        nsCallObject.addCallback((response: { data: { jwt: any; }; }) => {
            context.commit('login', {
                email: nsCallObject.data.email,
                data: {"access_token": response.data.jwt}
            });
            context.dispatch('customers/reset', null, {root: true});
            let obj = new NSCallObject();
            context.dispatch('ui/load_bootstrap', obj, {root: true});
            router.push({name: 'Dashboard'})
        });
        let url: string = config.base_url + config.login_url;
        post({
            url,
            nsCallObject
        });
    }

    @Action
    public logoutFun(context: any){
        context.commit('logout')
    }
}
