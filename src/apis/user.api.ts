import axios from 'axios';
import { UserModel } from '~/models/user.model';

const baseUrl = 'http://localhost:3000/user';

export const userApi = {
    fetchAllUsers: async (): Promise<UserModel[]> => {
        const response = await axios.get<UserModel[]>(`${baseUrl}`);
        return response.data;
    },
    fetchUserById: async (id: string): Promise<UserModel> => {
        const response = await axios.get<UserModel>(`${baseUrl}/getUserById/${id}`);
        return response.data;
    },
    fetchUserByEmail: async (email: string): Promise<UserModel> => {
        const response = await axios.get<UserModel>(`${baseUrl}/getUserByEmail/${email}`);
        return response.data;
    }
}