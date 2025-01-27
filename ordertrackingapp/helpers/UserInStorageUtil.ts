import { USER_CREDENTIALS, USER_PROFILE } from "@/constants"
import Storage from "./StorageUtil";
import { RememberLoginInfo, UserModel } from "@/models"

// Note that this is not Web Safe
export const rememberUserCredentials = async (credentials: RememberLoginInfo) => {
    try {
        await Storage.setItem(USER_CREDENTIALS, JSON.stringify(credentials));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getRememberedUserCredentials = async (): Promise<RememberLoginInfo> => {
    try {
        const credentials = await Storage.getItem(USER_CREDENTIALS);
        if (credentials) {
            return JSON.parse(credentials);
        }
        return {
            loginInfo: { email: '', password: '' },
            rememberMe: false
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const forgetUserCredentials = async () => {
    try {
        await Storage.removeItem(USER_CREDENTIALS);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const setUserInStorage = async (user: UserModel) => {
    try {
        await Storage.setItem(USER_PROFILE, JSON.stringify(user));
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const getUserInStorage = async (): Promise<UserModel | null> => {
    try {
        const user = await Storage.getItem(USER_PROFILE);
        if (user) {
            return JSON.parse(user);
        }
        return null;
    } catch (error: any) {
        throw new Error(error.message);
    }
}