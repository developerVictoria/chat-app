import bcrypt from "bcryptjs";

export const generatePasswordHash = async (password:string):Promise<string>=>{
    let result = "";
    const salt = await bcrypt.genSalt(16);
    result = await bcrypt.hash(password, salt);
    return result;
}
