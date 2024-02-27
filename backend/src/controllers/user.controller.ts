import { User } from "../entities/typeorm/user.entity";
import { MongoConnection } from "../entities/typeorm/data-source";
import bcrypt from 'bcryptjs';
import { redisSet, redisGet, redisDel } from "../libraries/redis.library";
import { signJwtCallback, verifyJwt } from "../libraries/jwt.library"

export default class UserController
{
    async login(req:any, res:any){
        const userRepo = MongoConnection.getRepository(User);
        const { username, password } = req.body;
        try {
            const user = await userRepo.findOneBy({ username });
            if(!user) throw new Error("Username atau Password kurang tepat!");

            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch) throw new Error("Username atau Password kurang tepat!");

            const existToken = await redisGet(`jwt:${user.username}`);
            if(existToken){    
                const jwtACtive = verifyJwt(existToken);
                console.log(jwtACtive, "active");
                if(jwtACtive){
                    return res.json({ success : true, token : existToken, cache : true})
                }
            }

            await userRepo.update({ username }, { lastLogin: new Date() });

            const token : string = await signJwtCallback({ id: user.id, username : user.username });
            await redisSet(`jwt:${user.username}`, token);
            return res.json({ success : true, token, cache : false })
        } catch (error) {
            console.error(error)
            res.status(400).json(error.message)
        }
    }
    async logout(req:any, res:any){
        try {
            await redisDel(`jwt:${req.data.username}`);
            res.json("ok");
        } catch (error) {
            console.error(error)
            res.status(400).json(error.message)
        }
    }
    async getUser(req:any, res:any){
        try {
            const userRepo = MongoConnection.getRepository(User);
            const user = await userRepo.findOneBy({ username : req.data.username });
            delete(user.password)
            res.json(user);
        } catch (error) {
            console.error(error)
            res.status(400).json(error.message)
        }
    }
}