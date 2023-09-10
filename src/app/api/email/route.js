import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req, res) {
  //Get email address from URL or SearchParameters
  const { searchParams } = new URL(req.url);
  const toEmail = searchParams.get("email");
  console.log(toEmail);

  //Create email transporter

  let transporter = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: {
      user: "info@teamrabbil.com",
      pass: "~sR4[bhaC[Qs",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  //prepare email

  let myEmail = {
    from: "info@teamrabbil.com",
    to: toEmail,
    subject: "Sending Email by nodemailer",
    text: "Test Email",
  };

  try {
    let result = await transporter.sendMail(myEmail);

    return NextResponse.json({ msg: "success", result: result });
  } catch (e) {
    return NextResponse.json({ msg: "fail" });
  }
}
