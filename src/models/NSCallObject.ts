export default class NSCallObject {
    successCallback: any[];
    errorCallback: any[];
    alwaysCallback: any[];
    data: any;

    constructor() {
        this.successCallback = [];
        this.errorCallback = [];
        this.alwaysCallback = [];
        this.data = undefined;
    }

    addCallback(callback: () => void, type = 'success') {
        switch(type) {
            case "success":
                this.successCallback.unshift(callback);
                break;
            case "error":
                this.errorCallback.unshift(callback);
                break;
            case "always":
                this.alwaysCallback.unshift(callback);
                break;
            default:
                break;
        }
    }

    success(response: object) {
        for (let i = 0; i < this.successCallback.length; i ++) {
            this.successCallback[i](response)
        }
    }

    always() {
        for (let i = 0; i < this.alwaysCallback.length; i ++) {
            this.alwaysCallback[i]()
        }
    }

    error(err:string) {
        let __DEBUG__;
        if (__DEBUG__ == 'development') {
            console.log('NSCallObject Error ', this.errorCallback, err)
        }
        for (let i = 0; i < this.errorCallback.length; i ++) {
            this.errorCallback[i](err)
        }
    }

    addCrudCallback(model: any) {
        this.addCallback((): void => {
            let msg = [`${model} Saved`];
            window.EventBus.$emit('g-message', {msg, snackType: 'success'});
        });
        this.addCallback((): void => {
            let msg = [`error saving ${model}`];
            window.EventBus.$emit('g-message', {msg, snackType: 'error'});
        },"error")
    }
}
