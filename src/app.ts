import "dotenv/config"
import express from 'express'
import cors from 'cors'
import { UserRouter } from "./routes/userRoute"
import morgan from "morgan"


class ServerApi {
    public app: express.Application = express()
    public port: number = 3004

    constructor() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(morgan('dev'))
        this.app.use(this.routers())
        this.listen()
    }

    routers():Array<express.Router> {
        return [new UserRouter().router]
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log("Cargado..." + this.port)
        })
    }

}
new ServerApi