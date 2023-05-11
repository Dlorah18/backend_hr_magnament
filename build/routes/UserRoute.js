"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const index_1 = require("./index");
const UserController_1 = require("../controllers/userController");
class UserRouter extends index_1.BaseRouter {
    constructor() {
        super(UserController_1.UserController);
    }
    route() {
        this.router.post('/Login', (req, res) => this.controllate.Login(req, res));
        this.router.post('/UserData', (req, res) => this.controllate.userData(req, res));
    }
}
exports.UserRouter = UserRouter;
