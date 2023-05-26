import { BaseRouter } from "./index";
import { AdministratorController } from "../controllers/AdministratorController"

export class AdministratorRoute extends BaseRouter<AdministratorController>{
    constructor(){
        super(AdministratorController)
    }
    route(): void {
        this.router.post('/ListUser',(req,res)=>this.controllate.listUser(req,res))
        this.router.get('/PreviewUser/:id',(req,res)=>this.controllate.previewUser(req,res))
        this.router.post('/CreateUser',(req,res)=>this.controllate.createUser(req,res))
        this.router.post('/ActiveUser',(req,res)=>this.controllate.activeUser(req,res))
        this.router.put('/EditUser',(req,res)=>this.controllate.editUser(req,res))
    }
}