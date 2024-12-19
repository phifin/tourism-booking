import http from '~/utils/http'
import { UserModel } from '~/models/user.model';

const dataPath = 'user';

export const userApi = {
    fetchAllUsers: async (): Promise<UserModel[]> => {
        const response = await http.get<UserModel[]>(`${dataPath}`);
        return response.data;
    },
    fetchUserById: async (id: string): Promise<UserModel> => {
        const response = await http.get<UserModel>(`${dataPath}/${id}`);
        return response.data;
    },
    fetchUserByEmail: async (email: string): Promise<UserModel> => {
        const response = await http.get<UserModel>(`${dataPath}/getUserByEmail/${encodeURIComponent(email)}`);
        return response.data;
    },
    editUserById: async (id: string, body: Partial<UserModel>): Promise<any> => {
        const response = await http.put<UserModel>(`${dataPath}/${id}`, body);
        return response.data;
    },
}