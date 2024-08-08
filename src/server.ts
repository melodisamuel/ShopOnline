import { Application } from "express";
import dotenv from "dotenv"

class Server {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public startServer() {
        const port = parseInt(process.env.PORT!) || 5050;


        this.app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    }
}

export default Server;