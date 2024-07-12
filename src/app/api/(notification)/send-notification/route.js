import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";
import NotificationToken from "../../../../../models/NotificationToken";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require("../../../../app/service_key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request) {
  const { title, message, link ,id} = await request.json();
  console.log(id)
  let data = await NotificationToken.findOne({_id:id})
  console.log(data)
  console.log("Token:", data.token); // Log the token for debugging

  const payload = {
    notification: {
      title: title,
      body: message,
      image: "https://res.cloudinary.com/dst73auvn/image/upload/v1718998002/ljyzihnrzwfd61veakyb.png"
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  console.log("Payload:", payload); // Log the payload for debugging

  try {
    const response = await admin.messaging().sendMulticast({
      tokens: data.token,
      ...payload
    });

    console.log("Response:", response); // Log the response for debugging

    const failedTokens = [];
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        failedTokens.push(data.token[idx]);
      }
    });

    if (failedTokens.length > 0) {
      console.error("Failed tokens:", failedTokens);
    }

    return NextResponse.json({
      success: true,
      message: "Notifications sent!",
      failures: failedTokens,
    });
  } catch (error) {
    console.error("Error sending notifications:", error); // Log the error for debugging
    return NextResponse.json({ success: false, error: error.message });
  }
}
