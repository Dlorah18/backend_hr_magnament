
import { Database } from "../config/databases";
import { Connection } from 'mysql';
import { usuarioLogin, ApiResponse, people } from "../tsResponces"
export class AdministratorServices {
    private conexion: Connection;
    protected user: string | any;
    protected names: string | any;
    protected lastnames: string | any;
    protected idRol: string | any;
    protected pass: string | any;
    protected email: string | any;
    protected state: string | any;


    constructor() {
        this.conexion = new Database().getConnection();
    }
    public async listUser(user: string, rol: number, estado: string) {
        this.user = user
        this.idRol = rol
        this.state = estado
        const condition: any = await this.callFilter()

        let response: ApiResponse<usuarioLogin>;
        const consulta = `SELECT idUser,namesUser,lastnameUser,idRol,nameRol,stateUser FROM v_usuario ${condition.filtro}`;
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err: any, resultados: any[]) => {
                this.conexion.end();
                if (err) {
                    reject(err);
                } else {
                    people.splice(0, people.length)
                    for (let val of resultados) {
                        people.push({ "id": val.idUser, "nombres": val.namesUser, "apellidos": val.lastnameUser, "idRol": val.idRol, "nomRol": val.nameRol, "estado": val.stateUser })
                    }
                    response = { "message": "OK", "data": people, "status": 200, "error": false }
                    resolve(response)
                }
            });
        });
    }
    public previewUser(user: any) {
        console.log(user)
        let response: ApiResponse<usuarioLogin>;
        const consulta = `SELECT * FROM v_usuario where  idUser=${user}`;
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err: any, resultados: any[]) => {
                this.conexion.end();
                if (err) {
                    reject(err);
                } else {
                    people.splice(0, people.length)
                    for (let val of resultados) {
                        people.push(val)
                    }
                    response = { "message": "OK", "data": people, "status": 200, "error": false }
                    resolve(response)
                }
            });
        });
    }
    public async createUser(names: string, lastname: string, pass: string, idRol: number, email: string) {
        let response: ApiResponse<usuarioLogin>;
        this.names = names; this.lastnames = lastname; this.pass = pass; this.idRol = idRol; this.email = email
        const val: any = await this.verifyuser()
        if (val.EXISTE > 0) {
            return new Promise((resolve, _reject) => {
                response = { "message": val.MESSAGE, "data": [], "status": 423, "error": true }
                resolve(response)
            });
        } else {
            const callPaCreate: any = await this.calPaCreate();
            return new Promise((resolve, _reject) => {
                response = { "message": val.message, "data": callPaCreate, "status": 200, "error": true }
                resolve(response)
            });
        }
    }

    public async editUser(idUser:number,names: string, lastname: string, idRol: number) {
        
        this.names = names; this.lastnames = lastname; this.idRol = idRol;this.user=idUser
        let consulta = `CALL pa_editarUsuario(?,?,?,?,@idUser);`;
        this.conexion.query(consulta, [this.names,this.lastnames,this.idRol,this.user])
        consulta = "SELECT @idUser as idUser"
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err: any, resultados: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    let response: ApiResponse<usuarioLogin> = { "message": "OK", "data": resultados[0], "status": 200, "error": true }
                    resolve(response)
                }
            });
        });
        
    }

    private calPaCreate() {
        let consulta = `CALL pa_crearUsuario(?,?,?,?,?, @idDG, @idUser);`;
        this.conexion.query(consulta, [this.names, this.lastnames, this.email, this.idRol, this.pass])
        consulta = "SELECT @idDG as idDG, @idUser as idUser"
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err: any, resultados: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    this.conexion.end();
                    resolve(resultados[0])
                }
            });
        });
    }
    private callFilter() {
        let consulta = `CALL pa_filtroUsuario(?,?,?,@filtro);`;
        this.conexion.query(consulta, [this.user, this.state, this.idRol])
        consulta = "SELECT @filtro as filtro"
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err: any, resultados: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(resultados[0])
                }
            });
        });
    }
    private verifyuser() {
        let consulta = `CALL pa_usuarioExiste(?, @EXISTE, @MESSAGE);`;
        console.log(consulta, [this.email])
        this.conexion.query(consulta, [this.email])
        consulta = "SELECT @EXISTE as EXISTE, @MESSAGE as MESSAGE"
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err: any, resultados: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(resultados[0].EXISTE)
                    resolve(resultados[0])
                }
            });
        });

    }
    public activeUser(user: number, razon: string,state:string) {
        this.user=user;
        this.state=state
        let consulta = `CALL pa_activarusuario(?,?,?,@estadoActual);`;
        this.conexion.query(consulta, [this.user,razon,this.state])
        consulta = "SELECT @estadoActual as estadoActual"
        return new Promise((resolve, reject) => {
            this.conexion.query(consulta, (err: any, resultados: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    let response: ApiResponse<usuarioLogin> = { "message": "OK", "data": resultados[0], "status": 200, "error": true }
                    resolve(response)
                }
            });
        });
    }


}