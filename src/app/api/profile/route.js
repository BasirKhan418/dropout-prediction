import { NextResponse } from "next/server";
import ConnectDb from "../../../../middleware/db";
import InternUser from "../../../../models/InternUser";
import { headers } from "next/headers";
import AuthorizeMd from "../../../../middleware/AuthorizeMd";
export const POST = async (req) => {
  const header = headers();
  await ConnectDb();
  const reqdata = await req.json();
  try {
    let res = AuthorizeMd(header.get("token"));
    //if jwt verified
    if (res) {
      const update = await InternUser.updateMany(
        { email: reqdata.email },
        {
          name: reqdata.name,
          phone: reqdata.phone,
          profile: reqdata.profile,
          desc: reqdata.desc,
        }
      );
      return NextResponse.json({
        success: true,
        message: "Profile updated successfully !",
      });
    }
    //else unauthorized access
    else {
      return NextResponse.json({
        success: false,
        message: "Unauthorized access not allowed for this endpoint dear user!",
      });
    }
   
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong please try again later !",
    });
  }
};
