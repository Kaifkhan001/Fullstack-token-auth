/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';

export async function GET(req: NextRequest){
    try {
        const accToken = req.cookies.get("accessToken")?.value;

        if(!accToken || accToken.length <= 0){
            console.log("Access Token not found");
            return NextResponse.json({
                message: "Access Token not found",
                ok: false,
                isExpired: true
            });
        }
        console.log("AccToken:- ", accToken);
        console.log("kkrrrrrrr");

        const decoded = jwt.verify(accToken, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
        console.log("Jwt Payload:- ", decoded);

        if(decoded.exp && decoded.exp > (Date.now() / 1000)){
            console.log("token not expired");
           return NextResponse.json({
            ok: true,
            isExpired: false
           });
        }
        else {
            console.log("token expired");
            return NextResponse.json({
                isExpired : true
            });
        }
    } catch (error) {
        if (error instanceof TokenExpiredError){
            console.log("Token Expired");
        }
        else{
          console.log("Error Veryfying tokennnn");
        }
        return NextResponse.json({
            message: "Error verifying token",
            ok: false,
            isExpired: true
        });
    }
}