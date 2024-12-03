import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const accToken = req.cookies.get("accessToken");
    const refToken = req.cookies.get("refreshToken");

    
    if (accToken && refToken) {
      return NextResponse.json(
        {
          message: "User Verified Successfully",
          ok: true
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          message: "User isn't Logged In",
          ok: false
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.log("Error verifying user for navbar", error);
    return NextResponse.json(
      {
        message: "Error verifying user",
        ok: false
      },
      { status: 500 }
    );
  }
}
