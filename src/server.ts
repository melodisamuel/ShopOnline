import express, { Application, Request, Response, NextFunction } from "express";
import  "dotenv/config"
import appRoutes from "./features/globals/routes/appRoutes";
import { CustomError, NotFoundException } from "./features/globals/middleware/errorMiddleware";
import { error } from "console";

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
            return next(new NotFoundException(`The URL ${req.originalUrl} not found`));
        });
        this.app.use((error: any, req: Request, res: Response, next: NextFunction) => {
            console.error('Error Message:', error.message);
            console.error('Error Stack:', error.stack);
          
    
            if (error instanceof CustomError) {
                return res.status(error.statuscode).json(error.getErrorResponse());
            }
    
            // Default fallback for other errors
            return res.status(500).json({
                status: "error",
                statuscode: 500,
                message: "Internal Server Error",
            });
        });
    }
    

    private startServer() {
        const port = parseInt(process.env.PORT!) || 5050;


        this.app.listen(port, () => {
            console.log(`App listening on port ${port}`);
        })
    }
}

export default Server;