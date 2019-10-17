import axios from 'axios';
import store from '@/store';


export const parseJwt = (token: string) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

let __DEBUG__: string;

export const post = function ({url, nsCallObject}: any) {
    if (__DEBUG__ === 'development') {
        console.log('posting',{url, nsCallObject});
        console.log('post data', JSON.stringify(nsCallObject.data))
    }
    axios.patch(url, nsCallObject.data, {headers: store.getters['auth/getAuthHeader']})
        .then(function (response) {
            if (__DEBUG__ == 'development') {
                console.log('patch response',response)
            }
            nsCallObject.success(response)
        })
        .catch(function (error) {
            if (__DEBUG__ == 'development') {
                console.log('patch error',error)
            }
            nsCallObject.error(error)
        }).then(() => {
        nsCallObject.always()
    });
};

export const get = function({url, nsCallObject, cancelSource}: any){
    let newUrl = url;
    if (__DEBUG__ == 'development') {
        console.log('get',{url, nsCallObject})
    }
    if (nsCallObject.data != undefined) {
        let params: string = '?';
        Object.keys(nsCallObject.data).forEach(element => {
            params = params + element + '=' + nsCallObject.data[element] + '&'
        });
        newUrl = url + params
    }
    if (cancelSource != null) {
        cancelSource.cancel(`A new request has come ${newUrl}`).then();
    }
    const source = axios.CancelToken.source();
    axios.get(newUrl, {headers: store.getters['auth/getAuthHeader'], cancelToken: source.token})
        .then(response => {
            if (__DEBUG__ == 'development') {
                console.log('get response',response)
            }
            nsCallObject.success(response)
        })
        .catch(error => {
            if (__DEBUG__ == 'development') {
                console.log('get error',error)
            }
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                nsCallObject.error(error)
            }

        }).then(() => {
        nsCallObject.always()
    });
    return source
};

