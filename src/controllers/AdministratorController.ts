import { Request, Response } from "express";
import { AdministratorServices } from "../services/AdministratorServices";

export class AdministratorController{

    async listUser(req:Request,res:Response){
        let response:any=await new AdministratorServices().listUser(req.body.user,req.body.estado,req.body.idRol)
        res.status(response["status"]).json(response)
    }
    async previewUser(req:Request,res:Response){
        console.log(req.body.idUser)
        let response:any=await new AdministratorServices().previewUser(req.params.id)
        res.status(response["status"]).json(response)
    }
    async createUser(req:Request,res:Response){
        let response:any=await new AdministratorServices().createUser(req.body.names,req.body.lastname,req.body.pass,req.body.idRol,req.body.email)
        res.status(response["status"]).json(response)
    }
    async activeUser(req:Request,res:Response){
        let response:any=await new AdministratorServices().activeUser(req.body.user,req.body.razon,req.body.stateUser)
        res.status(response["status"]).json(response)
    }
    async editUser(req:Request,res:Response){
        let response:any=await new AdministratorServices().editUser(req.body.idUser,req.body.names,req.body.lastname,req.body.idRol)
        res.status(response["status"]).json(response)
        
    }
}