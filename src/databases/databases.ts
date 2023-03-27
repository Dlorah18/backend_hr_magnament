import mysql, { Connection } from 'mysql';

export class Database{
    private connection:Connection;
    private host:string='localhost'
    private user:string='root'
    private password:string='12345678'
    private database:string='hr_magnament'

    constructor(){
        this.connection = mysql.createConnection({
            host     : this.host,
            user     : this.user,
            password : this.password,
            database : this.database
          });
    }
    public getConnection(){
        return this.connection
    }

    
}
  