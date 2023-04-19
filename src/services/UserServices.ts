
import * as crypto from 'crypto-js';
import { Database } from "../config/databases";
import { usuarioLogin, ApiResponse, Usuario } from "../tsResponces"
import { Connection } from 'mysql';
export class UserServices {
    private conexion: Connection;
    private pass: string | any;

    constructor() {
        this.conexion = new Database().getConnection();
    }

    public Login(usuario: string, pass: string) {
        let response;
        this.pass = pass
        const consulta = `SELECT * FROM v_usuario WHERE username = '${usuario}'`;
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err: any, resultados: any[]) => {
                this.conexion.end();
                if (err) {
                    reject(err);
                } else {
                    response = this.verificarUsuario(resultados)
                    resolve(response)
                }
            });
        });
    }
    public userData(idUser: number) {
        let response;
        const consulta = `SELECT * FROM v_usuario WHERE idUser = '${idUser}'`;
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err: any, resultados: any[]) => {
                this.conexion.end();
                if (err) {
                    reject(err);
                } else {
                    let data: Usuario;
                    data = { "id":resultados[0].idUser,"nombres":resultados[0].namesUser,"apellidos":resultados[0].lastnameUser,"idRol":resultados[0].idRol,"nomRol":resultados[0].nameRol}
                    response = { "message": "OK", "data": data, "status": 200, "error": false }
                    resolve(response)
                }
            });
        });
    }
    private verificarUsuario(resultados: any) {
        let response: ApiResponse<usuarioLogin>;
        if (resultados.length === 0) {
            response = { "message": "El Usuario no existe", "status": 404, "error": true }
        } else {
            if (this.verificarPass(resultados[0].pass)) {
                if(resultados[0].stateUser=='Activo'){
                    let data: usuarioLogin;
                    data = { "id": resultados[0].idUser }
                    response = { "message": "OK", "data": data, "status": 200, "error": false }
                }else{
                    response = { "message": "El Usuario se encuentra Bloqueado", "status": 404, "error": true }
                }  
            } else {
                response = { "message": "Credenciales Invalidas", "status": 401, "error": true }
            }

        }
        return response;
    }
    private verificarPass(passDb: string) {
        let val = false
        if (crypto.MD5(this.pass).toString() === passDb) {
            val = true
        }
        return val;
    }
}