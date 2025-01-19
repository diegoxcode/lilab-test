import { create } from 'zustand';
import {  get } from '../utils/fetch';
import { IResponse } from '../interfaces/auth';
import { devtools } from 'zustand/middleware';

export interface IAccessState {
    getAccessClient: (name: string) => any[]
    accessClients: []
}

export const useAccessStore = create<IAccessState>()(devtools((set, _get) => ({
    accessClients: [],
    getAccessClient: async (name: string) => {
        try {
            const resp: IResponse = await get(`access/active-today?name=${name}`);
            console.log(resp);
            if (resp.code === 1) {
                set(() => ({
                    accessClients: resp.data
                }), false, "ACCESS_CLIENTS");
            } else {
                set(() => ({
                    accessClients: []
                }), false, "ACCESS_CLIENTS_ERROR");
            }
        } catch (error) {
            // return useAlertStore.getState().alert("El usuario o contraseña son incorrectas", "error")
        }
    },
})));


