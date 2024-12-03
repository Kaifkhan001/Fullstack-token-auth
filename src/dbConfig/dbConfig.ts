import mongoose from 'mongoose';
import {  NextResponse } from 'next/server';


export default async function connect() {
    try {
       await mongoose.connect(process.env.MONGODB_URI!);
       const connectionInstance = mongoose.connection;
       connectionInstance.on("connected", () => {
         console.log("Database Connected Successfully.");
       });
       connectionInstance.on("disconnected", () => {
         console.log("Database Disconnected");
       });
       connectionInstance.on("error", (err) => {
         console.log("Mongoose connection error:", err);
       });
    } catch (error) {
        console.log("Error while connecting to database!!", error);
        setTimeout(() => process.exit(1), 1000);
        return NextResponse.json({
            message: "Database connection error",
        },{status: 500});
    }
}