export interface IClient {
    id: number;
    name: string;
    email: string;
    phoneNumber: string;
    clientType: string;
    visitsRemaining: number;
    monthlyFee: number;
    isActiveInClub: boolean;
    entryTime?: any;
    exitTime?: any;
}

export type CreateClient = Omit<IClient, 'id'>; 