//import { Request } from "express";
//import { Database } from "../databases/databases";
//import { MysqlError } from "mysql";
import * as crypto from 'crypto-js';
import { Database } from "../databases/databases";
import { usuarioLogin, ApiResponse } from "../tsResponces"
export class UserServices {

    public Login(usuario: string, pass: string) {
        console.log(usuario)
        const conexion = new Database().getConnection();
        const consulta = `SELECT * FROM usuario WHERE user = '${usuario}'`;
        return new Promise((resolve, reject) => {
            conexion.query(consulta, (err, resultados) => {
                conexion.end();
                console.log(err)
                if (err) {
                    reject(err);
                    console.log("aqui2")
                } else if (resultados.length === 0) {
                    resolve(null);
                } else {
                    let data: usuarioLogin
                    let response: ApiResponse<usuarioLogin>
                    if (crypto.MD5(pass).toString() === resultados[0].password) {
                        data = { "id": resultados[0].id, "nombres": resultados[0].nombres, "apellidos": resultados[0].apellidos, "rol": resultados[0].rol, "estado": resultados[0].estado }
                        response={ "message": "Logueado", "data": data, "status": 200 }
                        resolve(response)
                    }else{
                        response={ "message": "Credenciales Invalidas", "status": 401,"error":"Credenciales Invalidas" }
                        resolve(response)
                    }
                    
                }
            });
        });
    }
}