import { Request, Response } from "express";
import { AdministratorServices } from "../services/AdministratorServices";

export class AdministratorController{

    async listUser(req:Request,res:Response){
        let response:any=await new AdministratorServices().listUser()
        res.status(response["status"]).json(response)
    }
    async createUser(req:Request,res:Response){
        //let response:any=await new AdministratorServices().userData(req.body.idUser)
        //res.status(response["status"]).json(response)
    }

}