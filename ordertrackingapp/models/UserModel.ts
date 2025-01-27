export interface UserModel {
    name: string;
    email: string;
    id: number;
    dateAdded: string;
}

export interface LoginInfo {
    email: string;
    password: string;
}

export interface SignUpInfo extends LoginInfo {
    repeatedPassword: string;
    name: string;
}

export interface RememberLoginInfo {
    loginInfo: LoginInfo,
    rememberMe: boolean;
}

export interface AuthModel {
    token: string;
    user: UserModel
}