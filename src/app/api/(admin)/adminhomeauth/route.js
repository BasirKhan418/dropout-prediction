import { NextResponse } from "next/server"
import Admin from "../../../../../models/Admin";
import ConnectDb from "../../../../../middleware/db";
export const POST = async(req,res)=>{
    await ConnectDb();

try{
    //checking if the user is login in single device or not
    let verifym2 = await Admin.findOne({email:"khanbasir5555@gmail.com"});
        let data = await Admin.find({email:"khanbasir5555@gmail.com"});
        return NextResponse.json({message:"You are authorized to access this route",success:true,data:data});
}
catch(err){
    console.log(err);
    return NextResponse.json({message:"some thing went wrong try again later",success:false});
    
}
}