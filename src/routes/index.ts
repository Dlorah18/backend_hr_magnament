import { Router } from "express";

export class BaseRouter<T>{
    public router:Router;
    public controllate:T

    constructor(TController:{new():T}){
        this.router=Router()
        this.controllate=new TController();
        this.route();
    }

    route(){}
}