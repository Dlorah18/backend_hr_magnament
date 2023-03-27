import { Request, Response } from "express";
import { UserServices } from "../services/userServices";

export class UserController{

    async Login(req:Request,res:Response){
        let responseLogin=await new UserServices().Login(req.body.usuario,req.body.password)
        console.log("Planet Name :- " + responseLogin);
        console.log(responseLogin)
        res.json(responseLogin)
    }
}