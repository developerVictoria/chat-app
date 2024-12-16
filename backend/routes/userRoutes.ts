import { Request, Response, Router }  from 'express';
import {loginUser, logOutUser, singupUser, getUserForSidebar} from '../controllers/userControllers'
import {protectRoute} from "../middleware/protectRoute";
const router = Router();
//auth - TODO: separate into separate files
router.post("/singup", singupUser);

router.post("/login", loginUser);

router.get("/logout", logOutUser);


//user routes

router.get("/",protectRoute,getUserForSidebar);

export default router;