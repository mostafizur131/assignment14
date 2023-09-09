import { TokenCookie } from "@/app/utility/TokenCookie";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req, res) {
  let json = await req.json();
  let email = json["email"];
  let password = json["password"];

  if (email === "tahsin131@gmail.com" && password === "tahsin131") {
    let Cookie = await TokenCookie(email);

    return NextResponse.json(
      { status: true, msg: "Login Success" },
      { status: 200, headers: Cookie }
    );
  } else {
    return NextResponse.json({
      status: false,
      msg: "Login Failure",
    });
  }
}

export async function GET(req, res) {
  cookies().delete("token");

  return NextResponse.json({ status: true, msg: "Logout Success" });
}
