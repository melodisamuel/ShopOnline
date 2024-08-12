import { Application } from "express";
import userRoute from "~/features/user/userRoutes";

const appRoutes = (app: Application) => {
    app.use('/api/v1/users', userRoute);
}

export default appRoutes;