"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const UserRoute_1 = require("./routes/UserRoute");
const AdministratorRoutes_1 = require("./routes/AdministratorRoutes");
const morgan_1 = __importDefault(require("morgan"));
class ServerApi {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = Number(process.env.PORT_SERVICE || 3000);
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(this.routers());
        this.listen();
    }
    routers() {
        return [new UserRoute_1.UserRouter().router, new AdministratorRoutes_1.AdministratorRoute().router];
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Cargado..." + this.port);
        });
    }
}
new ServerApi;
