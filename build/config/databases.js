"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mysql_1 = __importDefault(require("mysql"));
require("dotenv/config");
class Database {
    constructor() {
        this.host = String(process.env.HOST_DB || 'containers-us-west-40.railway.app');
        this.user = String(process.env.USER_DB || 'root');
        this.password = String(process.env.PASS_DB || 'du8whWC5HIvP9bGGQUiW');
        this.database = String(process.env.DATABASE_DB || 'railway');
        this.connection = mysql_1.default.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            port     : 6543,
            database: this.database
        });
    }
    getConnection() {
        return this.connection;
    }
}
exports.Database = Database;
