import { Request, Response } from "express";
import { UserServices } from "../../services/usuario/userServices";

export class UserController{

    async Login(req:Request,res:Response){
        let responseLogin:any=await new UserServices().Login(req.body.usuario,req.body.password)
        res.status(responseLogin["status"]).json(responseLogin)
    }
    async userData(req:Request,res:Response){
        let response:any=await new UserServices().userData(req.body.idUser)
        res.status(response["status"]).json(response)
    }
}