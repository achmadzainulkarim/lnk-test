import EmailController from '../controllers/email.controller';
import jwtMiddleware from '../middlewares/jwt.middleware';

export default class EmailRouter
{
    private router;
    private emailCon;

    constructor(router){
        this.router = router;
        this.emailCon = new EmailController;
    }
    emailRouterList() : void {
        this.router.get("/api/email/list", jwtMiddleware, this.emailCon.list);
        this.router.post("/api/email/create", jwtMiddleware, this.emailCon.create);
    }
}