
import { Database } from "../config/databases";
import { Connection } from 'mysql';
export class AdministratorServices {
    private conexion: Connection;
    private pass: string | any;

    constructor() {
        this.conexion = new Database().getConnection();
    }
    public listUser(){

    }
    public createUser(){
        
    }

       
}