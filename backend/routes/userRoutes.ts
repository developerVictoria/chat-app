import { Request, Response, Router }  from 'express';

const router = Router();


router.post("/singup", (req :Request, res: Response)=>{
    //singup route to authenticate
    console.log('singup');
    res.send({"msg":"singup"});
});

router.get("/", (req :Request, res: Response)=>{
    //user route to get users
    console.log('hello')
    res.send({"msg":"Hello"});
    
});


router.post("/login", (req :Request, res: Response)=>{
    //login route
});

router.get("/logout", (req :Request, res: Response)=>{
    //logout route with redirect to login page
});


export default router;