
export interface Usuario {
    id: number
    password?: string
    username?: string
    nombres?: string
    apellidos?: string
    email?: string
    idRol?: number
    nomRol?:string
    fechaCreacion?: Date
    fecha_bloqueo?: Date
    razon_bloqueo?: string
    conteo?: number
    estado?:string
    
}

export const people: Usuario[] = [];

export type  usuarioLogin =Pick<Usuario,'id'>

export interface ApiResponse<T> {
    message: string;
    data?: T[];
    error?: boolean;
    status:number
}
