import { BaseRouter } from "./index";
import { UserController } from "../controllers/userController"

export class UserRouter extends BaseRouter<UserController>{
    constructor(){
        super(UserController)
    }
    route(): void {
        this.router.post('/ListarUsuario',(req,res)=>this.controllate.Login(req,res))
    }
}
