import { Request, Response } from "express";
import { UserServices } from "../services/userServices";

export class UserController{

    Login(req:Request,res:Response){

        res.status(200).json(
            {
                data:new UserServices().Login(req,res)
            })
    }
}