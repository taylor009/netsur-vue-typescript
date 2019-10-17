import axios from 'axios';
import {UserResponse, UserSubmit} from "@/store/model";


export const connectApi = axios.create({
    baseURL: '//localhost:9090/v1.0.0'
});

export const setJWT = (jwt: string) => {
    connectApi.defaults.headers.common['Authorization'] = `Token ${jwt}`
};

export const clearJWT = () => {
    delete connectApi.defaults.headers.common['Authorization']
};

export const loginUser = async (userSubmission: UserSubmit): Promise<UserResponse | undefined> => {
    let user;
    try {
        const response = await axios.post('/login', {
            user,
        });
        return (response.data as UserResponse);
    }
    catch(error){
        console.log(error)
    }
};
