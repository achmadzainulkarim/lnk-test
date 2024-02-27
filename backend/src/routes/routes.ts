import { Request, Response, Router } from 'express';
import UserRouter from "./user.routes";
import EmailRouter from "./email.routes";

export const route = (router:Router) => {
  const userRouter = new UserRouter(router);
  const emailRouter = new EmailRouter(router);

  userRouter.userRouterList();
  emailRouter.emailRouterList();

  router.get("/api/health", (req:Request, res:Response) => { res.send("OK") });
};
