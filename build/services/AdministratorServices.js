"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratorServices = void 0;
const databases_1 = require("../config/databases");
const tsResponces_1 = require("../tsResponces");
class AdministratorServices {
    //private pass: string | any;
    constructor() {
        this.conexion = new databases_1.Database().getConnection();
    }
    listUser() {
        let response;
        const consulta = "SELECT * FROM v_usuario";
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err, resultados) => {
                this.conexion.end();
                if (err) {
                    reject(err);
                }
                else {
                    tsResponces_1.people.splice(0, tsResponces_1.people.length);
                    for (let val of resultados) {
                        tsResponces_1.people.push({ "id": val.idUser, "nombres": val.namesUser, "apellidos": val.lastnameUser, "idRol": val.idRol, "nomRol": val.nameRol, "estado": val.stateUser, "fechaCreacion": val.datCrea });
                    }
                    response = { "message": "OK", "data": tsResponces_1.people, "status": 200, "error": false };
                    resolve(response);
                }
            });
        });
    }
    createUser() {
    }
}
exports.AdministratorServices = AdministratorServices;
