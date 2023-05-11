"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRouter = void 0;
const express_1 = require("express");
class BaseRouter {
    constructor(TController) {
        this.router = (0, express_1.Router)();
        this.controllate = new TController();
        this.route();
    }
    route() { }
}
exports.BaseRouter = BaseRouter;
