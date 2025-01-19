import { create } from 'zustand';
import { del, get, post, put } from '../utils/fetch';
import { IResponse } from '../interfaces/auth';
import { IUser } from '../interfaces/auth';
import useAlertStore from './alert';
import { devtools } from 'zustand/middleware';

export interface IAuthState {
    auth: IUser | null;
    me: () => void;
    login: (data: any) => void;
    success: boolean
    users: IUser[]
    getAllUsers: () => IUser[]
    getUsersById: (data: IUser) => IUser
    editUser: (data: IUser) => void
    addUser: (data: IUser) => void
    deleteUser: (data: IUser) => void
    user: IUser | null
}

export const useAuthStore = create<IAuthState>()(devtools((set, _get) => ({
    
    success: false,
    auth: null,
    login:  async (data: any) => {
        try {
            const resp: IResponse = await post(`user/signin`, data);
            console.log(resp);
            if (resp.code === 2) {
                return useAlertStore.getState().alert("La contraseña o el usuario son incorrectos, intentelo de nuevo porfavor", "error");
            }
            if (resp.code === 1) {
                localStorage.setItem("token", resp.data.token);
                localStorage.setItem("refreshToken", resp.data.refreshToken);
                set({ 
                    auth: resp.data, success: true }, false, "LOGIN");
            } else {
                set({ auth: null });
            }
        } catch (error) {
            return useAlertStore.getState().alert("El usuario o contraseña son incorrectas", "error");
        }
    },
    getAllUsers: async () => {
        try {
            const resp: IResponse = await get(`user/all`);
            if (resp.code === 1) {
                console.log(resp);
                set({ users: resp.data });
            } else {
                set({ users: [] });
            }
        } catch (error) {
            // console.error('Error during login:', error);
        }
    },
    getUsersById:  async (data: IUser) => {
        try {
            const resp: IResponse = await get(`user/${data.id}`);
            if (resp.code === 1) {
                console.log(resp);
                set({ user: resp.data });
            } else {
                set({ user: null });
            }
        } catch (error) {
            // console.error('Error during login:', error);
        }
    },
    editUser:  async (data: IUser) => {
        console.log(data);
        try {
            const resp: IResponse = await put(`user/update/${data.id}`, data);
            if (resp.code === 1) {
                useAlertStore.getState().alert("El usuario se editó correctamente", "success");
                set((state) => ({
                    users: state.users.map((user) =>
                        user.id === data.id ? {
                            id: data.id,
                            name: data.name,
                            email: data.email,
                            role: data.role,
                        } : user
                    )
                }), false, "EDIT_USER");
            } else {
                set({ user: null });
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    },
    addUser:  async (data: IUser) => {
        console.log(data);
        try {
            const resp: IResponse = await post(`user/register`, data);
            if (resp.code === 1) {
                useAlertStore.getState().alert("El usuario se agrego correctamente", "success");
                set((state) => ({
                    users: [...state.users, resp.data]
                }), false, "ADD_USER");
            } else {
                set({ user: null });
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    },
    deleteUser:  async (data: IUser) => {
        console.log(data);
        try {
            const resp: IResponse = await del(`user/${data.id}`);
            console.log(resp);
            if (resp.code === 1) {
                set((state) => ({
                    users: state.users.filter((user) =>
                        user.id !== data.id
                    ), // Actualiza solo el cliente modificado
                }), false, "DELETE_USER");

                useAlertStore.getState().alert("Usuario eliminado correctamente", "success");
            } else {
                useAlertStore.getState().alert("Error al actualizar usuario", "error");
            }
        } catch (error) {
            // return useAlertStore.getState().alert("El usuario o contraseña son incorrectas", "error")
        }
    },
    me: async () => {
        try {
            const resp: IResponse = await get(`user/@me`);
            if (resp.code === 1) {
                console.log(resp);
                set({ auth: resp.data });
            } else {
                set({ auth: null });
            }
        } catch (error) {
            // console.error('Error during login:', error);
        }
    },
})));


