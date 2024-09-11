import express, { Application } from "express";
import Server from "./server"
import 'express-async-errors'
import dotenv from 'dotenv';
dotenv.config();

// Rest of your imports and code


class ShopApplication {
    public run(): void {
        const app: Application = express();
        const server: Server = new Server(app)

        server.start()
    }
}

const shopApplication: ShopApplication = new ShopApplication();

shopApplication.run();