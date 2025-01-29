import { AuthModel, LoginInfo } from "@/models";
import { AUTH_TOKEN } from "@/constants";
import { formatErrorMessage, setUserInStorage } from "@/helpers";
import ApiService from "./api.service";
import Storage from "@/helpers/StorageUtil";

class AuthService {
    private endpoint: string;

    constructor(private readonly apiService: ApiService) {
        this.endpoint = '/auth';
    }

    async loginUser(authInfo: LoginInfo) {
        try {
            await this.apiService.get('/sanctum/csrf-cookie');
            const { data } = await this.apiService.post<AuthModel>(`${this.endpoint}/login`, authInfo);
            const { token, user } = data;

            await Promise.all([Storage.setItem(AUTH_TOKEN, token), setUserInStorage(user)]);
            return true;
        }
        catch (error: any) {
            throw new Error(formatErrorMessage(error));
        }
    }
}

const authService = new AuthService(ApiService);

export default authService;
