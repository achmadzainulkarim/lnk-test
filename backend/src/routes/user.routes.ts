import UserController from '../controllers/user.controller';
import jwtMiddleware from '../middlewares/jwt.middleware';

export default class UserRouter
{
    private router;
    private userCon;

    constructor(router){
        this.router = router;
        this.userCon = new UserController;

    }
    userRouterList(){
        this.router.post("/api/auth/login", this.userCon.login);
        this.router.post("/api/auth/logout", jwtMiddleware, this.userCon.logout);
        this.router.get("/api/user/get", jwtMiddleware, this.userCon.getUser);
    }
}