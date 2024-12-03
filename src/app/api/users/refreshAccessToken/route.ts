import {  NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "@/dbConfig/userModel";

export async function GET(req: NextRequest){
    try {
        const reftoken = req.cookies.get("refreshToken")?.value;
        console.log("Refresh Token:- ", reftoken);
        if(!reftoken){
            console.log("Refresh token not found");
            return NextResponse.json({
                message: "Token not found",
                ok : false
            },{status: 404});
        }
        const decoded = await jwt.verify(
          reftoken,
          process.env.REFRESH_TOKEN_SECRET!
        ) as JwtPayload;
        
        if(decoded?.exp && decoded.exp > Math.floor(Date.now() / 1000)){
          const user = await User.findOne({ _id: decoded.userId });
          if (!user) {
            console.log("User not found");
            return NextResponse.json({
              message: "User not found",
              ok: false,
            });
          }
          const token = await user?.generateRefreshAndAccessToken();
          const response = NextResponse.json(
            {
              message: "Access token refreshed successfully",
              ok: true,
            },
            { status: 201 }
          );
          response.cookies?.delete("accessToken");
          response.cookies.set("accessToken", token.accessToken);
          return response;
        } else{
            console.log("Token expired");
            return NextResponse.json({
                message: "Refresh Token Expired",
                ok: false
            })
        }

        
    } catch (error) {
        console.log("Error in Refreshing access token", error);
        return NextResponse.json({
            message: "error refreshing access token",
            ok: false
        })
    }
}