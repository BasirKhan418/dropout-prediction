import { NextResponse } from "next/server"
import jwt from "jsonwebtoken";
import { headers } from "next/headers";
import Admin from "../../../../../models/Admin";
import ConnectDb from "../../../../../middleware/db";
export const POST = async(req,res)=>{
    await ConnectDb();
    //getting reqdata
    let headerlist = headers();
    let reqdata = headerlist.get("token");

try{
let verify  = jwt.verify(reqdata,process.env.JWT_SECRET);
console.log(verify);
//if token is verified
if(verify!=null){
    //checking if the user is login in single device or not
    let verifym2 = await Admin.findOne({email:verify.email});
    
    if(verifym2.token === reqdata){
        let data = await Admin.find({email:verify.email});
        return NextResponse.json({message:"You are authorized to access this route",success:true,data:data});
    }
    else{
        return NextResponse.json({message:"Another session is detected from another device .Please Login again",success:false,ansession:true});
    }    
}
else{
    return NextResponse.json({message:"You are not authorized to access this route",success:false});
}
}
catch(err){
    console.log(err);
    return NextResponse.json({message:"You are not authorized to access this route",success:false});
    
}
}