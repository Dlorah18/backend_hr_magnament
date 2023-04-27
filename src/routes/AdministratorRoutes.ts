import { BaseRouter } from "./index";
import { AdministratorController } from "../controllers/AdministratorController"

export class AdministratorRoute extends BaseRouter<AdministratorController>{
    constructor(){
        super(AdministratorController)
    }
    route(): void {
        this.router.get('/ListUser',(req,res)=>this.controllate.listUser(req,res))
        //this.router.post('/CreateUser',(req,res)=>this.controllate.createUser(req,res))
    }
}