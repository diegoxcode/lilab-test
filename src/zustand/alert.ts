import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface AlertState {
    loading?: boolean
    message?: string | string[]
    errors?: string | string[]
    type: string
    alert: (message: string, type: string) => void;
    resetAlert: () => void;
    load: (loading: boolean) => void
}


// Crea el store con Zustand
const useAlertStore = create<AlertState>()(
    devtools(
        (set) => ({
            loading: false,
            message: "",
            type: "",
            alert: (message: string, type: string) => {
                set({ message: message, type: type });
            },
            load: (loading: boolean) => {
                set({ loading: loading });
            },
            resetAlert: () => {
                set({loading: false, message: ''});
            }
        })));


export default useAlertStore;