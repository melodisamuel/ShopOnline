import express, { Application, Request, Response, NextFunction } from "express";
import  "dotenv/config"
import appRoutes from "./features/globals/routes/appRoutes";
import { CustomError, NotFoundException } from "./features/globals/middleware/errorMiddleware";

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
    private setupRoutes(): void {
        appRoutes(this.app);
    } // 404, common error 
    
    private setupGlobalError(): void {
        this.app.all('*', (req, res, next) => {
            return next(new NotFoundException(`The URL ${req.originalUrl} not found`))
})

        // Global 
        this.app.use((error: CustomError, req: Request, res: Response, next: NextFunction) => { {
               return  res.status(error.statuscode).json(error.getErrorResponse());
            }
            next()
          })

    }

    private startServer() {
        const port = parseInt(process.env.PORT!) || 5050;


        this.app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    }
}

export default Server;