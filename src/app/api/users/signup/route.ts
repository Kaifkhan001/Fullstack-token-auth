import connect from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/dbConfig/userModel";
import bcryptjs from 'bcryptjs';

connect();

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { username, email, password } = reqBody;
  try {
    const isUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if(isUser){
        console.log("User alreasy exists");
        return NextResponse.json({
            message: "User already exists with the provide username and email"
        },{status: 409});
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password : hashedPassword
    });

    const { accessToken, refreshToken } = await newUser.generateRefreshAndAccessToken();

    newUser.refreshToken = refreshToken;
    
    await newUser.save();


    const response = NextResponse.json({
        message: "User Signed-Up Successfully"
    },{status: 201});

    response.cookies.set("accessToken", accessToken, {httpOnly: true});
    response.cookies.set("refreshToken", refreshToken, {httpOnly: true});

    return response;
  } catch (error) {
    console.log("Error While Signing Up", error);
    return NextResponse.json(
      {
        message: "Error in Sign-Up",
      },
      { status: 500 }
    );
  }
}
