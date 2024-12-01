import { Request, Response, Router }  from 'express';
import {loginUser, logOutUser, singupUser} from '../controllers/userControllers'
const router = Router();

router.post("/singup", singupUser);

router.post("/login", loginUser);

router.get("/logout", logOutUser);


export default router;