export interface Auth {
    token: string
    fecha_expiracion: string
    fecha_creacion: string
    user: IUser
}

export interface IUser {
    id: number
    name: string
    email: string
    role: string
    password?: string
}

export interface IResponse {
    code: number;
    data: any;
    status: number
}

export interface IEmail {
    correo: string
}