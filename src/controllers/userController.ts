import { Request, Response } from "express";
import { UserServices } from "../services/userServices";

export class UserController{

    async Login(req:Request,res:Response){
        let responseLogin:any=await new UserServices().Login(req.body.usuario,req.body.password)
        res.status(responseLogin["status"]).json(responseLogin)
    }
}