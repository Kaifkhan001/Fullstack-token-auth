import connect from "@/dbConfig/dbConfig";
import User from "@/dbConfig/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest){
    const reqBody = await request.json();
    const {email, password} = reqBody;

    try {
        const isUserExists = await User.findOne({ email });
        if(!isUserExists){
            console.log("User doesn't exists");
            return NextResponse.json({
                message: "User doesn't exists"
            },{status: 404});
        }
    
        const isPasswordValid = await isUserExists.isPasswordValid(password);
        
        if(!isPasswordValid){
            console.log("Incorrect Credentials");
            return NextResponse.json({
                message: "Invalid user credentials"
            },{status: 401});
        }

        const {accessToken, refreshToken} = await isUserExists.generateRefreshAndAccessToken();

        const response = NextResponse.json(
          {
            message: "Use logged in successfully",
          },
          { status: 200 }
        );

        response.cookies.set("accessToken", accessToken);
        response.cookies.set("refreshToken", refreshToken);
    
        return response;
    } catch (error) {
        console.log("Something went wrong",error);
        return NextResponse.json({
            message: "Something went wrong"
        }),{status: 400}
    }
}