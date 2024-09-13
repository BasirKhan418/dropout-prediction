import { NextResponse } from "next/server"
import InternUser from "../../../../models/InternUser";
import ConnectDb from "../../../../middleware/db";
import Auth from "../../../../models/Auth";
import InternDetails from "../../../../models/InternDetails";
export const POST = async(req,res)=>{
    await ConnectDb();

try{
//if token is verified
    //checking if the user is login in single device or not
    let verifym2 = await Auth.findOne({email:"basirkhan4ukhanatoz@gmail.com"});
        let a = await InternUser.find({email:"basirkhan4ukhanatoz@gmail.com",status:"Registered"});
        let data = await InternDetails
        .populate(a,{path:"Regdomain"});
        return NextResponse.json({message:"You are authorized to access this route",success:true,data:data});  
}
catch(err){
    console.log(err);
    return NextResponse.json({message:"some thing wen wrong",success:false});
    
}
}