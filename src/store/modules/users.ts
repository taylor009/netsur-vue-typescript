import {VuexModule, Module, getModule, MutationAction, Mutation, Action} from 'vuex-module-decorators';
import store from '@/store';
// import {User, UserSubmit} from "@/store/model";
import {loginUser} from "@/store/api";
import config from '@/config/config.json'


export interface IUserState {
   roles: Array<any>;
   userList: Array<any>;
}
@Module({
    namespaced: true,
    name: 'user',
    store
})
class Users extends VuexModule implements IUserState {
    public roles: string[] = [];
    public userList: string[] = [];

    get getRoles(state:any){
        return state.roles
    }

    get getUserList(state:any){
        return state.userList
    }

    @Mutation
    setRoles(state:any, payload:any){
        state.roles = payload
    }

    @Mutation
    setUserList(state:any, payload:any){
        state.userList = payload;
    }

    @Action
    public async save(context: any, nsCallObject:any){
        let url = `${config.base_url}${config.user}`;

    }

}


