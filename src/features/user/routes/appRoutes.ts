import { Application } from "express";
import userRoute from "~/features/user/userRoutes";
import authRoute from "~/features/user/routes/authRoutes";
import categoryRoute from "~/features/category/route/categoryRoute";

const appRoutes = (app: Application) => {
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/categories', categoryRoute)
}

export default appRoutes;