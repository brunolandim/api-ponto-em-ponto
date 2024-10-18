import { Router } from "express";
import authRouter from "./routes/AuthRouter";
import userRouter from "./routes/UserRouter";
import companyRouter from "./routes/CompanyRouter";
import workLogRouter from "./routes/WorkLogRouter";

export const createRouter = (): Router => {
  const router = Router();
  const routePrefix = '/future-school'


  router.use(`${routePrefix}/auth`, authRouter);
  router.use(`${routePrefix}/user`, userRouter);
  router.use(`${routePrefix}/company`, companyRouter);
  router.use(`${routePrefix}/work-log`, workLogRouter);
  return router;
}