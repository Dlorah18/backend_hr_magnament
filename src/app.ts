import "dotenv/config"
import express from 'express'
import cors from 'cors'
import { UserRouter } from "./routes/UserRoute"
import {AdministratorRoute} from "./routes/AdministratorRoutes"
import morgan from "morgan"

class ServerApi {
    public app: express.Application = express()
    public port: number=Number(process.env.PORT_SERVICE||3000)

    constructor() {
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(morgan('dev'))
        this.app.use(this.routers())
        this.listen()
    }

    routers():Array<express.Router> {
        return [new UserRouter().router,new AdministratorRoute().router]
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log("Cargado..." + this.port)
        })
    }

}
new ServerApi