import { USER_PROFILE } from "@/constants"
import Storage from "./StorageUtil";
import { UserModel } from "@/models"

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