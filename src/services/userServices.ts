import { Request, Response } from "express";
import { Database } from "../databases/databases";
import { MysqlError } from "mysql";

export class UserServices {
    public id: number;

    constructor() {
        this.id = 1;

    }
    public Login(req: Request, res: Response) {
        new Database().getConnection().query("INSERT INTO articles SET ?", req.body, (err: MysqlError | null, result: any) => {
            if (err) {
                console.error(err)
                res.status(500).end()
                return 
            }

            req.body.id = result.insertId
        }
        )
        //return res.status(200).json(req.body).end()
        return [200,req.body]
    }
}