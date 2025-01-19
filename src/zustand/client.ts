import { create } from 'zustand';
import { del, get, post, put } from '../utils/fetch';
import { IResponse } from '../interfaces/auth';
import { IClient } from '../interfaces/client';
import useAlertStore from './alert';
import { devtools } from 'zustand/middleware';

export interface IClientState {
    clients: IClient[];
    getAllClients: (name: string) => IClient[]
    addClient: (data: IClient) => IClient
    editClient: (data: IClient) => IClient
    getClient: (cliente: IClient) => IClient
    deleteClient: (cliente: IClient) => void
    registerEntryClient: (data: IClient) => void
    registerExitClient: (data: IClient) => void
    client: IClient
}

export const useClientStore = create<IClientState>()(devtools((set, _get) => ({
    client: null,
    clients: [],
    getAllClients: async (name: string) => {
        try {
            const resp: IResponse = await get(`clients?name=${name}`);
            console.log(resp);
            if (resp.code === 1) {
                set({
                    clients: resp.data
                }, false, "GET_CLIENTS");
            } else {
                set({
                    clients: []
                });
            }
        } catch (error) {
            // return useAlertStore.getState().alert("El usuario o contraseña son incorrectas", "error")
        }
    },
    addClient: async (data: IClient) => {
        try {
            const resp: IResponse = await post(`clients`, data);
            console.log(resp);

            if (resp.code === 1) {
                set((state) => ({
                    clients: [...state.clients, {
                        ...resp.data,
                        isActiveInClub: false
                    }], // Agrega el nuevo cliente a la lista
                }), false, "ADD_CLIENT");
                useAlertStore.getState().alert("Se agrego al cliente correctamente", "success");
            } else {
                throw new Error("Error al agregar cliente");
            }
        } catch (error) {
            // return useAlertStore.getState().alert("El usuario o contraseña son incorrectas", "error")
        }
    },
    getClient: async (data: IClient) => {
        try {
            const resp: IResponse = await get(`clients/${data.id}`);
            console.log(resp);
            if (resp.code === 1) {
                set(() => ({
                    client: resp.data // Agrega el nuevo cliente a la lista
                }), false, "GET_CLIENT");
            } else {
                throw new Error("Error al agregar cliente");
            }
        } catch (error) {
            // return useAlertStore.getState().alert("El usuario o contraseña son incorrectas", "error")
        }
    },
    editClient: async (data: IClient) => {
        try {
            const resp: IResponse = await put(`clients/${data.id}`, data);
            console.log(resp);
            if (resp.code === 1) {
                set((state) => ({
                    clients: state.clients.map((client) =>
                        client.id === data.id ? {
                            ...data,
                            isActiveInClub: client.isActiveInClub
                        } : client
                    ), // Actualiza solo el cliente modificado
                }), false, "EDIT_CLIENT");

                useAlertStore.getState().alert("Cliente actualizado correctamente", "success");
            } else {
                useAlertStore.getState().alert("Error al actualizar cliente", "error");
            }
        } catch (error) {
            // return useAlertStore.getState().alert("El usuario o contraseña son incorrectas", "error")
        }
    },
    deleteClient: async (data: IClient) => {
        try {
            const resp: IResponse = await del(`clients/${data.id}`);
            console.log(resp);
            if (resp.code === 1) {
                set((state) => ({
                    clients: state.clients.filter((client) =>
                        client.id !== data.id
                    ), // Actualiza solo el cliente modificado
                }), false, "EDIT_CLIENT");

                useAlertStore.getState().alert("Cliente eliminado correctamente", "success");
            } else {
                useAlertStore.getState().alert("Error al actualizar cliente", "error");
            }
        } catch (error) {
            // return useAlertStore.getState().alert("El usuario o contraseña son incorrectas", "error")
        }
    },
    registerEntryClient: async (data: IClient) => {
        try {
            const resp: IResponse = await post(`access/entry/${data.id}`, {
                clientId: data.id
            });
            console.log(resp);
            if (resp.code === 1) {
                set((state) => ({
                    clients: state.clients.map((client) =>
                        client.id === data.id
                            ? { ...client, isActiveInClub: true, visitsRemaining: client.visitsRemaining === 0 ? 0 : client.visitsRemaining - 1 } // Actualiza el estado del cliente
                            : client
                    ),
                }), false, "REGISTER_CLIENT");

                useAlertStore.getState().alert("El cliente ha sido activado correctamente", "success");
            } else {
                useAlertStore.getState().alert("Error al activar el cliente", "error");
            }
        } catch (error) {
            // return useAlertStore.getState().alert("El usuario o contraseña son incorrectas", "error")
        }
    },
    registerExitClient: async (data: IClient) => {
        try {
            const resp: IResponse = await post(`access/exit/${data.id}`, {
                clientId: data.id
            });
            console.log(resp);
            if (resp.code === 1) {
                set((state) => ({
                    clients: state.clients.map((client) =>
                        client.id === data.id
                            ? { ...client, isActiveInClub: false } // Actualiza el estado del cliente
                            : client
                    ),
                }), false, "EDIT_CLIENT");

                useAlertStore.getState().alert("Cliente desactivado correctamente", "success");
            } else {
                useAlertStore.getState().alert("Error al desactivar al cliente", "error");
            }
        } catch (error) {
            // return useAlertStore.getState().alert("El usuario o contraseña son incorrectas", "error")
        }
    }
})));


