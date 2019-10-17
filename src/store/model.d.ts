export interface UserSubmit {
    email: string;
    password: string;
}

export interface CallObject {
    success: Array<any>
    error: Array<any>
    always: Array<any>
}
