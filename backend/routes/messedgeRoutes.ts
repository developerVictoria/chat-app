import { Request, Response, Router }  from 'express';
import {sendMessage, getMessages} from '../controllers/messageControllers';
import {protectRoute} from "../middleware/protectRoute";

const router = Router();

router.post("/:id",protectRoute,getMessages);
router.post("/send/:id",protectRoute,sendMessage);



export default router;