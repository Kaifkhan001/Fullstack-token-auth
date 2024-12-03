import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message: "User successfully Logged-Out"
        },{status: 200});

        response?.cookies.delete("accessToken");
        response?.cookies.delete("refreshToken");

        return response;
    } catch (error) {
        console.log("Error logging out",error);
        return NextResponse.json({
            message: "Error Logging-out User"
        },{status: 500});
    }
}