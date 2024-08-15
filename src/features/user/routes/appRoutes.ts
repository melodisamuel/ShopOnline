import { Application } from "express";
import userRoute from "~/features/user/userRoutes";
import authRoute from "~/features/user/routes/authRoutes";

const appRoutes = (app: Application) => {
    app.use('/api/v1/users', userRoute);

    app.use('/api/v1/auth', authRoute)
}

export default appRoutes;