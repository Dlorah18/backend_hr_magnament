"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const crypto = __importStar(require("crypto-js"));
const databases_1 = require("../config/databases");
class UserServices {
    constructor() {
        this.conexion = new databases_1.Database().getConnection();
    }
    Login(usuario, pass) {
        let response;
        this.pass = pass;
        const consulta = `SELECT * FROM v_usuario WHERE username = '${usuario}'`;
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err, resultados) => {
                this.conexion.end();
                if (err) {
                    reject(err);
                }
                else {
                    response = this.verificarUsuario(resultados);
                    resolve(response);
                }
            });
        });
    }
    userData(idUser) {
        let response;
        const consulta = `SELECT * FROM v_usuario WHERE idUser = '${idUser}'`;
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err, resultados) => {
                this.conexion.end();
                if (err) {
                    reject(err);
                }
                else {
                    let data;
                    data = { "id": resultados[0].idUser, "nombres": resultados[0].namesUser, "apellidos": resultados[0].lastnameUser, "idRol": resultados[0].idRol, "nomRol": resultados[0].nomRol };
                    response = { "message": "OK", "data": [data], "status": 200, "error": false };
                    resolve(response);
                }
            });
        });
    }
    verificarUsuario(resultados) {
        let response;
        if (resultados.length === 0) {
            response = { "message": "El Usuario no existe", "status": 404, "error": true };
        }
        else {
            if (this.verificarPass(resultados[0].pass)) {
                if (resultados[0].stateUser == 'Activo') {
                    let data;
                    data = { "id": resultados[0].idUser };
                    response = { "message": "OK", "data": [data], "status": 200, "error": false };
                }
                else {
                    response = { "message": "El Usuario se encuentra Bloqueado", "status": 404, "error": true };
                }
            }
            else {
                response = { "message": "Credenciales Invalidas", "status": 401, "error": true };
            }
        }
        return response;
    }
    verificarPass(passDb) {
        let val = false;
        if (crypto.MD5(this.pass).toString() === passDb) {
            val = true;
        }
        return val;
    }
}
exports.UserServices = UserServices;
