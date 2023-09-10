import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET(req, res) {
  //Get email address from URL or SearchParameters
  const { searchParams } = new URL(req.url);
  const toEmail = searchParams.get("email");
  console.log(toEmail);

  //Create email transporter

  let transporter = nodemailer.createTransport({
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
  });

  //prepare email

  let myEmail = {
    from: "info@kitchenasset.com",
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
