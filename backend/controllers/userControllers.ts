import { Request, Response }  from 'express';

export const loginUser = (req :Request, res: Response) =>{
    //login route
  
};
export const logOutUser = (req :Request, res: Response)=>{
    //logout route with redirect to login page
   
};
export const singupUser = async (req :Request, res: Response)=>{
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;

    }catch(error){

    }
   
};
