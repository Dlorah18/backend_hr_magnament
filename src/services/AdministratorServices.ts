
import { Database } from "../config/databases";
import { Connection } from 'mysql';
import { usuarioLogin, ApiResponse, people } from "../tsResponces"
export class AdministratorServices {
    private conexion: Connection;
    //private pass: string | any;

    constructor() {
        this.conexion = new Database().getConnection();
    }
    public listUser() {
        let response: ApiResponse<usuarioLogin>;
        const consulta = "SELECT * FROM v_usuario";
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err: any, resultados: any[]) => {
                this.conexion.end();
                if (err) {
                    reject(err);
                } else {
                    people.splice(0, people.length)
                    for (let val of resultados) {
                        people.push({ "id": val.idUser, "nombres": val.namesUser, "apellidos": val.lastnameUser, "idRol": val.idRol, "nomRol": val.nameRol,"estado":val.stateUser,"fechaCreacion":val.datCrea})
                    }
                    response = { "message": "OK", "data": people, "status": 200, "error": false }
                    resolve(response)
                }
            });
        });
    }
    public createUser() {

    }


}