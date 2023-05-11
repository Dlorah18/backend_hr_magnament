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
        this.host = String(process.env.HOST_DB || 'localhost');
        this.user = String(process.env.USER_DB || 'root');
        this.password = String(process.env.PASS_DB || '');
        this.database = String(process.env.DATABASE_DB || 'hr_magnament');
        this.connection = mysql_1.default.createConnection({
            host: this.host,
            user: this.user,
            password: this.password,
            database: this.database
        });
    }
    getConnection() {
        return this.connection;
    }
}
exports.Database = Database;
