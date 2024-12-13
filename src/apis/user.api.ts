
import http from '~/utils/http'
import { UserModel } from '~/models/user.model';

// const baseUrl = 'http://localhost:3000/user';
const dataPath = 'user';

export const userApi = {
    fetchAllUsers: async (): Promise<UserModel[]> => {
        const response = await http.get<UserModel[]>(`${dataPath}`);
        return response.data;
    },
    fetchUserById: async (id: string): Promise<UserModel> => {
        const response = await http.get<UserModel>(`${dataPath}/getUserById/${id}`);
        return response.data;
    },
    fetchUserByEmail: async (email: string): Promise<UserModel> => {
        const response = await http.get<UserModel>(`${dataPath}/getUserByEmail/${email}`);
        return response.data;
    }
}