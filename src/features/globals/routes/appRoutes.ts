import { Application } from "express";
import userRoute from "~/features/user/userRoutes";
import authRoute from "~/features/globals/routes/authRoutes";
import categoryRoute from "~/features/category/route/categoryRoute";
import productRoute from "~/features/product/route/productRoute";

const appRoutes = (app: Application) => {
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/auth', authRoute)
    app.use('/api/v1/categories', categoryRoute)
    app.use('/api/v1/products', productRoute)
}

export default appRoutes;