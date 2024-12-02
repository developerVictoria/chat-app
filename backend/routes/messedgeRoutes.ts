import { Request, Response, Router }  from 'express';
import {sendMessage} from '../controllers/messageControllers';
import {protectRoute} from "../middleware/protectRoute";
const router = Router();

router.post("/send/:id",protectRoute,sendMessage);



export default router;