"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdministratorRoute = void 0;
const index_1 = require("./index");
const AdministratorController_1 = require("../controllers/AdministratorController");
class AdministratorRoute extends index_1.BaseRouter {
    constructor() {
        super(AdministratorController_1.AdministratorController);
    }
    route() {
        this.router.get('/ListUser', (req, res) => this.controllate.listUser(req, res));
        //this.router.post('/CreateUser',(req,res)=>this.controllate.createUser(req,res))
    }
}
exports.AdministratorRoute = AdministratorRoute;
