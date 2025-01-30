import { SignUpInfo, UserModel } from "@/models";
import ApiService from "./api.service";
import { formatErrorMessage, setUserInStorage } from "@/helpers";

class UserService {
    private endpoint: string;

    constructor(private readonly apiService: ApiService) {
        this.endpoint = '/users';
    }

    async signupUser(signupInfo: SignUpInfo) {
        try {
            await this.apiService.post(`${this.endpoint}/signup`, { ...signupInfo, password_confirmation: signupInfo.repeated_password });
            return true;
        }
        catch (error: any) {
            throw new Error(formatErrorMessage(error));
        }
    }

    async getProfile(): Promise<UserModel> {
        try {
            const { data } = await this.apiService.get<UserModel>(`${this.endpoint}/profile`);

            await setUserInStorage(data);
            return data;
        }
        catch (error: any) {
            throw new Error(formatErrorMessage(error));
        }
    }
}

const userService = new UserService(ApiService);

export default userService;
