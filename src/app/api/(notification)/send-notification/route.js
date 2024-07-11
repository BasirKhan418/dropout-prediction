import admin from "firebase-admin";
import { NextRequest, NextResponse } from "next/server";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  const serviceAccount = require("../../../../app/service_key.json");
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request) {
  const { tokens, title, message, link } = await request.json();
const token = ["daGnCgRVlF-5B7ZVDj5ZEH:APA91bHGPdA4OCEgdS16BPZFsSXEz7SpP2KUVIWmS_eh_PNsFKKa4L3DM7M4okVfa7X5Te1BBuqUi-GWNs2RYk3lmSJjCOlfGc6JV03VWn8e7xmCpB4_6x_yRCjgIbPgwHtJjSVUEmKk"]
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
      tokens: token,
      ...payload
    });

    const failedTokens = [];
    response.responses.forEach((resp, idx) => {
      if (!resp.success) {
        failedTokens.push(tokens[idx]);
      }
    });

    if (failedTokens.length > 0) {
      console.error("Failed tokens:", failedTokens);
    }

    return NextResponse.json({
      success: true,
      message: "Notifications sent!",
      success:true,
      failures: failedTokens,
    });
  } catch (error) {
    console.error("Error sending notifications:", error); // Log the error for debugging
    return NextResponse.json({ success: false, error: error.message });
  }
}
