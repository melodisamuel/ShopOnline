import express, { Application } from "express";
import  "dotenv/config"

class Server {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        this.setupMiddleware();
        this.setupRoutes();
        this.setupGlobalError();
        this.startServer();
    }

    private setupMiddleware(): void {
        this.app.use(express.json()); // req.body
    }
    private setupRoutes(): void {} // 404, common error 
    private setupGlobalError(): void {}

    private startServer() {
        const port = parseInt(process.env.PORT!) || 5050;


        this.app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    }
}

export default Server;