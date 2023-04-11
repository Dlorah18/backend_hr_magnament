import { BaseRouter } from "../index";
import { UserController } from "../../controllers/usuario/userController"

export class UserRouter extends BaseRouter<UserController>{
    constructor(){
        super(UserController)
    }
    route(): void {
        this.router.post('/Login',(req,res)=>this.controllate.Login(req,res))
        this.router.post('/UserData',(req,res)=>this.controllate.userData(req,res))
    }
}
