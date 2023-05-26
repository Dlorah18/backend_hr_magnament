import mysql, { Connection } from 'mysql';
import "dotenv/config"

export class Database{
    private connection:Connection;
    private host:string=String(process.env.HOST_DB||'localhost')
    private user:string=String(process.env.USER_DB||'root')
    private password:string=String(process.env.PASS_DB||'')
    private database:string=String(process.env.DATABASE_DB||'hr_magnament_prod')
    private port:number=Number(process.env.PORT_DB||'3306')
    

    constructor(){
        this.connection = mysql.createConnection({
            host     : this.host,
            user     : this.user,
            password : this.password,
            port     : this.port,
            database : this.database
          });
    }
    public getConnection(){
        return this.connection
    }

    
}
  