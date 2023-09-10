import { TokenCookie } from "@/app/utility/TokenCookie";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  const jsonBody = await req.json();

  const email = jsonBody["email"];
  const password = jsonBody["password"];
  console.log(email, password);

  // Generate a unique verification token
  const verificationToken = uuidv4();
  console.log(verificationToken);

  //Create email transporter
  const transporter = nodemailer.createTransport(
    smtpTransport({
      host: "mail.kitchenasset.com",
      port: 26,
      secure: false,
      auth: {
        user: "info@kitchenasset.com",
        pass: "pL&zeIGf[eYb",
      },
      tls: {
        rejectUnauthorized: false,
      },
    })
  );

  const mailOptions = {
    from: "info@kitchenasset.com",
    to: email,
    subject: "Email Verification",
    text: `Click the following link to verify your email: http://localhost:3000/verify/${verificationToken}`,
  };

  try {
    let Cookie = await TokenCookie(email);
    let result = await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { status: true, msg: "Email sent successfully" },
      { status: 200, headers: Cookie }
    );
  } catch (e) {
    return NextResponse.json(
      { status: false, msg: "Email could not be sent" },
      { status: 500 }
    );
  }
}
