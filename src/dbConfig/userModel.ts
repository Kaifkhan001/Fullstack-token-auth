import mongoose, { Model, Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  refreshToken: string;
  isPasswordValid(password: string): Promise<boolean>;
  generateRefreshAndAccessToken(): Promise<{accessToken: string, refreshToken: string}>
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required : [true, "Username is required"],
    unique: true
  },
  email: {
    type: String,
    required : [true, "Email is required"],
    unique: true
  },
  password : {
    type: String,
    required : [true, "Password is required"],
  },
  refreshToken : {
    type: String
  }

}, {timestamps : true});

userSchema.methods.isPasswordValid = async function (password: string): Promise<boolean> {
  try {
    return await bcryptjs.compare(password, this.password);
  } catch (error) {
    console.log("Error in verifying", error);
    throw new Error("Verification Failed");
  }
};

userSchema.methods.generateRefreshAndAccessToken = function(){
  try {
    const accessToken = jwt.sign(
      { userId: this._id, email: this.email },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY! }
    );

    const refreshToken = jwt.sign(
      { userId: this._id },
      process.env.REFRESH_TOKEN_SECRET!,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY! }
    );

    return {accessToken, refreshToken};
  } catch (error) {
    console.log("Error in generating tokens", error);
    throw new Error("Error in Generating tokens");
  }
}


const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);



export default User;